import { useState, useEffect } from 'react';
import { Recipe } from '../type';

const useFetchRecipe = (id: string, type: 'meals' | 'drinks') => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const endpoint = type === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipe(data[type][0]);
      setIsLoading(false);
    };

    fetchRecipe();
  }, [id, type]);

  return { recipe, isLoading };
};

export default useFetchRecipe;
