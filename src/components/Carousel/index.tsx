import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';
import RecommendedCard from '../RecommendedCard';

function RecommendedCarousel() {
  const temp = 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg';
  return (
    <div className="carousel-container">
      <Carousel
        data-bs-theme="dark"
        interval={ null }
        indicators={ false }
      >
        <Carousel.Item>
          <RecommendedCard index={ [0, 1] } title={ ['GG', 'A1'] } />
        </Carousel.Item>
        <Carousel.Item>
          <RecommendedCard index={ [2, 3] } title={ ['ABC', 'Kir'] } />
        </Carousel.Item>
        <Carousel.Item>
          <RecommendedCard index={ [4, 5] } title={ ['747', '252'] } />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default RecommendedCarousel;
