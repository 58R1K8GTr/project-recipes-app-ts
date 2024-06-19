import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mocksRecipeLocalStorage from './helpers/mocksRecipeLocalStorage.json';

beforeEach(() => {
  localStorage.clear();
});

const route = '/done-recipes';
const horizontalTopTextDataTestId0 = '0-horizontal-top-text';
const horizontalTopTextDataTestId1 = '1-horizontal-top-text';
const horizontalTopTextContent0 = 'Italian - Vegetarian';
const horizontalTopTextContent1 = 'Alcoholic - Cocktail';

describe('Testando a página done-recipes', () => {
  test('Ao iniciar a página os dados do meal estão exibindo corretamente', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mocksRecipeLocalStorage));
    renderWithRouter(<App />, { route });

    const image = screen.getByTestId('0-horizontal-image') as HTMLImageElement;
    const horizontalTopText = screen.getByTestId(horizontalTopTextDataTestId0);
    const horizontalName = screen.getByTestId('0-horizontal-name');
    const horizontalDoneDate = screen.getByTestId('0-horizontal-done-date');
    const pastaHorizontalTag = screen.getByTestId('0-Pasta-horizontal-tag');
    const curryHorizontalTag = screen.getByTestId('0-Curry-horizontal-tag');

    expect(image.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(image.alt).toBe('Spicy Arrabiata Penne');
    expect(horizontalTopText.textContent).toBe(horizontalTopTextContent0);
    expect(horizontalName.textContent).toBe('Spicy Arrabiata Penne');
    expect(horizontalDoneDate.textContent).toBe('23/06/2020');
    expect(pastaHorizontalTag.textContent).toBe('Pasta');
    expect(curryHorizontalTag.textContent).toBe('Curry');
  });
  test('Ao iniciar a página os dados do drink estão exibindo corretamente', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mocksRecipeLocalStorage));
    renderWithRouter(<App />, { route });

    const image2 = screen.getByTestId('1-horizontal-image') as HTMLImageElement;
    const horizontalTopText2 = screen.getByTestId(horizontalTopTextDataTestId1);
    const horizontalName2 = screen.getByTestId('1-horizontal-name');
    const horizontalDoneDate2 = screen.getByTestId('1-horizontal-done-date');

    expect(image2.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(image2.alt).toBe('Aquamarine');
    expect(horizontalTopText2.textContent).toBe(horizontalTopTextContent1);
    expect(horizontalName2.textContent).toBe('Aquamarine');
    expect(horizontalDoneDate2.textContent).toBe('23/06/2020');
  });
  test('Ao iniciar a página os dados do drink e meal estão filtrando por "All"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mocksRecipeLocalStorage));
    renderWithRouter(<App />, { route });

    const allButton = screen.getByTestId('filter-by-all-btn');

    await userEvent.click(allButton);

    const horizontalTopText = screen.getByTestId(horizontalTopTextDataTestId0);
    const horizontalTopText2 = screen.getByTestId(horizontalTopTextDataTestId1);

    expect(horizontalTopText.textContent).toBe(horizontalTopTextContent0);
    expect(horizontalTopText2.textContent).toBe(horizontalTopTextContent1);
  });
  test('Ao iniciar a página os dados do meal estão filtrando por "Meals"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mocksRecipeLocalStorage));
    renderWithRouter(<App />, { route });

    const allButton = screen.getByTestId('filter-by-meal-btn');

    await userEvent.click(allButton);

    const horizontalTopText = screen.getByTestId(horizontalTopTextDataTestId0);

    expect(horizontalTopText.textContent).toBe(horizontalTopTextContent0);
  });
  test('Ao iniciar a página os dados do drink estão filtrando por "Drinks"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mocksRecipeLocalStorage));
    renderWithRouter(<App />, { route });

    const allButton = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(allButton);

    // por que aqui é 0? porque só tem um horizontalTopText na tela com o index 0
    // mesmo que seja drink ao invés de meal
    const horizontalTopText2 = screen.getByTestId(horizontalTopTextDataTestId0);

    expect(horizontalTopText2.textContent).toBe(horizontalTopTextContent1);
  });
});
