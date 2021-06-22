import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { getInitialMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name: 'Имя', email: 'pochta@yandex.ru'});
  const [apiMoviesList, setApiMoviesList] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState(false);
  const [token, setToken] = React.useState('');
  const history = useHistory();

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

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(data => {
        if(data.token) {
          setLoggedIn(true);
          setToken(localStorage.getItem('jwt'));
          history.push('/movies');
        }
      })
  }

  function handelRegisterUser(name, email, password) {
    console.log('регистрация');
    auth.register(name, email, password)
      .then(data => {
        handleLogin(email, password);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email });
            setLoggedIn(true);
            setToken(localStorage.getItem('jwt'));
            history.push('/movies');
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      mainApi.getMyMovies(localStorage.getItem('jwt'))
        .then(data => {
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('movies')));
    // console.log(JSON.parse(localStorage.getItem('movies')));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} >
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute
          exact path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          movies={movies}
          isActive={isActive}
          errorServer={errorServer}
          onSubmitSearchForm={searchMovies}
          onMovieSave={handleMovieSave}
          onMovieDelete={handleMovieDelete}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          component={SavedMovies}
          movies={savedMovies}
          loggedIn={loggedIn}
          onMovieDelete={handleMovieDelete}
        />
        <ProtectedRoute
          exact path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onSignOut={handleSignOut}
        />
        <Route path="/signup">
          <Register onRegister={handelRegisterUser} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
