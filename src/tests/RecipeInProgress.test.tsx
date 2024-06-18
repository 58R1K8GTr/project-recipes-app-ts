import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
// import RecipeInProgress from '../pages/RecipeInProgress';
import data from './helpers/mockDataSearchByMealNameArrabiata.json';
import App from '../App';

const MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => data,
} as Response;

describe('Testa a Página In Progress', () => {
  test('', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE);

    renderWithRouter((<App />), { route: '/meals/52771/in-progress' });

    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: /not found/i }));

    const favoriteBtn = screen.getByAltText(/favoritar/i) as HTMLImageElement;
    const firstCheckBox = screen.getByText(/penne rigate/i) as HTMLInputElement;

    expect(favoriteBtn.src).toBe('http://localhost:3000/src/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteBtn);
    await userEvent.click(firstCheckBox);

    expect(favoriteBtn.src).toBe('http://localhost:3000/src/images/blackHeartIcon.svg');
    expect(firstCheckBox.className).toBe('is-checked');

    screen.debug();
  });
});
