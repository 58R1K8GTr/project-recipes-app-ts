import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import { Recipe } from '../../type';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';

function RecipeInProgress(/* { recipe }:Recipe */) {
  const { id = '' } = useParams<{ id?: string }>();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const { recipe } = useFetchRecipeAndRecommendations(id, type);
  // const { recipe } = useFetchRecipeAndRecommendations('52771', 'meals');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!recipe) {
    return <h1>Not Found</h1>;
  }

  const currentRecipe = recipe[type][0];

  const renderIngredients = () => {
    return Object.keys(currentRecipe)
      .filter((key) => key.startsWith('strIngredient') && currentRecipe[key])
      .map((key, index) => {
        const ingredient = currentRecipe[key];
        const measure = currentRecipe[`strMeasure${index + 1}`] || '';
        if (ingredient && ingredient.trim()) {
          return (
            <label key={ index } data-testid={ `${index}-ingredient-step` }>
              <input type="checkbox" />
              {`${ingredient} - ${measure}`}
            </label>
          );
        }
        return null;
      });
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      <img
        src={ currentRecipe.strMealThumb }
        alt={ `Imagem da receita ${currentRecipe.strMeal}` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{currentRecipe.strMeal}</h1>
      <h2 data-testid="recipe-category">{currentRecipe.strCategory}</h2>

      <p data-testid="instructions">{currentRecipe.strInstructions}</p>

      <div>
        {renderIngredients()}
      </div>

      <div>
        <button data-testid="share-btn">
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <button data-testid="favorite-btn" onClick={ handleFavoriteClick }>
          <img
            src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
            alt={ isFavorited ? 'Desfavoritar' : 'Favoritar' }
          />
        </button>
      </div>

      <button data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>

    </div>

  );
}

export default RecipeInProgress;
