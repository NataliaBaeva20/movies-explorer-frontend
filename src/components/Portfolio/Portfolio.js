import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio page__section">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/NataliaBaeva20/how-to-learn" target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/NataliaBaeva20/russian-travel" target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/NataliaBaeva20/react-mesto-api-full" target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
