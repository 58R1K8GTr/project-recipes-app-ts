import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FavoriteRecipeType } from '../../types';
import HorizontalFavoriteButton from '../HorizontalFavoriteButton';
import HorizontalShareButton from '../HorizontalShareButton';
import './styles.css';

type RecipeDisplayPropsType = {
  recipe: FavoriteRecipeType;
  index: number;
};

function RecipeDisplayCard({
  recipe, index }: RecipeDisplayPropsType) {
  const [isCopied, setIsCopied] = useState(false);

  const location = useLocation();
  const isDoneRecipes = location.pathname === '/done-recipes';

  const recipeType = recipe.type;
  const recipeId = recipe.id;

  return (
    <div className="d-flex recipe_card mt-3 mb-3">
      <div className="left_side">
        <a
          href={ `/${recipeType}s/${recipeId}` }
          aria-label={ `View ${recipe.name}` }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            className="card_image"
            src={ recipe.image }
            alt={ `${recipe.name}` }
          />
        </a>
      </div>
      <div className="right_side d-flex justify-content-between p-2">
        <div className="recipe_info">
          <a href={ `/${recipeType}s/${recipeId}` }>
            <h5
              data-testid={ `${index}-horizontal-name` }
              className="recipe_title_size"
            >
              {recipe.name}
            </h5>
          </a>
          {recipeType === 'meal'
            ? (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category}
              </span>
            )
            : (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
                {' '}
                -
                {' '}
                {recipe.category}
              </span>
            )}
          {isDoneRecipes
          && (
            <span
              data-testid={ `${index}-horizontal-done-date` }
              className="date_text"
            >
              {recipe.doneDate}
            </span>
          )}
          {isDoneRecipes && recipe.tags
            && recipe.tags.slice(0, 2).map((tag: any) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="recipe_buttons">
          <div className="d-flex flex-column">
            {!isDoneRecipes && <HorizontalFavoriteButton
              isFavorite
              id={ recipe.id }
              testid={ `${index}-horizontal-favorite-btn` }
            />}
            <HorizontalShareButton
              testid={ `${index}-horizontal-share-btn` } // inseri data testid
              copyInfo={ { recipeType, recipeId } }
              setIsCopied={ setIsCopied }
            />
            {isCopied && <span className="copied_link">Link copied!</span> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDisplayCard;
