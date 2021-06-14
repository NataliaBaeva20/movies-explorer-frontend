import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search page__section">
      <form className="search__form">
        <input className="search__input" placeholder="Фильм" />
        <button className="search__button"></button>
      </form>

      <div className="search__switch-box">
        <span className="search__switch-text">Короткометражки</span>
        <label className="search__switch-label">
          <input type="checkbox" className="search__switch" />
          <span className="search__switch_visible"></span>
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
