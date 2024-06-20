import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCupStraw } from 'react-icons/bs';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { LiaCocktailSolid } from 'react-icons/lia';
import { TbMilkshake } from 'react-icons/tb';
import { LuCoffee } from 'react-icons/lu';
import { CiCoffeeCup } from 'react-icons/ci';
import RecipeCard from '../RecipeCard';
import useFetchDrinks from '../../hooks/useFetchDrinks';
import fetchDrinksByCategory from '../../utils/fetchDrinksByCategory';
import { DrinkRecipeType } from '../../types';
import DataContext from '../../context/DataContext';
import './styles.css';

function Drinks() {
  const { drinks, setDrinks, categories, setCategories } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [drinksByCategory, setDrinksByCategory] = useState<DrinkRecipeType[]>([]);

  const { fetchedData, isLoadingDrinks } = useFetchDrinks();

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

  if (isLoadingDrinks) return <div>Loading...</div>;

  const getCategoryImage = (categoryName: string) => {
    const selected = 'text-primary-color';

    switch (categoryName) {
      case 'Ordinary Drink':
        return (
          <div>
            <BsCupStraw
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Cocktail':
        return (
          <div>
            <LiaCocktailSolid
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Shake':
        return (
          <div>
            <TbMilkshake
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Other / Unknown':
        return (
          <div>
            <CiCoffeeCup
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      case 'Cocoa':
        return (
          <div>
            <LuCoffee
              className={ selectedCategory === categoryName ? selected : '' }
            />
            <span className="category_text">{categoryName}</span>
          </div>
        );
      default:
        return (
          <div>
            <MdOutlineLocalDrink
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
        <h2>Categories</h2>
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
          {
          drinks && selectedCategory === 'All'
            ? drinks.map((drink, index) => (
              <Link
                key={ index }
                to={ `${drink.idDrink}` }
                className="recipe-link"
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
                className="recipe-link"
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
          }
        </div>
      </div>
    </div>
  );
}

export default Drinks;
