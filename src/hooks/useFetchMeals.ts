import { useEffect, useState } from 'react';
import * as apiEndpoints from '../utils/api-endpoints';
import { CategoryType, MealRecipeType } from '../types';

type FetchedDataType = {
  meals: MealRecipeType[];
  categories: CategoryType[];
};

const filterResult = (list: MealRecipeType[], quantity: number) => {
  return list.slice(0, quantity);
};

const useFetchMeals = () => {
  const [isLoadingMeals, setIsLoadingMeals] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<FetchedDataType>({
    meals: [],
    categories: [],
  });

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoadingMeals(true);
      try {
        const mealsResponse = await fetch(apiEndpoints.FOOD_URL);
        const mealsData = await mealsResponse.json();
        const meals = filterResult(mealsData.meals, 12);

        const categoriesResponse = await fetch(apiEndpoints.FOOD_CATEGORIES);
        const categoriesData = await categoriesResponse.json();
        const categories = filterResult(categoriesData.meals, 5);

        if (meals && categories) {
          setFetchedData({ meals, categories });
        }
      } catch (error) {
        console.error('Failed to find meal categories');
      }
      setIsLoadingMeals(false);
    };

    fetchMeals();
  }, []);

  return { fetchedData, isLoadingMeals };
};

export default useFetchMeals;
