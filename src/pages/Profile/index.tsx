import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import './styles.css';

function Profile() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const email = user ? JSON.parse(user).email : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div className="container profile_container mt-4">
        {email && <h4 data-testid="profile-email">{email}</h4> }
        <div className="d-flex flex-column gap-3 mt-4">
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
            className="profile_btn"
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
            className="profile_btn"
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            className="profile_btn mt-5 logout_btn"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
