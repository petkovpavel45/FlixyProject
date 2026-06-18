const key = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
  popular:  `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/trending/movie/day?api_key=${key}`,
  comedy:   `${baseUrl}/discover/movie?api_key=${key}&with_genres=35&language=en-US`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
  action:   `${baseUrl}/discover/movie?api_key=${key}&with_genres=28&language=en-US`,
  horror:   `${baseUrl}/discover/movie?api_key=${key}&with_genres=27&language=en-US`,
};

export function createImageUrl(filename, size) {
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

export function getVideosUrl(movieId) {
  return `${baseUrl}/movie/${movieId}/videos?api_key=${key}`;
}

export function getCreditsUrl(movieId) {
  return `${baseUrl}/movie/${movieId}/credits?api_key=${key}`;
}

export function getSearchUrl(query, page = 1) {
  return `${baseUrl}/search/movie?api_key=${key}&query=${encodeURIComponent(query)}&page=${page}`;
}

export function getDetailsUrl(movieId) {
  return `${baseUrl}/movie/${movieId}?api_key=${key}`;
}

export default endpoints;
