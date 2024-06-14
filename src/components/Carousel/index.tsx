import './carousel.css';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import RecommendedCard from '../RecommendedCard';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';

function RecommendedCarousel() {
  const { id = '' } = useParams<{ id?: string }>();
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recommendations } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');
  const sixRecommendations = recommendations.slice(0, 6);

  // return (
  //   <Carousel interval={ null } className="test" indicators={ false } variant="dark">
  //     <Carousel.Item>
  //       {sixRecommendations.slice(0, 2).map((item, index) => (
  //         <RecommendedCard key={ index } index={ index } item={ item } />
  //       ))}
  //     </Carousel.Item>
  //     <Carousel.Item>
  //       {sixRecommendations.slice(2, 4).map((item, index) => (
  //         <RecommendedCard key={ index } index={ index + 2 } item={ item } />
  //       ))}
  //     </Carousel.Item>
  //     <Carousel.Item>
  //       {sixRecommendations.slice(4, 6).map((item, index = 4) => (
  //         <RecommendedCard key={ index } index={ index + 4 } item={ item } />
  //       ))}
  //     </Carousel.Item>
  //   </Carousel>
  // );
  return (
    <div className="carousel-container">
      {sixRecommendations.slice(0, 6).map((item, index) => (
        <RecommendedCard key={ index } index={ index } item={ item } />
      ))}
    </div>
  );
}

export default RecommendedCarousel;
