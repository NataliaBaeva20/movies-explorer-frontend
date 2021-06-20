import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { getInitialMovies } from '../../utils/MoviesApi';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [moviesList, setMoviesList] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getInitialMovies()
    .then((data) => {
      setMoviesList(data);
    });
  }, []);

  function searchMovies(word) {
    const listFindMovies = moviesList.filter((item) => {
      return item.nameRU.toLowerCase().includes(word);
    });

    setMovies(listFindMovies)
  }


  // console.log(movies);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Movies movies={movies} loggedIn={loggedIn} onSubmitSearchForm={searchMovies} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies loggedIn={loggedIn} />
        </Route>
        <Route path="/profile">
          <Profile loggedIn={loggedIn} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
