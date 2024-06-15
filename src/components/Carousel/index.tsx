import './carousel.css';
import { useParams } from 'react-router-dom';
import RecommendedCard from '../RecommendedCard';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';

function RecommendedCarousel() {
  const { id = '' } = useParams<{ id?: string }>();
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recommendations } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');
  const sixRecommendations = recommendations.slice(0, 6);

  return (
    <div className="carousel-container">
      {sixRecommendations.slice(0, 6).map((item, index) => (
        <RecommendedCard key={ index } index={ index } item={ item } />
      ))}
    </div>
  );
}

export default RecommendedCarousel;
