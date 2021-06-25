import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
  const [currentUser, setCurrentUser] = React.useState({name: 'Имя', email: 'pochta@yandex.ru'});
  const [apiMoviesList, setApiMoviesList] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isActivePreloader, setIsActivePreloader] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState(false);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [notFoundSavedMovies, setNotFoundSavedMovies] = React.useState(false);
  const [token, setToken] = React.useState('');
  const history = useHistory();

  const [loginServerResponse, setLoginServerResponse] = React.useState('');
  const [registerServerResponse, setRegisterLoginServerResponse] = React.useState('');
  const [updateUserServerResponse, setUpdateUserLoginServerResponse] = React.useState({message: '', success: false });

  function handleSearchMovies(movies, word) {
    const findMovies = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(word);
    });
    return findMovies;
  }

  function searchMyMovies(word) {
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    const listFindMovies = handleSearchMovies(movies, word);

    if(listFindMovies.length !== 0) {
      setSavedMovies(listFindMovies);
      setNotFoundSavedMovies(false);
    } else {
      setSavedMovies([]);
      setNotFoundSavedMovies(true);
    }
  }

  function searchMovies(word) {
    setIsActivePreloader(true);
    const listFindMovies = handleSearchMovies(apiMoviesList, word);

    if (listFindMovies.length !== 0) {
      setIsActivePreloader(false);
      localStorage.setItem('movies', JSON.stringify(listFindMovies));
      setMovies(JSON.parse(localStorage.getItem('movies')));
      setNotFoundMovies(false);
    } else {
      setIsActivePreloader(false);
      setNotFoundMovies(true);
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
        const newSavedMovies = [...savedMovies, savedMovie];
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies([...savedMovies, savedMovie]);
      })
  }

  function handleMovieDelete(id) {
    mainApi.deleteMovie(id, token)
      .then(data => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newSavedMovies);
      })
  }

  function handleUpdateUser(name, email) {
    mainApi.updateUserInfo(name, email, token)
      .then(data => {
        setUpdateUserLoginServerResponse({
          message: 'Данные успешно обновлены!',
          success: true
        });
        setCurrentUser({ name: name, email: email });
      })
      .catch(err => {
        console.log(err.message)
        setUpdateUserLoginServerResponse({
          message: err.message,
          success: false
        });
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(data => {
        if(data.token) {
          localStorage.setItem('loggedIn', 'true');
          setLoggedIn(JSON.parse(localStorage.getItem('loggedIn')));
          setToken(localStorage.getItem('jwt'));

          mainApi.getUserInfo(data.token)
            .then(data => {
              setCurrentUser({ name: data.name, email: data.email });
            })
            .catch((err) => {
              console.log(err);
            });
          history.push('/movies');
        }
      })
      .catch(err => {
        setLoginServerResponse(err.message);
      });
  }

  function handleRegisterUser(name, email, password) {
    auth.register(name, email, password)
      .then(data => {
        handleLogin(email, password);
      })
      .catch(err => {
        setRegisterLoginServerResponse(err.message);
      });
  }

  function handleSignOut() {
    localStorage.setItem('loggedIn', 'false');
    setLoggedIn(JSON.parse(localStorage.getItem('loggedIn')));
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    setMovies([]);
    history.push('/');
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email });
            setToken(localStorage.getItem('jwt'));
            localStorage.setItem('loggedIn', 'true');
            setLoggedIn(JSON.parse(localStorage.getItem('loggedIn')));
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
        })
        .catch(err => {
          console.log(err);
          setErrorServer(true);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    getInitialMovies()
    .then((data) => {
      setApiMoviesList(data);
    })
    .catch(err => {
      console.log(err);
      setErrorServer(true);
    });
  }, []);

  React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if(movies && movies !== 0) {
      setMovies(movies);
    } else {
      setMovies([]);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          {/* <Route exact path="/">
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin" />}
          </Route> */}
          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            movies={movies}
            isActive={isActivePreloader}
            errorServer={errorServer}
            notFoundMovies={notFoundMovies}
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
            onSubmitSearchForm={searchMyMovies}
            notFoundSavedMovies={notFoundSavedMovies}
          />
          <ProtectedRoute
            exact path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            serverResponse={updateUserServerResponse}
          />
          <Route path="/signin">
            <Login onLogin={handleLogin} serverResponse={loginServerResponse} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegisterUser} serverResponse={registerServerResponse} />
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
