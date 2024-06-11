import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';

const categoriesTestData = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
  ],
};

const mealsTestData = {
  meals: [
    {
      idMeal: '52977',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      idMeal: '53065',
      strMeal: 'Sushi',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    },
    {
      idMeal: '53060',
      strMeal: 'Burek',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    },
    {
      idMeal: '53069',
      strMeal: 'Bistek',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
    },
    {
      idMeal: '53026',
      strMeal: 'Tamiya',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    },
    {
      idMeal: '52978',
      strMeal: 'Kumpir',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    },
    {
      idMeal: '52948',
      strMeal: 'Wontons',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
    },
    {
      idMeal: '52844',
      strMeal: 'Lasagne',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    },
    {
      idMeal: '52971',
      strMeal: 'Kafteji',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
    },
    {
      idMeal: '53013',
      strMeal: 'Big Mac',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    },
    {
      idMeal: '52804',
      strMeal: 'Poutine',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
    },
    {
      idMeal: '53027',
      strMeal: 'Koshari',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
    },
  ],
};

const beefCategoryTestData = {
  meals: [{
    idMeal: '52874',
    strMeal: 'Beef and Mustard Pie',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
  },
  {
    idMeal: '52878',
    strMeal: 'Beef and Oyster Pie',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
  },
  {
    idMeal: '53071',
    strMeal: 'Beef Asado',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/pkopc31683207947.jpg',
  },
  ],
};

describe('Testa a página de meals', () => {
  beforeEach(async () => {
    const MOCK_RESPONSE_1 = {
      ok: true,
      status: 200,
      json: async () => mealsTestData,
    } as Response;

    const MOCK_RESPONSE_2 = {
      ok: true,
      status: 200,
      json: async () => categoriesTestData,
    } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);

    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });
  });

  test('Renderiza a página e aguarda a API ser chamada.', async () => {
    const meal = await screen.findByTestId('0-recipe-card');

    expect(meal).toBeInTheDocument();
  });

  test('Os botões de categoria aparecem corretamente', async () => {
    const category = screen.getByText('Breakfast');

    expect(category).toBeInTheDocument();
  });

  test('Se clicar em uma receita, a página é redirecionada para a página de detalhes', async () => {
    const meal = await screen.findAllByRole('link');
    await userEvent.click(meal[4]);

    expect(meal[4]).not.toBeInTheDocument();
  });

  test('Ao clicar nos botões de categoria, os itens da lista mudam e os itens inicias retornam ao clicar em All', async () => {
    const allCategory = screen.getByText('All');
    const beefCategory = screen.getByText('Beef');

    const firstMeal = screen.getByText('Corba');

    expect(beefCategory).toBeInTheDocument();
    expect(firstMeal).toBeInTheDocument();

    const NEW_MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => beefCategoryTestData,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(NEW_MOCK_RESPONSE);

    await userEvent.click(beefCategory);

    const beefRecipe = screen.getByText('Beef Asado');
    expect(beefRecipe).toBeInTheDocument();

    await userEvent.click(allCategory);

    const firstMealAgain = screen.getByText('Corba');

    expect(firstMealAgain).toBeInTheDocument();
  });

  test('Os botões de categoria servem como toggle, retornando os itens anteriores ao clicar na mesma categoria.', async () => {
    const beefCategory = screen.getByText('Beef');
    const firstMeal = screen.getByText('Corba');

    expect(firstMeal).toBeInTheDocument();

    const NEW_MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => beefCategoryTestData,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(NEW_MOCK_RESPONSE);

    await userEvent.click(beefCategory);

    const beefRecipe = screen.getByText('Beef and Oyster Pie');
    expect(beefRecipe).toBeInTheDocument();

    await userEvent.click(beefCategory);

    const firstMealAgain = screen.getByText('Corba');

    expect(firstMealAgain).toBeInTheDocument();
  });
});
