import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
import DataProvider from '../context/DataProvider';

const RECIPE_CARD = 'recipe-card';
const ALL_BTN = 'filter-by-all-btn';
const MEAL_BTN = 'filter-by-meal-btn';
const DRINK_BTN = 'filter-by-drink-btn';

const localStorageData = [
  {
    id: '53026',
    type: 'meal',
    nationality: 'Egyptian',
    category: 'Vegetarian',
    name: 'Tamiya',
    image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Brazilian',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: 'Unknown',
    category: 'Unknown',
    alcoholicOrNot: 'Alchoholic',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '17225',
    type: 'drink',
    nationality: 'Unknown',
    category: 'Unknown',
    alcoholicOrNot: 'Alchoholic',
    name: 'Ace',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
  },
];

describe('Tests if the favorite-recipes page works as intended.', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageData));

    await act(async () => {
      renderWithRouter((
        <DataProvider>
          <App />
        </DataProvider>), { route: '/favorite-recipes' });
    });
  });

  it('Checks if there are three buttons to change categories.', () => {
    const allBtn = screen.getByTestId(ALL_BTN);
    const mealBtn = screen.getByTestId(MEAL_BTN);
    const drinkBtn = screen.getByTestId(DRINK_BTN);

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Renders the page with 4 favorite items', () => {
    const expectedIndexes = [0, 1, 2, 3];

    expectedIndexes.forEach((index) => {
      const item = screen.getByTestId(`${index}-horizontal-name`);
      expect(item).toBeInTheDocument();
    });
  });

  it('Checks if the card shows the nationality for meals and alcoholic or not for drinks', () => {
    const recipes = screen.getAllByTestId(RECIPE_CARD);
    expect(recipes[0]).toHaveTextContent('Egyptian');
    expect(recipes[3]).toHaveTextContent('Alchoholic');
  });

  it('Checks if the share button is working as intended.', async () => {
    const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve());

    const shareBtn = screen.getByTestId('3-horizontal-share-btn');
    await userEvent.click(shareBtn);

    await waitFor(() => expect(clipboardSpy).toHaveBeenCalled());
    expect(clipboardSpy).toHaveBeenCalledWith('http://localhost:3000/drinks/17225');

    clipboardSpy.mockRestore();
  });

  it('Checks if changing the category to drinks, makes the list show 2 items', async () => {
    const drinkBtn = screen.getByTestId(DRINK_BTN);

    await userEvent.click(drinkBtn);

    const recipes = screen.getAllByTestId(RECIPE_CARD);
    expect(recipes).toHaveLength(2);
  });

  it('Checks if changing the category to meals, makes the list show 2 items as well', async () => {
    const mealBtn = screen.getByTestId(MEAL_BTN);

    await userEvent.click(mealBtn);

    const recipes = screen.getAllByTestId(RECIPE_CARD);
    expect(recipes).toHaveLength(2);
  });

  it('Checks if changing the category to drinks and then returning to All, makes the list show 4 items again', async () => {
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    await userEvent.click(drinkBtn);

    const recipes = screen.getAllByTestId(RECIPE_CARD);
    expect(recipes).toHaveLength(2);

    const allBtn = screen.getByTestId(ALL_BTN);
    await userEvent.click(allBtn);

    const newNumberOfRecipes = screen.getAllByTestId(RECIPE_CARD);
    expect(newNumberOfRecipes).toHaveLength(4);
  });

  it('Checks if removing one item from the favorites, makes the list show 3 items only.', async () => {
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await userEvent.click(favoriteBtn);

    const recipes = screen.getAllByTestId(RECIPE_CARD);
    expect(recipes).toHaveLength(3);
  });
});
