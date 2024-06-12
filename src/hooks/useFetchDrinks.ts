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
  const [fetchedData, setFetchedData] = useState<FetchedDataType>({
    drinks: [],
    categories: [],
  });

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinksResponse = await fetch(apiEndpoints.DRINK_URL);
      const drinksData = await drinksResponse.json();
      const drinks = filterResult(drinksData.drinks, 12);

      const categoriesResponse = await fetch(apiEndpoints.DRINK_CATEGORIES);
      const categoriesData = await categoriesResponse.json();
      const categories = filterResult(categoriesData.drinks, 5);

      if (drinks && categories) {
        setFetchedData({ drinks, categories });
      }
    };

    fetchDrinks();
  }, []);

  return fetchedData;
};

export default useFetchDrinks;
