import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="technologies">
      <div className="technologies__container page__section">
        <h2 className="technologies__title content__title">Технологии</h2>
        <h3 className="technologies__heading">7 технологий</h3>
        <p className="technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном&nbsp;проекте.</p>
        <ul className="technologies__list">
          <li className="technologies__item">HTML</li>
          <li className="technologies__item">CSS</li>
          <li className="technologies__item">JS</li>
          <li className="technologies__item">React</li>
          <li className="technologies__item">Git</li>
          <li className="technologies__item">Express.js</li>
          <li className="technologies__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
