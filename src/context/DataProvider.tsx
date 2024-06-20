import { useState } from 'react';
import { CategoryType, ChildrenProp, DrinkRecipeType, MealRecipeType } from '../types';
import DataContext from './DataContext';

function DataProvider({ children }: ChildrenProp) {
  const [meals, setMeals] = useState<MealRecipeType[]>([]);
  const [drinks, setDrinks] = useState<DrinkRecipeType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isUpdatedFavorites, setIsUpdatedFavorites] = useState<boolean>(false);

  const returnObject = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    categories,
    setCategories,
    isUpdatedFavorites,
    setIsUpdatedFavorites,
  };

  return (
    <DataContext.Provider value={ returnObject }>
      { children }
    </DataContext.Provider>
  );
}

export default DataProvider;
