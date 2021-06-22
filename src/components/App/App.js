import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { getInitialMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [apiMoviesList, setApiMoviesList] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4ZTYxNmEzOTFjMzIyOThhZjg2ODIiLCJpYXQiOjE2MjQzMDI5NTYsImV4cCI6MTYyNDkwNzc1Nn0.E8XkBDEVAgasBilZMdRsCMc-0s3XSOnhLv-qJaC5oa4';

  React.useEffect(() => {
    getInitialMovies()
    .then((data) => {
      setApiMoviesList(data);
      // console.log(data)
    })
    .catch(err => {
      setErrorServer(true);
      // console.log(err);
    });

    mainApi.getMyMovies(token)
      .then(data => {
        setSavedMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
        // console.log(data);
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

  function handleMovieSave(movie) {
    mainApi.createMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailer: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }, token)
      .then(savedMovie => {
        console.log(savedMovie);
        const newSavedMovies = [...savedMovies, savedMovie];
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies([...savedMovies, savedMovie]);
      })
  }

  function handleMovieDelete(id) {
    console.log(id);
    mainApi.deleteMovie(id, token)
      .then(data => {
        console.log(data);
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newSavedMovies);
      })
  }

  function handelRegisterUser() {

  }

  React.useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('movies')));
    // console.log(JSON.parse(localStorage.getItem('movies')));
  }, []);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Movies movies={movies} loggedIn={loggedIn} onSubmitSearchForm={searchMovies} isActive={isActive} errorServer={errorServer} onMovieSave={handleMovieSave} onMovieDelete={handleMovieDelete} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies movies={savedMovies} loggedIn={loggedIn} onMovieDelete={handleMovieDelete} />
        </Route>
        <Route path="/profile">
          <Profile loggedIn={loggedIn} />
        </Route>
        <Route path="/signup" onRegister={handelRegisterUser}>
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
