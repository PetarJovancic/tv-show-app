const keyAPI = `0539759741f1e7ffcabf46ef631258a7`;
const discoverAPI = `https://api.themoviedb.org/3/discover/tv?api_key=${keyAPI}&sort_by=popularity.desc&include_adult=false&page=`;
// const tvID = `12`;
// const api_img2 = `https://api.themoviedb.org/3/tv/${tvID}/images?api_key=${api_key}&language=en-US`;
const imgAPI = `https://image.tmdb.org/t/p/w500`;
const searchAPI = `https://api.themoviedb.org/3/search/tv?api_key=${keyAPI}&language=en-US&page=1&include_adult=false&query=`;

export { keyAPI, discoverAPI, imgAPI, searchAPI };
