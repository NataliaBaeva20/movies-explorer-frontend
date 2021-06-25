import { SHORT_FILM_MAX_TIME } from './constants';

export function setTimeFormat(time) {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;

  return `${hours === 0 ? '' : `${hours}ч` } ${minutes}м`;
}

export function searchShortMovies(movies) {
  return movies.filter((item) => item.duration <= SHORT_FILM_MAX_TIME);
}
