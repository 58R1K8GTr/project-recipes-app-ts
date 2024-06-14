import React from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../RecomendationCard';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';
import { Recipe } from '../../types';
import RecommendedCard from '../RecommendedCard';
import RecommendedCarousel from '../Carousel';
import './recipe-details.css';

function RecipeDetails() {
  const { id = '' } = useParams<{ id?: string }>();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recipe,
    recommendations,
    isLoading } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');

  if (isLoading) return <div>Loading...</div>;

  if (!recipe) { return <h1>NOT FOUND</h1>; }

  if (recipe[type] === null) { return <h1>NOT FOUND</h1>; }

  const recipeData = recipe[type];

  return (
    <div className="recipe-details">
      {recipeData && recipeData.map((recipeInfo: Recipe) => (
        <>
          <img
            data-testid="recipe-photo"
            src={ isMeal ? recipeInfo.strMealThumb : recipeInfo.strDrinkThumb }
            alt={ isMeal ? recipeInfo.strMeal : recipeInfo.strDrink }
          />
          <h1 data-testid="recipe-title">
            {isMeal ? recipeInfo.strMeal : recipeInfo.strDrink}
          </h1>
          <p data-testid="recipe-category">
            {isMeal ? recipeInfo.strCategory : recipeInfo.strAlcoholic}
          </p>
          <ul>
            {Object.keys(recipeInfo)
              .filter((key) => key.includes('Ingredient') && recipeInfo[key])
              .map((key, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {recipeInfo[key]}
                  {' '}
                  -
                  {recipeInfo[`strMeasure${key.match(/\d+/)}`]}
                </li>
              ))}
          </ul>
          <p data-testid="instructions">{recipeInfo.strInstructions}</p>
          {isMeal && recipeInfo.strYoutube && (
            <iframe
              data-testid="video"
              title="Recipe Video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${recipeInfo.strYoutube.split('v=')[1]}` }
              allowFullScreen
            />
          )}
        </>
      ))}
      <div className="recommendations">
        <h2>
          Recommended
          {isMeal ? 'Drinks' : 'Meals'}
        </h2>
        <RecommendedCarousel />
      </div>
    </div>
  );
}

export default RecipeDetails;
