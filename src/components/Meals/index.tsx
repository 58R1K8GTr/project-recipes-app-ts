import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchMeals from '../../hooks/useFetchMeals';
import { CategoryType, MealRecipeType } from '../../types';
import RecipeCard from '../RecipeCard';
import fetchFoodsByCategory from '../../utils/fetchFoodsByCategory';

function Meals() {
  const [meals, setMeals] = useState<MealRecipeType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mealsByCategory, setMealsByCategory] = useState<MealRecipeType[]>([]);

  const fetchedData = useFetchMeals();

  useEffect(() => {
    setMeals(fetchedData.meals);
    setCategories(fetchedData.categories);
  }, [fetchedData]);

  useEffect(() => {
    if (selectedCategory !== 'All') {
      fetchFoodsByCategory(selectedCategory)
        .then((data) => setMealsByCategory(data));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (selectedCategory === category) {
      setMealsByCategory([]);
      setSelectedCategory('All');
    }
  };

  return (
    <div>
      <div>
        <h2>Categories</h2>
        <button
          data-testid="All-category-filter"
          onClick={ () => handleCategoryChange('All') }
        >
          All
        </button>
        {categories && categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleCategoryChange(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div>
        <h2>Meals</h2>
        {selectedCategory === 'All'
          ? meals.map((meal, index) => (
            <Link
              to={ `${meal.idMeal}` }
              key={ index }
            >
              <RecipeCard
                cardInfo={ (
              { recipeName: meal.strMeal,
                recipeImage: meal.strMealThumb,
                index }
                ) }
              />
            </Link>
          ))
          : mealsByCategory.map((meal, index) => (
            <Link
              to={ `${meal.idMeal}` }
              key={ index }
            >
              <RecipeCard
                cardInfo={ (
              { recipeName: meal.strMeal,
                recipeImage: meal.strMealThumb,
                index }
                ) }
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Meals;
