import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <a href="#project" className="nav-tab__link">
            <button type="button" className="nav-tab__button">О проекте</button>
          </a>
        </li>
        <li className="nav-tab__item">
          <a href="#techs" className="nav-tab__link">
            <button type="button" className="nav-tab__button">Технологии</button>
          </a>
        </li>
        <li className="nav-tab__item">
          <a href="#about-me" className="nav-tab__link">
            <button type="button" className="nav-tab__button">Студент</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
