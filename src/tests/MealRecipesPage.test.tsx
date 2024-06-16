import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockDataNameArrabiata from './helpers/mockDataSearchByMealNameArrabiata.json';
import mockDataFirstLetterA from './helpers/mockDataListAllMealsByFirstLetterA.json';
import mockDataIngredientChickenBreast from './helpers/mockDataFilterByMainIngredientChickenBreast.json';
import DataProvider from '../context/DataProvider';

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

const recommendationTestData = {
  drinks: [
    { idDrink: '1', strDrink: 'Recommendation 1' },
    { idDrink: '2', strDrink: 'Recommendation 2' },
  ],
};

const MOCK_RESPONSE_NAME = {
  ok: true,
  status: 200,
  json: async () => mockDataNameArrabiata,
} as Response;

const MOCK_RESPONSE_FIRST_LETTER = {
  ok: true,
  status: 200,
  json: async () => mockDataFirstLetterA,
} as Response;

const MOCK_RESPONSE_INGREDIENT = {
  ok: true,
  status: 200,
  json: async () => mockDataIngredientChickenBreast,
} as Response;

const MOCK_RESPONSE_NO_RESULTS = {
  ok: true,
  status: 200,
  json: async () => ({ meals: undefined }),
} as Response;

const testIdSearchInput = 'search-input';
const testIdSearchButton = 'exec-search-btn';

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

const MOCK_RESPONSE_3 = {
  ok: true,
  status: 200,
  json: async () => recommendationTestData,
} as Response;

const MOCK_RESPONSE_4 = {
  ok: true,
  status: 200,
  json: async () => ({ meals: [mockDataNameArrabiata.meals[0]] }),
} as Response;

describe('Testa a página de meals', () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE_1)
      .mockResolvedValueOnce(MOCK_RESPONSE_2);

    await act(async () => {
      renderWithRouter((
        <DataProvider>
          <App />
        </DataProvider>), { route: '/meals' });
    });
  });

  const searchRadioName = 'name-search-radio';
  const searchRadioFirstLetter = 'first-letter-search-radio';
  const searchTopBtnText = 'search-top-btn';

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
  test('Ao selecionar as opções corretas, recebe as refeições via name', async () => {
    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(MOCK_RESPONSE_NAME)
      .mockResolvedValueOnce(MOCK_RESPONSE_3)
      .mockResolvedValueOnce(MOCK_RESPONSE_4);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioName);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'Arrabiata');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });
  test('Ao selecionar as opções corretas, recebe as refeições via first letter', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_FIRST_LETTER);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInput = screen.getByTestId(searchRadioFirstLetter);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

    await userEvent.type(textInput, 'a');
    await userEvent.click(selectInput);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
  test('Ao selecionar as opções corretas, recebe as refeições via ingredient', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_INGREDIENT);

    const searchTopBtn = screen.getByTestId(searchTopBtnText);

    await userEvent.click(searchTopBtn);

    const selectInputIngredient = screen.getByTestId('ingredient-search-radio');
    const selectInputName = screen.getByTestId(searchRadioName);
    const selectInputFirstLetter = screen.getByTestId(searchRadioFirstLetter);
    const textInput = screen.getByTestId(testIdSearchInput);
    const buttonSearch = screen.getByTestId(testIdSearchButton);

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

    await userEvent.type(textInput, 'chicken_breast');
    await userEvent.click(selectInputIngredient);
    await userEvent.click(buttonSearch);

    expect(mockFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
  });
  test('Ao selecionar as opções erradas, recebe um alerta', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_FIRST_LETTER);
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
