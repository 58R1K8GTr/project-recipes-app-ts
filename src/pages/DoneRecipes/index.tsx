import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import { DoneRecipeType, Recipe } from '../../types';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);
  const [textButton, setTextButton] = useState('');

  useEffect(() => {
    const recipes = JSON.parse(
      localStorage.getItem('doneRecipes') || '[]',
    ) as DoneRecipeType[];

    setDoneRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);

  const handleFilter = (type: string) => {
    if (type === 'all') {
      setFilteredRecipes(doneRecipes);
    } else {
      setFilteredRecipes(doneRecipes.filter((recipe: Recipe) => recipe.type === type));
    }
  };

  const handleShare = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setTextButton('Link copied!');
    const target = event.target as HTMLButtonElement;
    const index = Number(target.className.substring(6));
    const recipe = filteredRecipes[index];
    const { type, id } = recipe;
    await navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {filteredRecipes.map((recipe: DoneRecipeType, index: any) => {
          let horizontalTopText = `${recipe.nationality} - ${recipe.category}`;
          if (recipe.alcoholicOrNot) {
            horizontalTopText += ` - ${recipe.alcoholicOrNot}`;
          }
          const { type, id } = recipe;
          return (
            <div key={ index }>
              <Link
                to={ `/${type}s/${id}` }
              >
                <img
                  style={ { width: '100%' } }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link
                to={ `/${type}s/${id}` }
              >
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { horizontalTopText }
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <button
                className={ `index-${index}` }
                onClick={ (event) => handleShare(event) }
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
                { textButton }
              </button>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <div>
                {recipe.tags.slice(0, 2).map((tag: any) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoneRecipes;
