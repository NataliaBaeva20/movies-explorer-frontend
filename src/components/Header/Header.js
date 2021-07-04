import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  return (
    <header className="header page__section">
      <Logo />
      <Navigation loggedIn={props.loggedIn} />
    </header>
  );
}

export default Header;
