import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, loggedIn, onSubmitSearchForm, isActive, errorServer}) {
  // const [isActive, setIsActive] = React.useState(false);

  // function onSubmit(word) {
  //   setIsActive(true);
  //   console.log(isActive)
  //   onSubmitSearchForm(word);

  // }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmitSearchForm} />
      <Preloader isActive={isActive} />
      <MoviesCardList movies={movies} saved={false} errorServer={errorServer} />
      <Footer />
    </>
  );
}

export default Movies;
