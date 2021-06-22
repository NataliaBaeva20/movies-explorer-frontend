import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import { numberCardsOnPage } from '../../utils/constants'

function MoviesCardList({movies, saved, errorServer, onMovieSave, onMovieDelete}) {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [numberInitialCards, setNumberInitialCards] = React.useState(0);
  const [numberAddCards, setNumberAddCards] = React.useState(0);

  function checkNumberCardsOnPage(width) {
    if (width >= numberCardsOnPage.laptopScreen.width) {
      return numberCardsOnPage.laptopScreen;
    } else if (width >= numberCardsOnPage.tabletScreen.width) {
      return numberCardsOnPage.tabletScreen;
    } else if (width >= numberCardsOnPage.mobileScreen.width) {
      return numberCardsOnPage.mobileScreen;
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

  const newList = movies.slice(0, numberInitialCards);

  function addMoreCards() {
    setNumberInitialCards(numberCards => {
      return numberCards + numberAddCards
    });
  }

  return (
    <section className="movies page__section">
      <p className={`movies__not-found ${movies.length !== 0 && 'movies__not-found_invisible'}`}>Ничего не найдено</p>
      <p className={`movies__not-found ${!errorServer && 'movies__not-found_invisible'}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>

      <div className="movies__list">
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
      </div>

      { movies.length !== newList.length && (<button type="button" className={`movies__button ${saved && 'movies__button_invisible'}`} onClick={addMoreCards} >Ещё</button>) }
    </section>
  );
}

export default MoviesCardList;
