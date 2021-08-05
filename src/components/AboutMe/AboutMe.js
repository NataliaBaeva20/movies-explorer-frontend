import './AboutMe.css';

import imageStudent from '../../images/my_photo.jpg';

function AboutMe() {
  return (
    <section id="about-me" className="about-me page__section">
      <h2 className="about-me__title content__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__block">
          <h3 className="about-me__info-title">Наталия</h3>
          <p className="about-me__occupation">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__description">Я начинающий фронтенд-разработчик, закончила факультет информационных технологий ИСПО СПбПУ.
          Меня увлекает процесс веб-разработки и возможность видеть результат своей работы в виде яркого, функционального, интерактивного сайта.
          Поэтому решила пройти обучение на факультете веб-разработчик в Яндекс Практикуме.
          В свободное время обожаю занимаюсь растяжкой, помогает вести здоровый образ жизни и повышает мою продуктивность.</p>
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
