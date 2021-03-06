const videoCardContainerPC = document.querySelector('#videosPC');
const videoCardContainerMobile = document.querySelector('#videosMobile');
let api_key = "AIzaSyD6VSqAOYip2ZlesDklHGpTFPKb6NPXWk4";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

let html = document.querySelector('html');
let header = document.querySelector('#header');
let categorias = document.querySelector("#categoriasMobile");
let headertwo = document.querySelector('#headertwo');
let escuro = document.querySelector('.transparent');
let escuroMobile = document.querySelector('#transparentMobile');

//desktop
document.querySelector("#show-menu").addEventListener('click', function() {
  document.querySelector('.sidebar').classList.add('active');
  html.style.overflowY = "hidden";
  escuro.classList.add('active');
});

document.querySelector("#hide-menu").addEventListener('click', function() {
  document.querySelector('.sidebar').classList.remove('active');
  html.style.overflowY = "scroll";
  escuro.classList.remove('active');
});

//mobile
document.querySelector("#procurar").addEventListener('click', function() {
  html.style.overflowY = "hidden";
  headertwo.classList.add('active');
  escuroMobile.classList.add('active');
  headertwo.style.display = "flex";
});

document.querySelector("#voltar").addEventListener('click', function() {
  html.style.overflowY = "scroll";
  headertwo.classList.remove('active');
  escuroMobile.classList.remove('active');
  headertwo.style.display = "none";
});

//hide header
var lastScrollTop = 0;
window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scroll;
  if (scrollTop > lastScrollTop) {
    header.style.top = "-80px";
    categorias.style.top = "-80px";
  } else {
    header.style.top = "85px";
    categorias.style.top = "85px";
  }
  lastScrollTop = scrollTop
});

fetch(video_http + new URLSearchParams({
  key: api_key,
  part: 'snippet',
  chart: 'mostPopular',
  maxResults: 50,
  regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
  data.items.forEach(item => {
    getChannelIcon(item);
  })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(channel_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: video_data.snippet.channelId
  }))
  .then(res => res.json())
  .then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
  })
}

const makeVideoCard = (data) => {

  videoCardContainerPC.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
  <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
  <div class="content">
  <img src="${data.channelThumbnail}" class="channel-icon" alt="">
  <div class="info">
  <h4 class="title">${data.snippet.title}</h4>
  <p class="channel-name">${data.snippet.channelTitle}</p>
  </div>
  </div>
  </div>
  `;
  videoCardContainerMobile.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
  <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
  <div class="content">
  <img src="${data.channelThumbnail}" class="channel-icon" alt="">
  <div class="info">
  <h4 class="title">${data.snippet.title}</h4>
  <p class="channel-name">${data.snippet.channelTitle}</p>
  </div>
  </div>
  </div>
  `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
})
