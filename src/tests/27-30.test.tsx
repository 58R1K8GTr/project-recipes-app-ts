import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';

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

const route = '/meals/52977';
const startButton = 'start-recipe-btn';

describe('Testa se o botão de iniciar uma receita funciona normalmente.', () => {
  beforeEach(async () => {
    window.localStorage.clear();

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);
  });

  it('Quando há uma chave doneRecipes com o id da receita da página, botão não aparece.', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52977' }]));

    await act(async () => {
      renderWithRouter(<App />, { route });
    });

    expect(screen.queryByTestId(startButton)).not.toBeInTheDocument();
  });

  it('O botão irá aparecer normalmente caso o id do localStorage seja diferente do da página', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify([{ id: '12345' }]));

    await act(async () => {
      renderWithRouter(<App />, { route });
    });

    expect(screen.queryByTestId(startButton)).toBeInTheDocument();
  });
});

describe('Testa se o botão de continuar uma receita funciona como deve.', () => {
  const recipesInProgress = {
    drinks: {
      17141: ['smut'],
    },
    meals: {
      52977: ['Corba'],
    },
  };

  beforeEach(async () => {
    window.localStorage.clear();

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);
  });

  it('Quando o id do item está na lista de receitas iniciadas, o botão tem o texto "Continuar receita"', async () => {
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));

    await act(async () => {
      renderWithRouter(<App />, { route });
    });

    expect(screen.queryByTestId(startButton)).toHaveTextContent('Continue Recipe');
  });
});
