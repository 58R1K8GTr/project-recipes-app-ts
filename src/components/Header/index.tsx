import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const { pathname } = useLocation();

  const getTitle = () => {
    return pathname.slice(1).replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  const noSearchIcon = () => {
    return (
      <>
        <Link to="/profile">
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{getTitle()}</h1>
      </>
    );
  };

  const fullHeader = () => {
    return (
      <header>
        <button onClick={ () => setIsHidden(!isHidden) }>
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </button>
        {noSearchIcon()}
        {
          isHidden && <SearchBar />
        }
      </header>
    );
  };
  switch (pathname) {
    case '/meals':
      return fullHeader();
    case '/drinks':
      return fullHeader();
    case '/profile':
      return noSearchIcon();
    case '/done-recipes':
      return noSearchIcon();
    case '/favorite-recipes':
      return noSearchIcon();
    default:
  }
}

export default Header;
