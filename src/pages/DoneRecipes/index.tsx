import React, { useState, useEffect } from 'react';
import { DoneRecipeType, Recipe } from '../../types';
import RecipeDisplayCard from '../../components/RecipeDisplayCard';
import './styles.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

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

    setSelectedType(type);
  };

  if (doneRecipes.length === 0) {
    return <h2>{'You haven\'t prepared any recipe yet.'}</h2>;
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-evenly p-4">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
          className={ `filter_btn ${selectedType === 'all' ? 'selectedFilterBtn' : ''}` }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
          className={ `filter_btn ${selectedType === 'meal'
            ? 'selectedFilterBtn' : ''}` }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
          className={ `filter_btn ${selectedType === 'drink'
            ? 'selectedFilterBtn' : ''}` }
        >
          Drinks
        </button>
      </div>

      <div
        className="container d-flex flex-column align-items-center justify-content-center"
      >
        {filteredRecipes.map((recipe: DoneRecipeType, index: any) => {
          return (
            <div
              data-testid="recipe-card"
              key={ index }
            >
              <RecipeDisplayCard
                recipe={ recipe }
                index={ index }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoneRecipes;
