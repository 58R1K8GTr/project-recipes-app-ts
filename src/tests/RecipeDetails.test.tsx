import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';
import DRINK_DATA from './helpers/mockDataSearchCocktailOnlyMargarita.json';
import DataProvider from '../context/DataProvider';

const mealsTestData = {
  meals: [
    {
      idMeal: '52977',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      strMeal: 'Corba',
      strCategory: 'Side',
      strInstructions: 'Pick through your lentils...',
      strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
      strIngredient1: 'Lentils',
      strMeasure1: '1 cup',
    },
  ],
};

const MOCK_RESPONSE_DRINKS = {
  ok: true,
  status: 200,
  json: async () => DRINK_DATA,
} as Response;

const recommendationTestData = {
  drinks: [
    { idDrink: '1', strDrink: 'Recommendation 1' },
    { idDrink: '2', strDrink: 'Recommendation 2' },
  ],
};

// describe('Testar o RecipeDetails.', () => {
//   it('Verifica se o carregando é renderizado', async () => {
//     vi.spyOn(global, 'fetch');
//     renderWithRouter(<RecipeDetails />);
//     const carregando = await screen.findByText(/Loading.../i);
//     expect(carregando).toBeInTheDocument();
//   });
// });

describe('Testar o RecipeDetails.', () => {
  beforeEach(async () => {
    const MOCK_RESPONSE_1 = {
      ok: true,
      status: 200,
      json: async () => mealsTestData,
    } as Response;

    const MOCK_RESPONSE_2 = {
      ok: true,
      status: 200,
      json: async () => recommendationTestData,
    } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);

    await act(async () => {
      renderWithRouter((
        <DataProvider>
          <App />
        </DataProvider>), { route: '/meals/52977' });
    });
  });

  it('Verifica se os detalhes da receita são renderizados corretamente', async () => {
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');

    expect(recipeTitle).toHaveTextContent('Corba');
    expect(recipeCategory).toHaveTextContent('Side');
    expect(instructions).toHaveTextContent('Pick through your lentils...');
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/VVnZd8A84z4');
  });

  it('Verifica se os buttons são renderizados corretamente', async () => {
    const favButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');

    expect(favButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();

    await userEvent.click(favButton);

    const localStorageRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(localStorageRecipe).toEqual([
      {
        alcoholicOrNot: '',
        category: 'Side',
        id: '52977',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        name: 'Corba',
        type: 'meal',
      },
    ]);
  });
});

describe('Testar os drinks.', () => {
  it('Verifica se o carregando é renderizado', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_DRINKS);

    renderWithRouter(
      (
        <DataProvider>
          <App />
        </DataProvider>
      ), { route: '/drinks/11007' },
    );
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const drinkTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');

    expect(drinkTitle).toHaveTextContent('Margarita');
    expect(recipeCategory).toHaveTextContent('Alcoholic');
    expect(instructions).toHaveTextContent('Rub the rim of the glass with the lime');
  });
});
