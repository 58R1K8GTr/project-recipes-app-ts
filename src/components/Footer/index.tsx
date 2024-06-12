import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <div>
      <footer data-testid="footer" id="footer" className="footer">

        <button
          className="footer-btn"
          onClick={ () => navigate('/meals') }
          data-testid="meals-btn"
        >
          <img
            src={ mealIcon }
            alt="Ícone de Comida"
            data-testid="meals-bottom-btn"
          />
        </button>

        <button
          className="footer-btn"
          onClick={ () => navigate('/drinks') }
          data-testid="drinks-btn"
        >
          <img
            src={ drinkIcon }
            alt="Ícone de Bebida"
            data-testid="drinks-bottom-btn"
          />
        </button>

      </footer>
    </div>
  );
}

export default Footer;
