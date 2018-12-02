package logger

import (
	"io/ioutil"
	"log"
	"os"
)

var name = "hero-scrape-web "
var _log = log.New(ioutil.Discard, name, log.LstdFlags)

func On() {
	_log = log.New(os.Stderr, name, log.LstdFlags)
}

func Off() {
	_log = log.New(ioutil.Discard, name, log.LstdFlags)
}

func Println(format string, v ...interface{}) {
	_log.Printf(format+"\n", v...)
}
