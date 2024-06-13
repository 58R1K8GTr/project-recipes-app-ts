import { useState, useEffect } from 'react';
import { Recipe, RecommendationType } from '../types';

const useFetchRecipeAndRecommendations = (id: string, type: 'meals' | 'drinks') => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeAndRecommendations = async () => {
      setIsLoading(true);
      try {
        const recipeEndpoint = type === 'meals'
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

        const recommendationEndpoint = type === 'meals'
          ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

        const [recipeResponse, recommendationResponse] = await Promise.all([
          fetch(recipeEndpoint),
          fetch(recommendationEndpoint),
        ]);

        const recipeData = await recipeResponse.json();
        const recommendationData = await recommendationResponse.json();

        setRecipe(recipeData[type][0]);
        setRecommendations(type === 'meals'
          ? recommendationData.drinks
          : recommendationData.meals);
      } catch (error) {
        console.error('Falha ao buscar receita e recomendações', error);
      }
      setIsLoading(false);
    };

    fetchRecipeAndRecommendations();
  }, [id, type]);

  return { recipe, recommendations, isLoading };
};

export default useFetchRecipeAndRecommendations;
