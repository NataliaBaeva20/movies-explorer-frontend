import imageOne from '../images/card-image/card-1.png';
import imageTwo from '../images/card-image/pic-2.png';
import imageThree from '../images/card-image/pic-3.png';

export const numberCardsOnPage = {
  laptopScreen: {
    width: 1280,
    initialCards: 12,
    addCards: 4
  },
  tabletScreen: {
    width: 768,
    initialCards: 8,
    addCards: 2
  },
  mobileScreen: {
    width: 320,
    initialCards: 5,
    addCards: 1
  }
}

export const userData = {
  name: 'Виталий',
  email: 'pochta@yandex.ru'
}

export const initialSavedMovies = [
  {
    country: 'США',
    director: 'Режиссёр',
    duration: '1ч 42м',
    year: '2021',
    description: 'О фильме',
    image: imageOne,
    trailer: 'ссылка на трейлер фильма',
    thumbnail: imageOne,
    movieId: '1',
    nameRU: '33 слова о дизайне',
    nameEN: '33 words about design'
  },
  {
    country: 'США',
    director: 'Режиссёр',
    duration: '1ч 42м',
    year: '2021',
    description: 'О фильме',
    image: imageTwo,
    trailer: 'ссылка на трейлер фильма',
    thumbnail: imageTwo,
    movieId: '2',
    nameRU: 'Киноальманах «100 лет дизайна»',
    nameEN: 'Film almanac «100 years of design»'
  },
  {
    country: 'США',
    director: 'Режиссёр',
    duration: '1ч 42м',
    year: '2021',
    description: 'О фильме',
    image: imageThree,
    trailer: 'ссылка на трейлер фильма',
    thumbnail: imageThree,
    movieId: '3',
    nameRU: 'В погоне за Бенкси',
    nameEN: ''
  }
];
