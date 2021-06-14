import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

import iconProfile from '../../images/icon-profile.svg';


function Navigation(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuClick () {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="navigation">
      {!props.loggedIn ?
        <div>
          <Link to="/signup" className="menu__link menu__link_type_auth menu__link_text_medium">Регистрация</Link>
          <Link to="/signin" className="menu__link menu__link_type_auth menu__link_text_medium menu__link_color_green">Войти</Link>
        </div>
        :
        <>
          <nav className="menu">
            <NavLink to="/movies" className="menu__link" activeClassName="menu__link_text_medium">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_text_medium">Сохранённые фильмы</NavLink>
            <Link to="/profile" className="menu__link menu__link_text_medium menu__link_type_account">Аккаунт
              <div className="menu__icon"><img className="menu__icon-image" alt="Иконка аккаунта" src={iconProfile} /></div>
            </Link>
          </nav>
          <button className="menu__burger-btn" onClick={handleMenuClick}></button>
          <div className={`menu__burger ${isMenuOpen && 'menu__burger_visible'}`}>
            <div className="menu__burger-container">
              <button type="button" className="menu__burger-close-btn" aria-label="Закрыть" onClick={handleMenuClick}></button>
              <nav className="menu__burger-list">
                <NavLink exact to="/" className="menu__burger-link" activeClassName="menu__burger-link_active">Главная</NavLink>
                <NavLink to="/movies" className="menu__burger-link" activeClassName="menu__burger-link_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="menu__burger-link" activeClassName="menu__burger-link_active">Сохранённые фильмы</NavLink>
                <NavLink to="/profile" className="menu__burger-link menu__burger-link_type_account" activeClassName="menu__link_active">Аккаунт
                  <div className="menu__icon"><img className="menu__icon-image" alt="Иконка аккаунта" src={iconProfile} /></div>
                </NavLink>
              </nav>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Navigation;
