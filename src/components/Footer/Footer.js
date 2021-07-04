import './Footer.css';

function Footer() {
  return (
    <section className="footer page__section">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__contain">
        <p className="footer__copyright">&copy; 2020</p>
        <nav className="footer__nav">
          <ul className="footer__links">
            <li className="footer__link-item">
              <a href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
            </li>
            <li className="footer__link-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__link">Facebook</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Footer;
