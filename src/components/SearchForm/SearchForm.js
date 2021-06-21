import React from 'react';
import './SearchForm.css';

function SearchForm({onSubmit}) {
  const [search, setSearch] = React.useState('');

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(search.length === 0) {
      console.log('Нужно ввести ключевое слово');
    } else {
      onSubmit(search);
    }
  }

  return (
    <section className="search page__section">
      <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
        <input value={search} onChange={handleChange} type="text" name="searchInput" className="search__input" placeholder="Фильм" required/>
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
