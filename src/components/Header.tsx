import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShowSearch, setIsShowSearch] = useState(false);

  const renderTitle = () => {
    switch (location.pathname) {
      case '/meals':
        return 'Meals';
      case '/drinks':
        return 'Drinks';
      case '/profile':
        return 'Profile';
      case '/done-recipes':
        return 'Done Recipes';
      case '/favorite-recipes':
        return 'Favorite Recipes';
      default:
        return '';
    }
  };

  const shouldShowSearchIcon = () => {
    return location.pathname === '/meals' || location.pathname === '/drinks';
  };

  const shouldShowHeader = () => {
    const noHeaderPaths = [
      '/',
      '/meals/:id',
      '/drinks/:id',
      '/meals/:id/in-progress',
      '/drinks/:id/in-progress',
    ];

    return !noHeaderPaths.some((path) => {
      const regex = new RegExp(`^${path.replace(':id', '[^/]+')}$`);
      return regex.test(location.pathname);
    });
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleSearch = () => {
    setIsShowSearch(!isShowSearch);
  };

  if (!shouldShowHeader()) {
    return null;
  }

  return (
    <header>
      <button data-testid="profile-top-btn" onClick={ handleProfileClick }>
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      {shouldShowSearchIcon() && (
        <button data-testid="search-top-btn" onClick={ toggleSearch }>
          <img src={ searchIcon } alt="Search Icon" />
        </button>
      )}
      <h1 data-testid="page-title">{renderTitle()}</h1>
      {isShowSearch && (
        <input data-testid="search-input" type="text" placeholder="Search..." />
      )}
    </header>
  );
}

export default Header;
