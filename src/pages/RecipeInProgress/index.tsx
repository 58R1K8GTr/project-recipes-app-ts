import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';
import './recipe-in-progress.css';

function RecipeInProgress() {
  const { id = '' } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const { recipe } = useFetchRecipeAndRecommendations(id, type);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (recipe) {
      const currentRecipe = recipe[type][0];
      const ingredients = Object.keys(currentRecipe)
        .filter((key) => key.startsWith('strIngredient') && currentRecipe[key]);
      setIsChecked(new Array(ingredients.length).fill(false));
    }
  }, [recipe, type]);

  useEffect(() => {
    const allItemsChecked = isChecked.every(Boolean);
    setAllChecked(allItemsChecked);
  }, [isChecked]);

  if (!recipe) {
    return <h1>Not Found</h1>;
  }

  const currentRecipe = recipe[type][0];

  const handleOnChange = (position: number) => {
    const updatedCheckedState = isChecked
      .map((check, index) => (index === position ? !check : check));
    setIsChecked(updatedCheckedState);
  };

  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newRecipe = {
      id: currentRecipe.idMeal || currentRecipe.idDrink,
      type: type === 'meals' ? 'meal' : 'drink',
      nationality: currentRecipe.strArea || '',
      category: currentRecipe.strCategory,
      alcoholicOrNot: currentRecipe.strAlcoholic || '',
      name: currentRecipe.strMeal || currentRecipe.strDrink,
      image: currentRecipe.strMealThumb || currentRecipe.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: currentRecipe.strTags ? currentRecipe.strTags.split(',') : [],
    };

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));
    navigate('/done-recipes');
  };
  const renderIngredients = () => {
    return Object.keys(currentRecipe)
      .filter((key) => key.startsWith('strIngredient') && currentRecipe[key])
      .map((key, index) => {
        const ingredient = currentRecipe[key];
        const measure = currentRecipe[`strMeasure${index + 1}`] || '';
        if (ingredient && ingredient.trim()) {
          return (
            <label
              key={ index }
              className={ isChecked[index] ? 'is-checked' : '' }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                checked={ isChecked[index] }
                onChange={ () => handleOnChange(index) }
              />
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

      <div className="checkbox-container">
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

      <button
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        onClick={ handleFinishRecipe }
      >
        Finish Recipe
      </button>

    </div>

  );
}

export default RecipeInProgress;
