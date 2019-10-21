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
const tabs = document.querySelector('.tabs');
const songs = document.querySelector('.songs');
const albums = document.querySelector('.albums');
const albumOverlay = document.querySelector('.album-overlay');
const albumExit = document.querySelector('.album-exit');
const albumLink = document.querySelector('.album-link');
const albumCover = document.querySelector('.album-img');
const albumWrapper = document.querySelector('.album-wrapper');
const background = document.querySelector('.background-img');
const checks = document.querySelectorAll('.check');
const title = document.getElementsByTagName('title')[0];
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
    
    checks.forEach(element=>element.checked = false);
    while(songs.firstChild){
        songs.removeChild(songs.firstChild);
    }
    while(albums.firstChild){
        albums.removeChild(albums.firstChild);
    }
    console.log('added');
    inputValue = input.value.replace(" ", '%20');
    console.log(inputValue);
    fetch(searchUrl+inputValue, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.artists.items.length > 0){
                modal.classList.add('display');
    overlay.classList.add('display');
    form.classList.add('conceal');
    tabs.classList.remove('display');
    // artist.classList.add('conceal');
    input.classList.add('white');
                artistImage.src = res.artists.items[0].images[0].url;
                // background.src = res.artists.items[0].images[0].url;
                artist.innerHTML = "inside the cove with <span>"+res.artists.items[0].name+'</span>';
                artist.classList.add('small');
                title.innerText = res.artists.items[0].name + ' - The Music Cove'
                // artist.classList.remove('conceal');
                artistImage.classList.remove('corner');
                let artistID = res.artists.items[0].id
                fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?offset=0&limit=10&market=US`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        let albumArray = [];
                        let foundSame = false
                        for (let i = 0; i < res.items.length; i++) {
                            for(let j = 0; j < albumArray.length; j++){
                                if(albumArray[j].name == res.items[i].name){
                                    foundSame = true;
                                }
                            } 
                            if(foundSame == false){
                                albumArray.push(res.items[i]);
                            }
                            foundSame = false;
                        }
                        let albumNames = albumArray.map(element=>element.name);
                        // res.items.map((element) =>{
                            // if(!albumNames.includes(element.name)){
                            //     return element.name
                            // } else return
                        //     return element.name
                        // });
                        let albumURL = albumArray.map(element => element.external_urls.spotify);
                        let albumImg = albumArray.map(element => element.images[0].url)
                        for (let i = 0; i < albumNames.length; i++) {
                            let albumList = document.createElement('a');
                            albumList.href = '#';
                            albumList.innerText = albumNames[i];
                            albumList.addEventListener('click', e =>{
                                e.preventDefault();
                                albumCover.src = albumImg[i];
                                albumCover.alt = albumNames[i];
                                albumLink.href = albumURL[i];
                                albumLink.target = '_blank';
                                albumOverlay.classList.add('display');
                                albumWrapper.style.transform = 'scale(1)';
                                albumExit.addEventListener('click', e =>{
                                    albumOverlay.classList.remove('display');
                                    albumWrapper.style.transform = 'scale(0)';
                                })
                                
                            })
                            
                            albums.appendChild(albumList);
                        }
                        // albums.innerHTML = `<span>&bull;</span> ${res.items[0].name}<br><span>&bull;</span> ${res.items[1].name}<br><span>&bull;</span> ${res.items[2].name}`
                        console.log(res)
                    })
                    .catch(err => console.log(err))
                fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                    })
                .then(res => res.json())
                .then(res => {
                    let tracks = res.tracks.map(element => element.name);
                    let trackURL = res.tracks.map(element => element.external_urls.spotify)
                    for (let i = 0; i < tracks.length; i++) {
                        let trackLink = document.createElement('a');
                        trackLink.href = trackURL[i];
                        trackLink.innerText = (i+1)+'.  ' +tracks[i];
                        trackLink.target = '_blank';
                        songs.appendChild(trackLink);
                    }
                    // songs.innerHTML = `<span>&bull;</span> ${tracks[0].name} <br> <span>&bull;</span>  ${tracks[1].name} <br> <span>&bull;</span>  ${tracks[2].name} <br> <span>&bull;</span>  ${tracks[3].name} <br> <span>&bull;</span>  ${tracks[4].name}`
                    console.log(res)}) 
                .catch(err => console.log(err))   
                setTimeout(toggle, 2000);
            }
        })
        .catch(err => console.log(err))
})

function toggle(){
    console.log('clicked')
                artistImage.classList.add('corner');
                form.classList.remove('conceal');
                form.classList.add('bottom');
                tabs.classList.add('display');
}