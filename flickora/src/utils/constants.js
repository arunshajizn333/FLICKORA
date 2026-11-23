export const TMDB_API_TOKEN = process.env.REACT_APP_TMDP_APITOKEN;
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const TMDB_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_TOKEN}`
  }
};

export const TMDB_BASE_URL = "https://api.themoviedb.org/3"