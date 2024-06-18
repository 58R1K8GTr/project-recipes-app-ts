import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuBeef, LuCakeSlice } from 'react-icons/lu';
import { MdOutlineBreakfastDining, MdOutlineFoodBank } from 'react-icons/md';
import { GiChickenLeg, GiGoat } from 'react-icons/gi';
import useFetchMeals from '../../hooks/useFetchMeals';
import { MealRecipeType } from '../../types';
import RecipeCard from '../RecipeCard';
import fetchFoodsByCategory from '../../utils/fetchFoodsByCategory';
import DataContext from '../../context/DataContext';
import './styles.css';

function Meals() {
  const { meals, setMeals, categories, setCategories } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mealsByCategory, setMealsByCategory] = useState<MealRecipeType[]>([]);

  const fetchedData = useFetchMeals();

  useEffect(() => {
    setMeals(fetchedData.meals);
    setCategories(fetchedData.categories);
  }, [fetchedData, setMeals, setCategories]);

  useEffect(() => {
    if (selectedCategory !== 'All') {
      fetchFoodsByCategory(selectedCategory)
        .then((dataResult) => setMealsByCategory(dataResult));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (selectedCategory === category) {
      setMealsByCategory([]);
      setSelectedCategory('All');
    }
  };

  const getCategoryImage = (categoryName: string) => {
    const selected = 'text-primary-color';

    switch (categoryName) {
      case 'Beef':
        return (
          <div>
            <LuBeef
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Breakfast':
        return (
          <div>
            <MdOutlineBreakfastDining
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Chicken':
        return (
          <div>
            <GiChickenLeg
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Dessert':
        return (
          <div>
            <LuCakeSlice
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Goat':
        return (
          <div>
            <GiGoat
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      default:
        return (
          <div>
            <MdOutlineFoodBank
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <div className="categories_grid">
        <h4>Categories</h4>
        <div className="categories_wrapper">
          <button
            data-testid="All-category-filter"
            onClick={ () => handleCategoryChange('All') }
            className="category_button button_all"
          >
            {getCategoryImage('All')}
          </button>
          {categories && categories.map((category, index) => (
            <button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleCategoryChange(category.strCategory) }
              className="category_button"
            >
              {getCategoryImage(category.strCategory)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="recipes_grid">
          { meals && selectedCategory === 'All'
            ? meals.map((meal, index) => (
              <Link
                to={ `${meal.idMeal}` }
                key={ index }
                className="recipe-link"
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
                className="recipe-link"
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
    </div>
  );
}

export default Meals;
