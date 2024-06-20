import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import shareIcon from '../../images/shareIcon.svg';
import { DoneRecipeType, Recipe } from '../../types';
import RecipeDisplayCard from '../../components/RecipeDisplayCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);
  // const [textButton, setTextButton] = useState('');

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

  // const handleShare = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   setTextButton('Link copied!');
  //   const target = event.target as HTMLButtonElement;
  //   const index = Number(target.className.substring(6));
  //   const recipe = filteredRecipes[index];
  //   const { type, id } = recipe;
  //   await navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  // };

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
          // let horizontalTopText = `${recipe.nationality} - ${recipe.category}`;
          // if (recipe.alcoholicOrNot) {
          //   horizontalTopText += ` - ${recipe.alcoholicOrNot}`;
          // }
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
