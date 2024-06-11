import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      {email && <h4 data-testid="profile-email">{email}</h4> }
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }

      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
