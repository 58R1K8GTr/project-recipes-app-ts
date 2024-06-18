import { useState } from 'react';
import { FavoriteRecipeType } from '../../types';
import HorizontalFavoriteButton from '../HorizontalFavoriteButton';
import HorizontalShareButton from '../HorizontalShareButton';

type RecipeDisplayPropsType = {
  recipe: FavoriteRecipeType;
  index: number;
};

function RecipeDisplayCard({
  recipe, index }: RecipeDisplayPropsType) {
  const [isCopied, setIsCopied] = useState(false);

  const recipeType = recipe.type;
  const recipeId = recipe.id;

  return (
    <div className="d-flex">
      <div className="left_side">
        <a href={ `/${recipeType}s/${recipeId}` }>
          <img
            style={ { width: '100px' } }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt=""
          />
        </a>
      </div>
      <div className="right_side">
        <a href={ `/${recipeType}s/${recipeId}` }>
          <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
        </a>
        <div className="recipe_info">
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
        </div>
        <div className="recipe_buttons">
          <div>
            <HorizontalShareButton
              testid={ `${index}-horizontal-share-btn` } // inseri data testid
              copyInfo={ { recipeType, recipeId } }
              setIsCopied={ setIsCopied }
            />
            <HorizontalFavoriteButton
              isFavorite
              id={ recipe.id }
              testid={ `${index}-horizontal-favorite-btn` } // inseri data testid
            />
            {isCopied && <span>Link copied!</span> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDisplayCard;
