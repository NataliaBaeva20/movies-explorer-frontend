import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({movies, loggedIn, onMovieDelete}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList movies={movies} saved={true} onMovieDelete={onMovieDelete} />
      <Footer />
    </>
  );
}

export default SavedMovies;
