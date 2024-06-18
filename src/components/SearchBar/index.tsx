import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import fetchApi from '../../utils/fetchAPI';
import useApiData from '../../hooks/useApiData';
import DataContext from '../../context/DataContext';
import './styles.css';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    generateUrl,
    textInput,
    setTextInput,
    radioInput,
    setRadioInput,
  } = useApiData();
  const { setDrinks, setMeals } = useContext(DataContext);

  const clearInputs = () => {
    setTextInput('');
    setRadioInput('ingredient');
  };

  // verifica entrada errada do usuário e tenta pegr os dados da api.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (radioInput === 'firstletter' && textInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    const data = await fetchApi(generateUrl());
    const dataRecipes = data.meals || data.drinks || [];
    const setData = location.pathname === '/meals'
      ? setMeals
      : setDrinks;
    setData(dataRecipes);
    clearInputs();
    if (!dataRecipes.length) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
    if (dataRecipes.length === 1) {
      const idRecipe = dataRecipes[0].idMeal || dataRecipes[0].idDrink;
      navigate(`${location.pathname}/${idRecipe}`);
    }
  };

  // segui o padrão do projeto, deveria eu ter criado um componente somente para o input?
  return (
    <form onSubmit={ handleSubmit } className="mt-3">
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setTextInput(value) }
        value={ textInput }
        className="form-control mb-2"
      />
      <div>
        <div className="mb-2">
          <label htmlFor="ingredient-search-radio" className="margin_right">
            Ingredient
            {' '}
            <input
              type="radio"
              name="filter"
              id="ingredient-search-radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
              checked={ radioInput === 'ingredient' }
              onChange={ ({ target: { value } }) => setRadioInput(value) }
              className="form-check-input"
            />
          </label>
          <label htmlFor="name-search-radio" className="margin_right">
            Name
            {' '}
            <input
              type="radio"
              name="filter"
              id="name-search-radio"
              data-testid="name-search-radio"
              value="name"
              checked={ radioInput === 'name' }
              onChange={ ({ target: { value } }) => setRadioInput(value) }
              className="form-check-input"
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            First letter
            {' '}
            <input
              type="radio"
              name="filter"
              id="first-letter-search-radio"
              data-testid="first-letter-search-radio"
              value="firstletter"
              checked={ radioInput === 'firstletter' }
              onChange={ ({ target: { value } }) => setRadioInput(value) }
              className="form-check-input"
            />
          </label>
        </div>
        <button
          data-testid="exec-search-btn"
          className="btn-like-bootstrap mb-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
