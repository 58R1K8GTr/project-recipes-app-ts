import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import Footer from '../components/Footer/index';

test('Verifica se o menu inferior existe e contém os ícones', () => {
  renderWithRouter(<Footer />);
  const footer = screen.getByTestId('footer');
  const drinksButton = screen.getByTestId('drinks-btn');
  const mealsButton = screen.getByTestId('meals-btn');
  const drinksImage = screen.getByTestId('drinks-bottom-btn');
  const mealsImage = screen.getByTestId('meals-bottom-btn');

  expect(footer).toBeInTheDocument();
  expect(drinksButton).toBeInTheDocument();
  expect(mealsButton).toBeInTheDocument();
  expect(drinksImage).toHaveAttribute('src', '/src/images/drinkIcon.svg');
  expect(mealsImage).toHaveAttribute('src', '/src/images/mealIcon.svg');
});

test('Verifica se o menu inferior está fixado ao final da página', () => {
  renderWithRouter(<Footer />);
  const footer = screen.getByTestId('footer');

  expect(footer).toHaveStyle({
    position: 'fixed',
    bottom: '0',
  });
});

test('Verifica se o clique no ícone de comidas redireciona corretamente', async () => {
  renderWithRouter(<Footer />);

  const mealsButton = screen.getByTestId('meals-bottom-btn');
  await userEvent.click(mealsButton);

  expect(window.location.pathname).toBe('/meals');
});

test('Verifica se o clique no ícone de bebidas redireciona corretamente', async () => {
  renderWithRouter(<Footer />);

  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  await userEvent.click(drinksButton);

  expect(window.location.pathname).toBe('/drinks');
});
