import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import Profile from '../pages/Profile';
import App from '../App';

describe('Testa a Página Profile', () => {
  test('Ao clicar no botão de Logout limpa os dados do localStorage e redireciona para rota "/"', async () => {
    const mockEmail = 'teste@teste.com';
    const mockJSON = JSON.stringify({ email: mockEmail });
    localStorage.setItem('user', mockJSON);

    renderWithRouter(<Profile />);

    const emailHeading = screen.queryByRole('heading');
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(emailHeading).toBeInTheDocument();

    expect(localStorage).toHaveLength(1);

    await userEvent.click(logoutBtn);

    expect(localStorage).toHaveLength(0);
    expect(emailHeading).not.toBeInTheDocument();
  });

  test('Ao clicar no botão Done Recipes, deve redirecionar para a rota "/done-recipes"', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });

    await userEvent.click(doneRecipesBtn);

    const doneRecipesHeader = screen.queryByRole('heading', { name: /done recipes/i });
    expect(doneRecipesHeader).toBeInTheDocument();
  });

  test('Ao clicar no botão Favorite Recipes, deve redirecionar para a rota "/favorite-recipes"', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });

    await userEvent.click(favoriteRecipesBtn);

    const favoriteRecipesHeader = screen.queryByRole('heading', { name: /favorite recipes/i });
    expect(favoriteRecipesHeader).toBeInTheDocument();
  });
});
