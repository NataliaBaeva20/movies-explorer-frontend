import './AboutProject.css';

function AboutProject() {
  return (
    <section id="project" className="project page__section">
      <h2 className="project__title content__title">О проекте</h2>
      <div className="project__description">
        <div className="project__container">
          <h3 className="project__container-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__container-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__container">
          <h3 className="project__container-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__container-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__steps">
          <p className="project__step project__step_type_back">1 неделя</p>
          <p className="project__step project__step_type_front">4 недели</p>
          <p className="project__step project__step-description">Back-end</p>
          <p className="project__step project__step-description">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
