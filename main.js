const url = 'https://accounts.spotify.com/api/token';
const id = window.btoa('b80116ff49ec4b59903eeed7716ae9e8:10c8f3cc424746b6853b11e7d1e987d2')

// fetch(url, {
//   body: "grant_type=client_credentials",
//   headers: {
//     'Authorization': `Basic ${id}`,
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   method: "POST"
// })
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// const accessToken = "BQCOwjPNAjuG9KNRe6CHIv05kr7njawosgqnRPF0V74Mm1DKwPh2rhBEoYsEswg97pD4gnQgmDjdB8vl8SI";

// fetch("https://api.spotify.com/v1/search?type=artist&q=beyonce", {
//   headers: {
//     "Authorization": `Bearer ${accessToken}`
//   }
// })
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
