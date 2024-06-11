import { DrinkRecipeType } from '../types';
import * as apiEndpoints from './api-endpoints';

const filterResult = (list: DrinkRecipeType[], quantity: number) => {
  return list.slice(0, quantity);
};

async function fetchDrinksByCategory(category: string) {
  const drinksResponse = await fetch(`${apiEndpoints.FILTER_DRINK_URL}${category}`);
  const drinksData = await drinksResponse.json();
  const drinks = filterResult(drinksData.drinks, 12);

  return drinks;
}

export default fetchDrinksByCategory;
