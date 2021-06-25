import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import { NUMBER_CARDS } from '../../utils/constants';

function MoviesCardList({movies, saved, errorServer, onMovieSave, onMovieDelete, notFoundMovies, notFoundSavedMovies}) {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [numberInitialCards, setNumberInitialCards] = React.useState(0);
  const [numberAddCards, setNumberAddCards] = React.useState(0);

  function checkNumberCardsOnPage(width) {
    if (width >= NUMBER_CARDS.laptopScreen.width) {
      return NUMBER_CARDS.laptopScreen;
    } else if (width >= NUMBER_CARDS.tabletScreen.width) {
      return NUMBER_CARDS.tabletScreen;
    } else if (width >= NUMBER_CARDS.mobileScreen.width) {
      return NUMBER_CARDS.mobileScreen;
    }
  }

  React.useEffect(() => {
    let timer = null;

    function resizeHandler() {
      clearTimeout(timer);
      timer = setTimeout(() => setScreenWidth(window.screen.width), 800);
    }

    window.addEventListener('resize', resizeHandler);
  }, []);

  React.useEffect(() => {
    const cardsOnPage = checkNumberCardsOnPage(window.screen.width);
    setNumberInitialCards(cardsOnPage.initialCards);
    setNumberAddCards(cardsOnPage.addCards);
  }, [screenWidth]);

  const newList = !saved ? movies.slice(0, numberInitialCards) : movies;

  function addMoreCards() {
    setNumberInitialCards(numberCards => {
      return numberCards + numberAddCards;
    });
  }

  return (
    <section className="movies page__section">
      { saved ? <p className={`movies__not-found ${!notFoundSavedMovies && 'movies__not-found_invisible'}`}>В сохраненных фильмах ничего не найдено</p>
              : <p className={`movies__not-found ${!notFoundMovies && 'movies__not-found_invisible'}`}>Ничего не найдено</p> }
      <p className={`movies__not-found ${!errorServer && 'movies__not-found_invisible'}`}>Во время запроса произошла ошибка. Возможно,
                    проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
      {
        movies.length !== 0 &&
          (<div className="movies__list">
            {
              newList.map(item => (
                <MoviesCard
                    key={saved ? item._id : item.id}
                    movie={item}
                    saved={saved}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                )
              )
            }
          </div>)
      }
      <div className="movies__button-area">
        { movies.length !== newList.length && (<button type="button" className={`movies__button ${saved && 'movies__button_invisible'}`} onClick={addMoreCards}>Ещё</button>) }
      </div>
    </section>
  );
}

export default MoviesCardList;
