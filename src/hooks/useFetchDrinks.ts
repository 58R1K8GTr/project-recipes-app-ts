import { useEffect, useState } from 'react';
import * as apiEndpoints from '../utils/api-endpoints';
import { CategoryType, DrinkRecipeType } from '../types';

type FetchedDataType = {
  drinks: DrinkRecipeType[];
  categories: CategoryType[];
};

const filterResult = (list: DrinkRecipeType[], quantity: number) => {
  return list.slice(0, quantity);
};

const useFetchDrinks = () => {
  const [isLoadingDrinks, setLoadingDrinks] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<FetchedDataType>({
    drinks: [],
    categories: [],
  });

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoadingDrinks(true);
      try {
        const drinksResponse = await fetch(apiEndpoints.DRINK_URL);
        const drinksData = await drinksResponse.json();
        const drinks = filterResult(drinksData.drinks, 12);

        const categoriesResponse = await fetch(apiEndpoints.DRINK_CATEGORIES);
        const categoriesData = await categoriesResponse.json();
        const categories = filterResult(categoriesData.drinks, 5);

        if (drinks && categories) {
          setFetchedData({ drinks, categories });
        }
      } catch (error) {
        console.error('Failed to find drink categories');
      }
      setLoadingDrinks(false);
    };

    fetchDrinks();
  }, []);

  return { fetchedData, isLoadingDrinks };
};

export default useFetchDrinks;
