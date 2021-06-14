import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import Logo from '../Logo/Logo';
import Authorization from '../Authorization/Authorization';

function Login() {
  return (
    <section className="login">
      <Logo />

      <Authorization title="Рады видеть!" name="login">
        <p className="form__input-text">E-mail</p>
        <input id="email-user" type="url" name="email" className="form__input" required />
        <span className="form__error email-user-error">Ошибка</span>

        <p className="form__input-text">Пароль</p>
        <input id="password" type="password" name="password" className="form__input" required />
        <span className="form__error password-error">Что-то пошло не так...</span>

        <button type="submit" className="form__btn login__bnt">Войти</button>
      </Authorization>

      <p className="auth__subtitle">Ещё не зарегистрированы? <Link to="/signup" className="auth__link">Регистрация</Link></p>
    </section>
  );
}

export default Login;
