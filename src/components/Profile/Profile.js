import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

import Header from '../Header/Header';

function Profile({ loggedIn, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, []);

  function handleChange(e) {
    e.target.name === 'name' ? setName(e.target.value) : setEmail(e.target.value);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" noValidate>
          <label className="profile__label">Имя
            <input value={name} onChange={handleChange} type="text" name="name" className="profile__input" required minLength="2" maxLength="30" />
          </label>
          <label className="profile__label">E-mail
            <input value={email} onChange={handleChange} className="profile__input" type="url" name="email" />
          </label>
          <button type="submit" className="profile__button">Редактировать</button>
        </form>
        <Link to="/signin" className="profile__link" onClick={onSignOut} >Выйти из аккаунта</Link>
      </section>
    </>
  );
}

export default Profile;
