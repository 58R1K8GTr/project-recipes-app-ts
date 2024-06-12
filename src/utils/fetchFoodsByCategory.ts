import { MealRecipeType } from '../types';
import * as apiEndpoints from './api-endpoints';

const filterResult = (list: MealRecipeType[], quantity: number) => {
  return list.slice(0, quantity);
};

async function fetchFoodsByCategory(category: string) {
  const mealsResponse = await fetch(`${apiEndpoints.FILTER_FOOD_URL}${category}`);
  const mealsData = await mealsResponse.json();
  const meals = filterResult(mealsData.meals, 12);

  return meals;
}

export default fetchFoodsByCategory;
