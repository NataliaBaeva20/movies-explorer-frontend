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
  const [apiMoviesList, setApiMoviesList] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState(false);

  React.useEffect(() => {
    getInitialMovies()
    .then((data) => {
      setApiMoviesList(data);
    })
    .catch(err => {
      setErrorServer(true)
      console.log(err);
    });
  }, []);

  function searchMovies(word) {
    setIsActive(!isActive);
    const listFindMovies = apiMoviesList.filter((item) => {
      return item.nameRU.toLowerCase().includes(word);
    });

    if (listFindMovies.length !== 0) {
      setIsActive(false);
      localStorage.setItem('movies', JSON.stringify(listFindMovies));
      setMovies(JSON.parse(localStorage.getItem('movies')));
    } else {
      setIsActive(false);
      setMovies([]);

    }
  }

  React.useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('movies')));
  }, []);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Movies movies={movies} loggedIn={loggedIn} onSubmitSearchForm={searchMovies} isActive={isActive} errorServer={errorServer} />
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
