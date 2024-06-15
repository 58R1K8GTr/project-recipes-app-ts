import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockDataNameMargarita from './helpers/mockDataSearchCocktailByNameMargarita.json';
import mockDataFirstLetterA from './helpers/mockDataSearchCocktailsByFirstLetterA.json';
import mockDataIngredientVodka from './helpers/mockDataSearchCocktailByIngredientVodka.json';
import DataProvider from '../context/DataProvider';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const recommendationTestData = {
  meals: [
    { idMeal: '1', strMeal: 'Recommendation 1' },
    { idMeal: '2', strMeal: 'Recommendation 2' },
  ],
};

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

const MOCK_RESPONSE_NAME = {
  ok: true,
  status: 200,
  json: async () => mockDataNameMargarita,
} as Response;

const MOCK_RESPONSE_FIRST_LETTER = {
  ok: true,
  status: 200,
  json: async () => mockDataFirstLetterA,
} as Response;

const MOCK_RESPONSE_INGREDIENT = {
  ok: true,
  status: 200,
  json: async () => mockDataIngredientVodka,
} as Response;

const MOCK_RESPONSE_NO_RESULTS = {
  ok: true,
  status: 200,
  json: async () => ({ drinks: undefined }),
} as Response;

const testIdSearchInput = 'search-input';
const testIdSearchButton = 'exec-search-btn';

const MOCK_RESPONSE_3 = {
  ok: true,
  status: 200,
  json: async () => recommendationTestData,
} as Response;

const MOCK_RESPONSE_4 = {
  ok: true,
  status: 200,
  json: async () => ({ drinks: [mockDataNameMargarita.drinks[0]] }),
} as Response;

describe('Testa a página de drinks', () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);

    await act(async () => {
      renderWithRouter((
        <DataProvider>
          <App />
        </DataProvider>), { route: '/drinks' });
    });
  });

  const searchRadioFirstLetter = 'first-letter-search-radio';
  const searchRadioName = 'name-search-radio';
  const searchTopBtnText = 'search-top-btn';

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
  test('Ao selecionar as opções corretas, recebe as refeições via name', async () => {
    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_NAME)
      .mockResolvedValueOnce(MOCK_RESPONSE_3)
      .mockResolvedValueOnce(MOCK_RESPONSE_4);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioName);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'Margarita');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita');
  });
  test('Ao selecionar as opções corretas, recebe as refeições via first letter', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE_FIRST_LETTER);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioFirstLetter);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'a');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });
  test('Ao selecionar as opções corretas, recebe as refeições via ingredient', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE_INGREDIENT);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInputIngredient = screen.getByTestId('ingredient-search-radio');
    const selectInputName = screen.getByTestId(searchRadioName);
    const selectInputFirstLetter = screen.getByTestId('first-letter-search-radio');
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    // joão disse que era necessário trocar e testar o radiobutton
    // fiz isso e o teste funcionou
    expect(selectInputIngredient).toBeChecked();
    expect(selectInputName).not.toBeChecked();
    expect(selectInputFirstLetter).not.toBeChecked();

    await userEvent.click(selectInputName);
    expect(selectInputName).toBeChecked();
    expect(selectInputIngredient).not.toBeChecked();
    expect(selectInputFirstLetter).not.toBeChecked();

    await userEvent.click(selectInputIngredient);
    expect(selectInputName).not.toBeChecked();
    expect(selectInputIngredient).toBeChecked();
    expect(selectInputFirstLetter).not.toBeChecked();

    await userEvent.type(textInput, 'vodka');
    await userEvent.click(selectInputIngredient);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');
  });
  test('Ao selecionar as opções erradas, recebe um alerta', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE_FIRST_LETTER);
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioFirstLetter);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'aa');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockAlert).toBeCalledTimes(1);
    expect(mockFetch).not.toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=aa');
  });
  test('Ao selecionar algo que não retorna nenhum resultado, recebe um alerta', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE_NO_RESULTS);
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioName);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'python3');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockAlert).toBeCalledTimes(1);
    expect(mockAlert).toHaveBeenLastCalledWith("Sorry, we haven't found any recipes for these filters");
  });
});
