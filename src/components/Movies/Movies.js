import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, loggedIn, onSubmitSearchForm, isActive, errorServer, onMovieSave, onMovieDelete}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmitSearchForm} />
      <Preloader isActive={isActive} />
      <MoviesCardList movies={movies} saved={false} errorServer={errorServer} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} />
      <Footer />
    </>
  );
}

export default Movies;
