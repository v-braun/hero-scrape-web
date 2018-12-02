package main

import (
	"fmt"
	"net/http"

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
	fmt.Fprintf(w, "Hello World!")
}
