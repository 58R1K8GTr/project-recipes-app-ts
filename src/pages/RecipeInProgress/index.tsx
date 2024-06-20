import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchRecipeAndRecommendations from '../../hooks/useFetchRecipe';
import './recipe-in-progress.css';
import HorizontalShareButton from '../../components/HorizontalShareButton';
import HorizontalFavoriteButton from '../../components/HorizontalFavoriteButton';
import Loading from '../../components/Loading';

function RecipeInProgress() {
  const { id = '' } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const type = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const type2 = window.location.pathname.includes('/meals') ? 'meal' : 'drink';
  const isMeal = window.location.pathname.includes('/meals');
  const { recipe } = useFetchRecipeAndRecommendations(id, type);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (recipe && recipe[type]) {
      const ingredientsLength = Object.keys(recipe[type][0])
        .filter((key) => key.startsWith('strIngredient') && recipe[type][0][key]).length;
      setIsChecked(new Array(ingredientsLength).fill(false));
    }

    const checked = localStorage.getItem('inProgressRecipes');
    const checkedHistory = checked ? JSON.parse(checked) : {};
    if (checkedHistory[type] && checkedHistory[type][id]) {
      setIsChecked(checkedHistory[type][id]);
    }
  }, [recipe, type, id]);

  if (!recipe || !recipe[type]) {
    return <Loading />;
  }
  const currentRecipe = recipe[type][0];

  // save checked checkbox in array and store them in localstorage.
  // Example: { meals: { currentID: [true, false, ...] }, ... } (same for drinks);
  const handleOnChange = (position: number) => {
    const updatedCheckedState = isChecked
      .map((check, index) => (index === position ? !check : check));
    setIsChecked(updatedCheckedState);
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    inProgressRecipes[type] = {
      ...inProgressRecipes[type],
      [id]: updatedCheckedState,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
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

  return (
    <div className="recipe-details">
      <img
        src={ currentRecipe.strMealThumb }
        alt={ `Imagem da receita ${currentRecipe.strMeal}` }
        data-testid="recipe-photo"
        className="recipe_image"
      />
      <div className="container mt-3">
        <div
          className="controls_container
              d-flex flex-direction-row justify-content-between"
        >
          <a href={ `/${type}` } className="go_back_link">
            <p>return to list</p>
          </a>
          <div>
            <HorizontalFavoriteButton
              recipeDetails={ {
                id,
                type: type2,
                nationality: isMeal ? currentRecipe.strArea as string : '',
                category: currentRecipe.strCategory,
                alcoholicOrNot: isMeal ? '' : currentRecipe.strAlcoholic,
                name: isMeal ? currentRecipe.strMeal : currentRecipe.strDrink,
                image: isMeal
                  ? currentRecipe.strMealThumb : currentRecipe.strDrinkThumb,
              } }
              isFavorite={ false }
              id={ id }
              testid="favorite-btn"
            />
            <HorizontalShareButton
              copyInfo={ { recipeType: type2, recipeId: id } }
              setIsCopied={ setIsCopied }
              testid="share-btn"
            />
            {isCopied && <span>Link copied!</span>}
          </div>
        </div>
        <h1 data-testid="recipe-title">{currentRecipe.strMeal}</h1>
        <p data-testid="recipe-category">{currentRecipe.strCategory}</p>

        <p data-testid="instructions">{currentRecipe.strInstructions}</p>

        <div className="checkbox-container">
          {renderIngredients()}
        </div>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !isChecked.every((check) => check) }
          onClick={ handleFinishRecipe }
          className="btn-like-bootstrap mt-3"
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
