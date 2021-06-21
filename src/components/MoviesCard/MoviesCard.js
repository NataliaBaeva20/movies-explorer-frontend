import React from 'react';
import './MoviesCard.css';

function MoviesCard({movie, saved}) {
  const [isBtnDelete, setisBtnDelete] = React.useState(false);

  const name = movie.nameRU;
  const linkImage = movie.image.url;
  const trailerLink = movie.trailerLink;
  const duration = movie.duration;

  function handleMouseEnter() {
    setisBtnDelete(true);
  }

  function handleMouseLeave() {
    setisBtnDelete(false);
  }

  function handleClick(e) {
    e.target.classList.toggle('card__btn-save_active');
  }

  function setTimeFormat(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;

    return `${hours === 0 ? '' : `${hours}ч` } ${minutes}м`;
  }

  return (
    <article className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer" className="card__trailer-link">
        <img className="card__image" alt={`Постер фильма "${name}"`} src={`https://api.nomoreparties.co${linkImage}`} />
      </a>
      <div className="card__block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h2 className="card__title">{name}</h2>
        {
          saved ? <button type="button" className={`card__button card__btn-delete ${isBtnDelete && 'card__btn-delete_visible'}`}></button>
                : <button type="button" className="card__button card__btn-save" onClick={handleClick}></button>
        }
      </div>
      <p className="card__duration">{setTimeFormat(duration)}</p>
    </article>
  );
}

export default MoviesCard;
