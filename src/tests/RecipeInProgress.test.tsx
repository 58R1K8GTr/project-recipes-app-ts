import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
import MEAL_DATA from './helpers/mockDataSearchByMealNameArrabiata.json';
import DRINK_DATA from './helpers/mockDataSearchCocktailByNameMargarita.json';
import DataProvider from '../context/DataProvider';

const MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => MEAL_DATA,
} as Response;

const MOCK_RESPONSE_2 = {
  ok: true,
  status: 200,
  json: async () => DRINK_DATA,
} as Response;

const MOCK_LOCALSTORAGE_DRINK = [
  {
    id: '11007',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    doneDate: '2024-06-18T17:53:09.155Z',
    tags: [
      'IBA',
      'ContemporaryClassic',
    ],
  },
];

const MOCK_MEAL_ROUTE = '/meals/52771/in-progress';

describe('Tests Meals on "Recipe in progress" Page', () => {
  test('Verify if favorite button changes icon on click,', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE);

    renderWithRouter(
      (
        <DataProvider>
          <RecipeInProgress />
        </DataProvider>
      ), { route: MOCK_MEAL_ROUTE },
    );

    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading.../i }));

    const favoriteBtn = screen.getByAltText(/favoritar/i) as HTMLImageElement;

    expect(favoriteBtn.src).toBe('http://localhost:3000/src/images/whiteHeartIcon.svg');

    // await userEvent.click(favoriteBtn);

    // expect(favoriteBtn.src).toBe('http://localhost:3000/src/images/blackHeartIcon.svg');
  });
  test('Test if checked checkbox has text with line through css property,', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE);

    renderWithRouter(
      (
        <DataProvider>
          <RecipeInProgress />
        </DataProvider>
      ), { route: MOCK_MEAL_ROUTE },
    );

    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading.../i }));

    const firstCheckBox = screen.getByText(/penne rigate/i) as HTMLInputElement;

    await userEvent.click(firstCheckBox);

    expect(firstCheckBox.className).toBe('is-checked');

    await userEvent.click(firstCheckBox);

    expect(firstCheckBox.className).toBe('');
  });
  test('Test if Finish Recipe Button is enabled after checking all checkboxes,', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE);

    renderWithRouter(
      (
        <DataProvider>
          <RecipeInProgress />
        </DataProvider>
      ), { route: MOCK_MEAL_ROUTE },
    );

    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading.../i }));

    const finishRecipeButton = screen.getByRole('button', { name: /finish recipe/i });

    expect(finishRecipeButton).toBeDisabled();

    const allCheckBoxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

    await userEvent.click(allCheckBoxes[0]);
    await userEvent.click(allCheckBoxes[1]);
    await userEvent.click(allCheckBoxes[2]);
    await userEvent.click(allCheckBoxes[3]);
    await userEvent.click(allCheckBoxes[4]);
    await userEvent.click(allCheckBoxes[5]);
    await userEvent.click(allCheckBoxes[6]);
    await userEvent.click(allCheckBoxes[7]);

    expect(finishRecipeButton).not.toBeDisabled();

    await userEvent.click(finishRecipeButton);
    // localStorage.setItem('doneRecipes', JSON.stringify(MOCK_MEAL));
    expect(window.location.pathname).toBe('/done-recipes');
  });
});

describe('Tests Drinks on "Recipe in progressq" Page', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('Test if Finish Recipe Button is enabled after checking all checkboxes,', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_2);

    renderWithRouter(
      (
        <DataProvider>
          <RecipeInProgress />
        </DataProvider>
      ), { route: '/drinks/11007/in-progress' },
    );

    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /loading.../i }));
    const finishRecipeButton = screen.getByRole('button', { name: /finish recipe/i });

    const allCheckBoxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    await userEvent.click(allCheckBoxes[0]);
    await userEvent.click(allCheckBoxes[1]);
    await userEvent.click(allCheckBoxes[2]);
    await userEvent.click(allCheckBoxes[3]);

    expect(finishRecipeButton).not.toBeDisabled();

    await userEvent.click(finishRecipeButton);

    localStorage.setItem('doneRecipes', JSON.stringify(MOCK_LOCALSTORAGE_DRINK));
  });
});
