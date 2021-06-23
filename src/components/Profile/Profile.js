import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

import Header from '../Header/Header';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ loggedIn, onSignOut, onUpdateUser, serverResponse }) {
  const {values, setValues, handleChange, errors, isValid} = useFormWithValidation();
  const currentUser = React.useContext(CurrentUserContext);

  const [isDisable, setIsDisable] = React.useState(false);


  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  const checkValuesInput = () => currentUser.name !== values.name || currentUser.email !== values.email;

  function handleSubmit(e) {
    const { name, email } = values;

    e.preventDefault();
    onUpdateUser(name, email);
    setIsDisable(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
          <label className="profile__label">Имя
            <input value={values.name} onChange={handleChange} type="text" name="name" className="profile__input" required minLength="2" maxLength="30" pattern="[a-zA-Zа-яА-ЯёЁ\- ]{1,}"/>
            <span className="form__error profile__error">{errors.name}</span>
          </label>
          <label className="profile__label">E-mail
            <input value={values.email} onChange={handleChange} className="profile__input" type="email" name="email" />
            <span className="form__error profile__error">{errors.email}</span>
          </label>
          <p className={`profile__respons ${serverResponse && 'profile__respons_type_success'}`}>{serverResponse.message}</p>
          { !checkValuesInput() || isDisable ? <button type="submit" className="profile__button" disabled={true}>Редактировать</button>
                                : <button type="submit" className="profile__button profile__button_type_save" disabled={!isValid}>Сохранить</button> }
        </form>
        {
          !checkValuesInput() || isDisable ? <Link to="/signin" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link> : ''
        }
      </section>
    </>
  );
}

export default Profile;
