import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../utils/renderWithRouter';

const PROFILE_TOP_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

const setup = () => {
  const profileIcon = screen.queryByTestId(PROFILE_TOP_BTN);
  const pageTitle = screen.queryByTestId(PAGE_TITLE);
  const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN);
  const searchInput = screen.queryByTestId(SEARCH_INPUT);
  return { profileIcon, pageTitle, searchIcon, searchInput };
};

const ROUTES = {
  HOME: '/',
  MEALS: '/meals',
  DRINKS: '/drinks',
  MEAL_ID: '/meals/123',
  DRINK_ID: '/drinks/123',
  MEAL_ID_IN_PROGRESS: '/meals/123/in-progress',
  DRINK_ID_IN_PROGRESS: '/drinks/123/in-progress',
  PROFILE: '/profile',
  DONE_RECIPES: '/done-recipes',
  FAVORITE_RECIPES: '/favorite-recipes',
};

test('Teste do component Header na rota "/" ', () => {
  renderWithRouter(<App />, { route: ROUTES.HOME });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).not.toBeInTheDocument();
  expect(pageTitle).not.toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/meals" ', () => {
  renderWithRouter(<App />, { route: ROUTES.MEALS });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks" ', () => {
  renderWithRouter(<App />, { route: ROUTES.DRINKS });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
});

test('Teste do component Header na rota "/meals/:id" ', () => {
  renderWithRouter(<App />, { route: ROUTES.MEAL_ID });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).not.toBeInTheDocument();
  expect(pageTitle).not.toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks/:id" ', () => {
  renderWithRouter(<App />, { route: ROUTES.DRINK_ID });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).not.toBeInTheDocument();
  expect(pageTitle).not.toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/meals/:id/in-progress" ', () => {
  renderWithRouter(<App />, { route: ROUTES.MEAL_ID_IN_PROGRESS });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).not.toBeInTheDocument();
  expect(pageTitle).not.toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks/:id/in-progress" ', () => {
  renderWithRouter(<App />, { route: ROUTES.DRINK_ID_IN_PROGRESS });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).not.toBeInTheDocument();
  expect(pageTitle).not.toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/profile" ', () => {
  renderWithRouter(<App />, { route: ROUTES.PROFILE });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/done-recipes" ', () => {
  renderWithRouter(<App />, { route: ROUTES.DONE_RECIPES });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/favorite-recipes" ', () => {
  renderWithRouter(<App />, { route: ROUTES.FAVORITE_RECIPES });
  const { profileIcon, pageTitle, searchIcon } = setup();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste se ao clicar no ícone do Profile, é direcionado à rota "/profile" ', async () => {
  const { user } = renderWithRouter(<App />, { route: ROUTES.MEALS });
  const { profileIcon } = setup();

  if (profileIcon) {
    await user.click(profileIcon);
    expect(screen.getByTestId(PAGE_TITLE).textContent).toBe('Profile');
    expect(window.location.pathname).toBe(ROUTES.PROFILE);
  }
});

test('Verifica se a barra de busca é exibida e oculta ao clicar no ícone de busca', async () => {
  const { user } = renderWithRouter(<App />, { route: ROUTES.MEALS });
  const { searchIcon } = setup();

  if (searchIcon) {
    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
    await user.click(searchIcon);
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    await user.click(searchIcon);
    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
  }
});
