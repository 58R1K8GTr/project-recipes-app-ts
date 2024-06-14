import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';

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

const recommendationTestData = {
  drinks: [
    { idDrink: '1', strDrink: 'Recommendation 1' },
    { idDrink: '2', strDrink: 'Recommendation 2' },
  ],
};

describe('Testar o RecipeDetails.', () => {
  it('Verifica se o carregando é renderizado', async () => {
    vi.spyOn(global, 'fetch');
    renderWithRouter(<RecipeDetails />);
    const carregando = await screen.findByText(/Loading.../i);
    expect(carregando).toBeInTheDocument();
  });
});

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
      renderWithRouter(<App />, { route: '/meals/52977' });
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
});
