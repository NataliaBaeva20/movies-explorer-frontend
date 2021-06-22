export class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMyMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
    .then(data => {
      return data;
    })
  }

  createMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
    })
    .then(this._checkResponse);
  }


  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  // setUserInfo({name, about}, token) {
  //   return fetch(`${this._url}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       about: about
  //     })
  //   })
  //     .then(this._checkResponse);
  // }
}

const mainApi = new MainApi({
  url: 'http://localhost:5000',
  headers: {
    // authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default mainApi;
