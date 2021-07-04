import React from 'react';
import './Movies.css';
import { searchShortMovies } from '../../utils/utils';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, loggedIn, onSubmitSearchForm, isActive, errorServer, notFoundMovies, onMovieSave, onMovieDelete}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isShorted, setIsShorted] = React.useState(false);
  const [notFoundShort, setNotFoundShort] = React.useState(false);

  function handleSwitchShortMovies() {
    setIsShorted(!isShorted);
  }

  React.useEffect(() => {
    if (isShorted) {
      const listShortMovies = searchShortMovies(movies);
      if (listShortMovies.length !== 0) {
        setShortMovies(listShortMovies);
        setNotFoundShort(false);
      } else {
        setShortMovies([]);
        setNotFoundShort(true);
      }
    } else {
      !isShorted && setNotFoundShort(false);
    }
  }, [movies, isShorted]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmitSearchForm} onHandleCheckbox={handleSwitchShortMovies} />
      <Preloader isActive={isActive} />
      {!isActive && (<MoviesCardList  movies={isShorted ? shortMovies : movies} saved={false} errorServer={errorServer}
                      onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} notFoundMovies={notFoundShort ? notFoundShort : notFoundMovies}/>)}
      <Footer />
    </>
  );
}

export default Movies;
