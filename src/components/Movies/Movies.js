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

  function handleSwitchShortMovies() {
    setIsShorted(!isShorted);
  }

  React.useEffect(() => {
    if (isShorted) {
      const listShortMovies = searchShortMovies(movies);
      if (listShortMovies.length !== 0) {
        setShortMovies(listShortMovies);
      } else {
        setShortMovies([]);
      }
    }
  }, [movies, isShorted]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmitSearchForm} onHandleCheckbox={handleSwitchShortMovies} />
      <Preloader isActive={isActive} />
      {!isActive && (<MoviesCardList  movies={isShorted ? shortMovies : movies} saved={false} errorServer={errorServer}
                      onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} notFoundMovies={notFoundMovies}/>)}
      <Footer />
    </>
  );
}

export default Movies;
