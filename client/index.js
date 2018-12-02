var ready = require('./utils/ready');

var body = document.getElementsByTagName('body').item(0);
var fetchTxtBox = document.getElementById('url-input');
var fetchContainer = document.getElementById('input-container');
ready(() => {
  changeColor();
  document.getElementById('url-fetch').addEventListener('click', function(){
    if(!validUrl(fetchTxtBox.value)){
      fetchContainer.classList.add('shake');
      setTimeout(function(){
        fetchContainer.classList.remove('shake');
      }, 1000);
      return;
    }

    scrape();
  });

  document.getElementById('randon-gen').addEventListener('click', function(){
    chooseRandomUrl();
    scrape();
  });
  // comment
});

function scrape(){
  togglePlaceholders(true);
  changeColor();

  httpScrape(function(){
    togglePlaceholders(false);
  })
}

function httpScrape(done){
  var u = fetchTxtBox.value
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/scrape?q='+u);
  xhr.onload = function() {
    var img = document.getElementById('img');
    var title = document.getElementById('title');
    var desc = document.getElementById('desc');
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      img.src = response.Image ? response.Image : 'https://via.placeholder.com/400x300.png?text=no%20image%20found';
      title.textContent = response.Title ? response.Title : 'no title found';
      desc.textContent = response.Description ? response.Description : 'no description found';
    }

    done();
  };
  xhr.send();  
}
function togglePlaceholders(show){
  body.classList.remove('hide-results');
  if(show){
    body.classList.add('show-placeholders');
  }
  else{
    body.classList.remove('show-placeholders');
  }
}

function validUrl(url){
  if(!url) return false;
  if(url == '') return false;
  return true;
}

function changeColor(){
  var colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b"
  ];
  var col = colors[Math.floor(Math.random()*colors.length)];
  body.style.backgroundColor = col;
}

function chooseRandomUrl(){
  var urls = [
    "https://www.imdb.com/title/tt4154756/?ref_=nv_sr_2",
    "https://www.imdb.com/title/tt4633694/?ref_=nv_sr_1",
    "https://www.imdb.com/title/tt0800080/?ref_=nv_sr_1",
    "https://www.imdb.com/title/tt0409459/?ref_=nv_sr_1",
    "https://www.imdb.com/title/tt0848228/?ref_=fn_al_tt_1",
    "https://www.imdb.com/title/tt4154664/?ref_=rvi_tt",
    "https://www.imdb.com/title/tt1300854/?ref_=nv_sr_1",
    "https://www.imdb.com/title/tt2364582/?ref_=nv_sr_1",
    "https://www.imdb.com/title/tt3498820/?ref_=nv_sr_2",
    "https://www.imdb.com/title/tt5095030/?ref_=nv_sr_1"
  ];

  var url = urls[Math.floor(Math.random()*urls.length)];
  fetchTxtBox.value = url;
}