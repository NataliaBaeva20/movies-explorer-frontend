import React from 'react';
import './MoviesCard.css';

import { setTimeFormat } from '../../utils/utils';

function MoviesCard({movie, saved, onMovieSave, onMovieDelete}) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isBtnDelete, setisBtnDelete] = React.useState(false);

  const name = movie.nameRU;
  const linkImage = `${saved ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}`;
  const trailerLink = movie.trailerLink;
  const duration = movie.duration;
  const savedMovie = JSON.parse(localStorage.getItem('savedMovies')).find((item) => item.nameRU === movie.nameRU);

  function handleMouseEnter() {
    setisBtnDelete(true);
  }

  function handleMouseLeave() {
    setisBtnDelete(false);
  }

  function handleMovieDeleteClick() {
    if(saved) {
      onMovieDelete(movie._id);
    } else {
      onMovieDelete(savedMovie._id);
      setIsSaved(false);
    }
  }

  function handleMovieLikeClick() {
    if(isSaved) {
      handleMovieDeleteClick();
    } else {
      onMovieSave(movie);
      setIsSaved(!isSaved);
    }
  }

  React.useEffect(() => {
    savedMovie ? setIsSaved(true) : setIsSaved(false);
  }, [savedMovie]);

  return (
    <article className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer" className="card__trailer-link">
        <img className="card__image" alt={`Постер фильма "${name}"`} src={linkImage} />
      </a>
      <div className="card__block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h2 className="card__title">{name}</h2>
        {
          saved ? <button type="button" className={`card__button card__btn-delete ${isBtnDelete && 'card__btn-delete_visible'}`} onClick={handleMovieDeleteClick}></button>
                : <button type="button" className={`card__button card__btn-save ${isSaved ? 'card__btn-save_active' : ''}`} onClick={handleMovieLikeClick} ></button>
        }
      </div>
      <p className="card__duration">{setTimeFormat(duration)}</p>
    </article>
  );
}

export default MoviesCard;
