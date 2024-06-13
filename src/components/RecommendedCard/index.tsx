import './recommended-card.css';
import { Card } from 'react-bootstrap';

function RecommendedCard({ index, title }: { index: number[], title: string[] }) {
  const temp = 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg';
  return (
    <div className="recommended-card-container">
      <Card
        data-testid={ `${index[0]}-recommendation-card` }
        className="recommended-card"
      >
        <Card.Img className="recommended-img" src={ temp } />
        <Card.Footer
          className="recommended-card-footer"
          data-testid={ `${index[0]}-recommendation-title` }
        >
          {title[0]}
        </Card.Footer>
      </Card>
      <Card
        data-testid={ `${index[1]}-recommendation-card` }
        className="recommended-card"
      >
        <Card.Img className="recommended-img" src={ temp } />
        <Card.Footer
          className="recommended-card-footer"
          data-testid={ `${index[1]}-recommendation-title` }
        >
          {title[1]}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default RecommendedCard;
