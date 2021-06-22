import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

import Logo from '../Logo/Logo';
import Authorization from '../Authorization/Authorization';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register() {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  return (
    <section className="register">
      <Logo />

      <Authorization title="Добро пожаловать!" name="register">
        <p className="form__input-text">Имя</p>
          <input value={values.name} onChange={handleChange} type="text" name="name" className="form__input" required minLength="2" maxLength="30" pattern="[a-zA-Zа-яА-ЯёЁ\- ]{1,}" />
          <span className="form__error">{errors.name}</span>

          <p className="form__input-text">E-mail</p>
          <input value={values.email} onChange={handleChange} type="email" name="email" className="form__input" required />
          <span className="form__error">{errors.email}</span>

          <p className="form__input-text">Пароль</p>
          <input value={values.password} onChange={handleChange} type="password" name="password" className="form__input" required />
          <span className="form__error">{errors.password}</span>

          <button type="submit" className="form__btn" disabled={!isValid}>Зарегистрироваться</button>
      </Authorization>

      <p className="auth__subtitle">Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>
    </section>
  );
}

export default Register;
