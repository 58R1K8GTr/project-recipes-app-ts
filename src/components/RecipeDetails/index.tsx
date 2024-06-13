import React from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../RecomendationCard';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';

function RecipeDetails() {
  const { id = '' } = useParams<{ id?: string }>();
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recipe,
    recommendations,
    isLoading } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');

  if (isLoading) return <div>Loading...</div>;
  console.log(recipe);
  console.log(recommendations);

  return (
    <div className="recipe-details">
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ isMeal ? recipe.strMeal : recipe.strDrink }
          />
          <h1 data-testid="recipe-title">{isMeal ? recipe.strMeal : recipe.strDrink}</h1>
          <p data-testid="recipe-category">
            {isMeal ? recipe.strCategory : recipe.strAlcoholic}
          </p>
          <ul>
            {Object.keys(recipe)
              .filter((key) => key.includes('Ingredient') && recipe[key])
              .map((key, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {recipe[key]}
                  {' '}
                  -
                  {recipe[`strMeasure${key.match(/\d+/)}`]}
                </li>
              ))}
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {isMeal && recipe.strYoutube && (
            <iframe
              data-testid="video"
              title="Recipe Video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}` }
              allowFullScreen
            />
          )}
        </>
      )}
      <div className="recommendations">
        <h2>
          Recommended
          {isMeal ? 'Drinks' : 'Meals'}
        </h2>
        {recommendations.slice(0, 6).map((item, index) => (
          <RecommendationCard key={ index } item={ item } index={ index } />
        ))}
      </div>
    </div>
  );
}

export default RecipeDetails;
