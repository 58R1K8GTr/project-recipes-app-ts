import './recommended-card.css';
import { Card } from 'react-bootstrap';
import { RecommendationProps } from '../../types';

function RecommendedCard({ item, index }: RecommendationProps) {
  const isMeal = item.strMeal !== undefined;

  return (
    <li className="recommended-card-container">
      <a
        href={ `/${isMeal ? 'meals' : 'drinks'}/${isMeal ? item.idMeal : item.idDrink}` }
        className="recommended_link"
      >
        <Card
          data-testid={ `${index}-recommendation-card` }
          className="recommended-card"
        >
          <Card.Img
            className="recommended-img"
            src={ isMeal ? item.strMealThumb : item.strDrinkThumb }
          />
          <Card.Footer
            className="recommended-card-footer"
            data-testid={ `${index}-recommendation-title` }
          >
            {isMeal ? item.strMeal : item.strDrink}
          </Card.Footer>
        </Card>
      </a>
    </li>
  );
}

export default RecommendedCard;
