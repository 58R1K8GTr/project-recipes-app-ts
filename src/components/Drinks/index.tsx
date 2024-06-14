import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RecipeCard from '../RecipeCard';
import useFetchDrinks from '../../hooks/useFetchDrinks';
import fetchDrinksByCategory from '../../utils/fetchDrinksByCategory';
import { DrinkRecipeType } from '../../types';
import DataContext from '../../context/DataContext';

function Drinks() {
  const { drinks, setDrinks, categories, setCategories } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [drinksByCategory, setDrinksByCategory] = useState<DrinkRecipeType[]>([]);

  const fetchedData = useFetchDrinks();

  useEffect(() => {
    setDrinks(fetchedData.drinks);
    setCategories(fetchedData.categories);
  }, [fetchedData, setCategories, setDrinks]);

  useEffect(() => {
    if (selectedCategory !== 'All') {
      fetchDrinksByCategory(selectedCategory)
        .then((data) => setDrinksByCategory(data));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (selectedCategory === category) {
      setDrinksByCategory([]);
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
        {selectedCategory === 'All'
          ? drinks.map((drink, index) => (
            <Link
              key={ index }
              to={ `${drink.idDrink}` }
            >
              <RecipeCard
                data-testid={ `${index}-recipe-card` }
                cardInfo={ (
              { recipeName: drink.strDrink,
                recipeImage: drink.strDrinkThumb,
                index }
                ) }
              />
            </Link>

          ))
          : drinksByCategory.map((drink, index) => (
            <Link
              key={ index }
              to={ `${drink.idDrink}` }
            >
              <RecipeCard
                data-testid={ `${index}-recipe-card` }
                cardInfo={ (
              { recipeName: drink.strDrink,
                recipeImage: drink.strDrinkThumb,
                index }
                ) }
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Drinks;
