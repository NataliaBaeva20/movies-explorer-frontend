import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, loggedIn, onSubmitSearchForm}) {

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmitSearchForm} />
      <MoviesCardList movies={movies} saved={false} />
      <Footer />
    </>
  );
}

export default Movies;
