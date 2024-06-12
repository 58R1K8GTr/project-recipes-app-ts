import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetchRecipe from '../hooks/useFetchRecipe';

function RecipeDetails() {
  const { id } = useParams<{ id: any }>();
  const location = useLocation();
  const type = location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const { recipe, isLoading } = useFetchRecipe(id, type);

  console.log(isLoading);

  console.log(recipe);
  return (
    <div>Details</div>

  );
}

export default RecipeDetails;
