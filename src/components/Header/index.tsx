import { Link, useLocation } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import './style.css';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { pathname } = useLocation();

  const getTitle = () => {
    return pathname.slice(1).replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  useEffect(() => {
    const showSearchButton = () => {
      switch (pathname) {
        case '/meals':
          return setIsShowSearch(true);
        case '/drinks':
          return setIsShowSearch(true);
        default:
          return setIsShowSearch(false);
      }
    };
    showSearchButton();
  }, [pathname]);

  return (
    <header
      className="header p-2"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="header_logo">
          <Link to="/meals" className="header_link">
            <h3 className="header_title">Smart Cook</h3>
          </Link>
        </div>
        <div className="header_buttons">
          {
            isShowSearch
            && (
              <button
                className="search_button"
                onClick={ () => setIsHidden(!isHidden) }
              >
                {!isHidden
                  ? <img
                      data-testid="search-top-btn"
                      src={ searchIcon }
                      alt=""
                  />
                  : <IoClose
                      data-testid="search-top-btn"
                      className="text-primary-color close-btn"
                  />}
              </button>
            )
          }
          <Link
            to="/profile"
            className="link"
          >
            <img
              className="profile_icon"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt=""
            />
          </Link>
        </div>
      </div>
      <h1 data-testid="page-title">{getTitle()}</h1>
      {
        isHidden && <SearchBar />
      }
    </header>
  );
}

export default Header;
