const url = 'https://accounts.spotify.com/api/token';
const id = window.btoa('b80116ff49ec4b59903eeed7716ae9e8:10c8f3cc424746b6853b11e7d1e987d2')
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const overlay = document.querySelector('.overlay');
let accessToken;
const input = document.querySelector('.field');
let inputValue;
let artistImage = document.querySelector('.artist-img');
let artist = document.querySelector('.artist');
const searchUrl = 'https://api.spotify.com/v1/search?type=artist&q='

fetch(url, {
    body: "grant_type=client_credentials",
    headers: {
      'Authorization': `Basic ${id}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
      .then(res => res.json())
      .then(res => accessToken = res.access_token)
      .catch(err => console.log(err))

form.addEventListener('submit', function(e){
    e.preventDefault();
    modal.classList.add('display');
    overlay.classList.add('display');
    form.classList.add('conceal');
    artistImage.classList.add('radius');

    console.log('added');
    inputValue = input.value.replace(" ", '%20');
    console.log(inputValue)
    fetch(searchUrl+inputValue, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            artistImage.src = res.artists.items[0].images[0].url;
            artist.textContent = res.artists.items[0].name
        })
        .catch(err => console.log(err))
})