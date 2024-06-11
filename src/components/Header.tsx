import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
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

  if (!shouldShowHeader()) {
    return null;
  }
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      {shouldShowSearchIcon()
        && <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />}
      <h1 data-testid="page-title">{renderTitle()}</h1>
    </header>
  );
}

export default Header;
