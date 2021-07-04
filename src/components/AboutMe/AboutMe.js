import './AboutMe.css';

import imageStudent from '../../images/image-student.png';

function AboutMe() {
  return (
    <section id="about-me" className="about-me page__section">
      <h2 className="about-me__title content__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__block">
          <h3 className="about-me__info-title">Виталий</h3>
          <p className="about-me__occupation">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>

          <ul className="about-me__links">
            <li className="about-me__link-item">
              <a href="https://www.facebook.com/" target='_blank' rel="noreferrer" className="about-me__link">Facebook</a>
            </li>
            <li className="about-me__link-item">
              <a href="https://github.com/" target='_blank' rel="noreferrer" className="about-me__link">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__image" alt="Фотография струдента" src={imageStudent} />
      </div>
    </section>
  );
}

export default AboutMe;
