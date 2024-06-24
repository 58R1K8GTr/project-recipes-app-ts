import './recipe-details.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RecommendedCarousel from '../../components/Carousel/index';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';
import { DoneRecipeType, Recipe } from '../../types';
import StartRecipeButton from '../../components/StartRecipeButton';
import HorizontalFavoriteButton from '../../components/HorizontalFavoriteButton';
import HorizontalShareButton from '../../components/HorizontalShareButton';
import Loading from '../../components/Loading';

function RecipeDetails() {
  const { id = '' } = useParams<{ id?: string }>();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const type2 = window.location.pathname.includes('/meals') ? 'meal' : 'drink';
  const isMeal = window.location.pathname.includes('/meals');
  const {
    recipe,
    isLoading } = useFetchRecipeAndRecommendations(id, isMeal ? 'meals' : 'drinks');

  // Checks if the id is present in any of the 'doneRecipes' in localstorage
  // Also checks if the id is present in any of 'inProgressRecipes' in localstorage
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [status, setStatus] = useState('Start');
  const [isCopied, setIsCopied] = useState(false);
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

      if (!statusOfRecipe[type]) return;

      const isStarted = id in statusOfRecipe[type];

      if (isStarted) {
        setStatus('Continue');
      }
    }
  }, [id, type]);

  if (isLoading) return <Loading />;

  if (!recipe || recipe[type] === null) { return <h1>NOT FOUND</h1>; }

  const recipeData = recipe[type];

  return (
    <div className="recipe-details">
      {!isDoneRecipe
      && (
        <div>
          <Link to={ `/${type}/${id}/in-progress` }>
            <StartRecipeButton text={ status } />
          </Link>
        </div>
      )}
      {recipeData && recipeData.map((recipeInfo: Recipe, index: number) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            className="recipe_image"
            src={ isMeal ? recipeInfo.strMealThumb : recipeInfo.strDrinkThumb }
            alt={ isMeal ? recipeInfo.strMeal : recipeInfo.strDrink }
          />
          <div className="container mt-3">
            <div
              className="controls_container
              d-flex flex-direction-row justify-content-between"
            >
              <a href={ `/${type}` } className="go_back_link">
                Return
              </a>
              <div>
                <HorizontalFavoriteButton
                  isFavorite={ false }
                  id={ id }
                  testid="favorite-btn"
                  recipeDetails={ {
                    id,
                    type: type2,
                    nationality: isMeal ? recipeData[0].strArea as string : '',
                    category: recipeData[0].strCategory,
                    alcoholicOrNot: isMeal ? '' : recipeData[0].strAlcoholic,
                    name: isMeal ? recipeData[0].strMeal : recipeData[0].strDrink,
                    image: isMeal
                      ? recipeData[0].strMealThumb : recipeData[0].strDrinkThumb,
                  } }
                />
                <HorizontalShareButton
                  copyInfo={ { recipeType: type2, recipeId: id } }
                  setIsCopied={ setIsCopied }
                  testid="share-btn"
                />
                {isCopied
                && (
                  <span>
                    {' '}
                    Link copied!
                  </span>
                )}
              </div>
            </div>
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
            <p
              data-testid="instructions"
              className="text-justify"
            >
              {recipeInfo.strInstructions}
            </p>
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
        </div>
      ))}
      <div className="recommendations">
        <h2 className="mt-4 mb-4">
          Recommended
          {' '}
          {isMeal ? 'Drinks' : 'Meals'}
        </h2>
        <RecommendedCarousel />
      </div>
    </div>
  );
}

export default RecipeDetails;
