import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

import Header from '../Header/Header';
import { userData } from '../../utils/constants';

function Profile(props) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, []);

  function handleChange(e) {
    e.target.name === 'name' ? setName(e.target.value) : setEmail(e.target.value);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {userData.name}!</h2>
        <form className="profile__form" name="profile" noValidate>
          <label className="profile__label">Имя
            <input value={name} onChange={handleChange} type="text" name="name" className="profile__input" required minLength="2" maxLength="30" />
          </label>
          <label className="profile__label">E-mail
            <input value={email} onChange={handleChange} className="profile__input" type="url" name="email" />
          </label>
          <button type="submit" className="profile__button">Редактировать</button>
        </form>
        <Link to="/signin" className="profile__link">Выйти из аккаунта</Link>
      </section>
    </>
  );
}

export default Profile;
