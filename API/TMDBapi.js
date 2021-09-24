// API/TMDBApi.js

const API_TOKEN = "a5f9dc349405e9b5a990146f5005600b";

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

}
