import { useContext, useEffect, useState } from 'react';
import RecipeDisplayCard from '../../components/RecipeDisplayCard';
import { FavoriteRecipeType } from '../../types';
import DataContext from '../../context/DataContext';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<FavoriteRecipeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isUpdatedFavorites, setIsUpdatedFavorites } = useContext(DataContext);

  const [selectedType, setSelectedType] = useState<string>('all');

  // Upon first render, populates the list of favoriteRecipes and filteredRecipes
  useEffect(() => {
    const localStorageFavorites = localStorage.getItem('favoriteRecipes');
    if (localStorageFavorites && isLoading) {
      const favoritesList = JSON.parse(localStorageFavorites);
      setFavoriteRecipes(favoritesList);
      setFilteredRecipes(favoritesList);
      setIsLoading(false);
    }
  }, [favoriteRecipes, isLoading]);

  // This verifies if there was a click on the favorite button, making it re-render the page with the updated list
  useEffect(() => {
    setIsLoading(true);
    const localStorageFavorites = localStorage.getItem('favoriteRecipes');

    if (isUpdatedFavorites && localStorageFavorites) {
      const favoriteList = JSON.parse(localStorageFavorites);
      setFavoriteRecipes(favoriteList);
      setIsUpdatedFavorites(false);
      setIsLoading(false);
    }
  }, [isUpdatedFavorites, setIsUpdatedFavorites]);

  function filterRecipes(type: string) {
    if (type === 'all') {
      setFilteredRecipes(favoriteRecipes);
      setSelectedType(type);
      return;
    }

    const filterList = favoriteRecipes
      .filter((recipe) => recipe.type === type);

    setFilteredRecipes(filterList);
    setSelectedType(type);
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-evenly p-4">
        <button
          onClick={ () => filterRecipes('all') }
          data-testid="filter-by-all-btn"
          className={ `filter_btn ${selectedType === 'all'
            ? 'selectedFilterBtn' : ''}` }
        >
          All
        </button>
        <button
          onClick={ () => filterRecipes('meal') }
          data-testid="filter-by-meal-btn"
          className={ `filter_btn ${selectedType === 'meal'
            ? 'selectedFilterBtn' : ''}` }
        >
          Meals
        </button>
        <button
          onClick={ () => filterRecipes('drink') }
          data-testid="filter-by-drink-btn"
          className={ `filter_btn ${selectedType === 'drink'
            ? 'selectedFilterBtn' : ''}` }
        >
          Drinks
        </button>
      </div>
      {
       filteredRecipes.map((recipe, index) => (
         <div
           data-testid="recipe-card"
           key={ index }
         >
           <RecipeDisplayCard
             recipe={ recipe }
             index={ index }
           />
         </div>
       ))
    }
    </>
  );
}

export default FavoriteRecipes;
