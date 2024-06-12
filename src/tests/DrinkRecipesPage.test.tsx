import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';

const categoriesTestData = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other / Unknown' },
    { strCategory: 'Cocoa' },
  ],
};

const drinksTestData = {
  drinks: [
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    },
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      idDrink: '13501',
      strDrink: 'ABC',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    },
    {
      idDrink: '17225',
      strDrink: 'Ace',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
    },
    {
      idDrink: '15288',
      strDrink: '252',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    },
    {
      idDrink: '14229',
      strDrink: '747',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
    },
    {
      idDrink: '17203',
      strDrink: 'Kir',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    },
    {
      idDrink: '17141',
      strDrink: 'Smut',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg',
    },
    {
      idDrink: '17837',
      strDrink: 'Adam',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
    },
    {
      idDrink: '14610',
      strDrink: 'ACID',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
    },
    {
      idDrink: '13332',
      strDrink: 'B-53',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg',
    },
    {
      idDrink: '15853',
      strDrink: 'B-52',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5a3vg61504372070.jpg',
    },
  ],
};

const cocktailCategoryTestData = {
  drinks: [
    {
      idDrink: '15346',
      strDrink: '155 Belmont',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg',
    },
    {
      idDrink: '14029',
      strDrink: '57 Chevy with a White License Plate',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
    },
    {
      idDrink: '178318',
      strDrink: '747 Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
    },
  ],
};

describe('Testa a página de drinks', () => {
  beforeEach(async () => {
    const MOCK_RESPONSE_1 = {
      ok: true,
      status: 200,
      json: async () => drinksTestData,
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
      renderWithRouter(<App />, { route: '/drinks' });
    });
  });

  test('Renderiza a página e aguarda a API ser chamada.', async () => {
    const meal = await screen.findByTestId('0-recipe-card');

    expect(meal).toBeInTheDocument();
  });

  test('Os botões de categoria aparecem corretamente', async () => {
    const category = screen.getByText('Shake');

    expect(category).toBeInTheDocument();
  });

  test('Se clicar em uma receita, a página é redirecionada para a página de detalhes', async () => {
    const drink = await screen.findAllByRole('link');
    await userEvent.click(drink[4]);

    expect(drink[4]).not.toBeInTheDocument();
  });

  test('Ao clicar nos botões de categoria, os itens da lista mudam e os itens inicias retornam ao clicar em All', async () => {
    const allCategory = screen.getByText('All');
    const cockTailCategory = screen.getByText('Cocktail');

    const firstDrink = screen.getByText('A1');

    expect(cockTailCategory).toBeInTheDocument();
    expect(firstDrink).toBeInTheDocument();

    const NEW_MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => cocktailCategoryTestData,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(NEW_MOCK_RESPONSE);

    await userEvent.click(cockTailCategory);

    const cockTailRecipe = screen.getByText('747 Drink');
    expect(cockTailRecipe).toBeInTheDocument();

    await userEvent.click(allCategory);

    const firstDrinkAgain = screen.getByText('A1');

    expect(firstDrinkAgain).toBeInTheDocument();
  });

  test('Os botões de categoria servem como toggle, retornando os itens anteriores ao clicar na mesma categoria.', async () => {
    const cockTailCategory = screen.getByText('Cocktail');

    const firstDrink = screen.getByText('A1');

    expect(firstDrink).toBeInTheDocument();

    const NEW_MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => cocktailCategoryTestData,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(NEW_MOCK_RESPONSE);

    await userEvent.click(cockTailCategory);

    const cockTailRecipe = screen.getByText('747 Drink');
    expect(cockTailRecipe).toBeInTheDocument();

    await userEvent.click(cockTailCategory);

    const firstDrinkAgain = screen.getByText('A1');

    expect(firstDrinkAgain).toBeInTheDocument();
  });
});
