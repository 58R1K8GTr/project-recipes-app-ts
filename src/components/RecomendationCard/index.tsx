import React from 'react';
import { RecommendationProps } from '../../types';

function RecommendationCard({ item, index }: RecommendationProps) {
  const isMeal = item.strMeal !== undefined;

  return (
    <div className="recommendation-card" data-testid={ `${index}-recommendation-card` }>
      <img
        src={ isMeal ? item.strMealThumb : item.strDrinkThumb }
        alt={ isMeal ? item.strMeal : item.strDrink }
      />
      <p>{isMeal ? item.strMeal : item.strDrink}</p>
    </div>
  );
}

export default RecommendationCard;
