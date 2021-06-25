import React from 'react';
import './SavedMovies.css';
import { searchShortMovies } from '../../utils/utils';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({movies, loggedIn, onMovieDelete, onSubmitSearchForm, notFoundSavedMovies}) {
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
      <MoviesCardList movies={isShorted ? shortMovies : movies} saved={true} onMovieDelete={onMovieDelete} notFoundSavedMovies={notFoundSavedMovies}/>
      <Footer />
    </>
  );
}

export default SavedMovies;
