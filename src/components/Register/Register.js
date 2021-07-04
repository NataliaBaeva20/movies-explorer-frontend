import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

import Logo from '../Logo/Logo';
import Authorization from '../Authorization/Authorization';

function Register() {
  return (
    <section className="register">
      <Logo />

      <Authorization title="Добро пожаловать!" name="register">
        <p className="form__input-text">Имя</p>
        <input id="name" type="text" name="name" className="form__input" required minLength="2" maxLength="30" />
        <span className="form__error name-error"></span>

        <p className="form__input-text">E-mail</p>
        <input id="email-user" type="url" name="email" className="form__input" required />
        <span className="form__error email-user-error"></span>

        <p className="form__input-text">Пароль</p>
        <input id="password" type="password" name="password" className="form__input" required />
        <span className="form__error password-error">Что-то пошло не так...</span>

        <button type="submit" className="form__btn">Зарегистрироваться</button>
      </Authorization>

      <p className="auth__subtitle">Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>
    </section>
  );
}

export default Register;
