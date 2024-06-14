import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../../components/RecomendationCard';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';
import { DoneRecipeType, Recipe } from '../../types';
import StartRecipeButton from '../../components/StartRecipeButton';
import './styles.css';

function RecipeDetails() {
  const { id = '' } = useParams<{ id?: string }>();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recipe,
    recommendations,
    isLoading } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');

  // Checks if the id is present in any of the 'doneRecipes' in localstorage
  // Also checks if the id is present in any of 'inProgressRecipes' in localstorage
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [status, setStatus] = useState('Start');

  useEffect(() => {
    const storedRecipeJSON = localStorage.getItem('doneRecipes');
    const storedStatusJSON = localStorage.getItem('inProgressRecipes');

    if (storedRecipeJSON) {
      const storedRecipes = JSON.parse(storedRecipeJSON);

      const recipeFound = storedRecipes
        .some((storedRecipe: DoneRecipeType) => storedRecipe.id === id);
      setIsDoneRecipe(recipeFound);
    }

    if (storedStatusJSON) {
      const statusOfRecipe = JSON.parse(storedStatusJSON);
      const isStarted = id in statusOfRecipe[type];

      if (isStarted) {
        setStatus('Continue');
      }
    }
  }, [id, type]);

  if (isLoading) return <div>Loading...</div>;

  if (!recipe) { return <h1>NOT FOUND</h1>; }

  if (recipe[type] === null) { return <h1>NOT FOUND</h1>; }

  const recipeData = recipe[type];

  return (
    <div className="recipe-details">
      {!isDoneRecipe && <StartRecipeButton text={ status } />}
      {recipeData && recipeData.map((recipeInfo: Recipe, index: number) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            className="recipe_image"
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
              .map((key, ingredientIndex) => (
                <li
                  key={ `${key}-${index}` }
                  data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }
                >
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
              width="100%"
              height="315"
              src={ `https://www.youtube.com/embed/${recipeInfo.strYoutube.split('v=')[1]}` }
              allowFullScreen
            />
          )}
        </div>
      ))}
      <div className="recommendations">
        <h2>
          Recommended
          {isMeal ? 'Drinks' : 'Meals'}
        </h2>
        {recommendations.slice(0, 6).map((item, index) => (
          <RecommendationCard key={ `${id}-${index}` } item={ item } index={ index } />
        ))}
      </div>
    </div>
  );
}

export default RecipeDetails;
