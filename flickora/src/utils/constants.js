export const TMDB_API_TOKEN = process.env.REACT_APP_TMDP_APITOKEN;
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const TMDB_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_TOKEN}`
  }
};

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const API_IMG_URL = "https://api.themoviedb.org/3/movie/";