package main

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/v-braun/hero-scrape"

	"github.com/gorilla/mux"
	"github.com/v-braun/hero-scrape-web/internal/logger"
)

func main() {
	logger.On()
	bndAddr := ":3001"
	r := mux.NewRouter()

	r.HandleFunc("/scrape", scrapeHandler).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./bin/")))

	logger.Println("start webserver on addr %s", bndAddr)
	err := http.ListenAndServe(bndAddr, r)
	if err != nil {
		panic(err)
	}
}

func scrapeHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	u := query.Get("q")
	if u == "" {
		http.NotFound(w, r)
		return
	}

	parsedURL, err := url.Parse(u)
	if parsedURL == nil || err != nil {
		http.NotFound(w, r)
		return
	}

	res, err := http.Get(parsedURL.String())
	if err != nil {
		http.NotFound(w, r)
		return
	}

	defer res.Body.Close()
	result, _ := heroscrape.Scrape(parsedURL, res.Body)

	if result == nil {
		http.NotFound(w, r)
		return
	}

	js, err := json.Marshal(result)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}
