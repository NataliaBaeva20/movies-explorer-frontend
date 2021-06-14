import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { initialMovies } from '../../utils/constants';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm />
      <MoviesCardList movies={initialMovies} saved={false} />
      <Footer />
    </>
  );
}

export default Movies;
