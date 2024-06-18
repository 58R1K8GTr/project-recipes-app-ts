import React, { useState, useEffect } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import { Recipe } from '../../types';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]') as Recipe[];
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
        {filteredRecipes.map((recipe: Recipe, index: any) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <button>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share"
              />
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
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
