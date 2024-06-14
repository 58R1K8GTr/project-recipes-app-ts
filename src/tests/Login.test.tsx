import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login/Login';
import { renderWithRouter } from '../utils/renderWithRouter';

test('O botão deve estar desativado se o e-mail for inválido', async () => {
  renderWithRouter(<Login />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  await userEvent.type(emailInput, 'invalid-email');
  await userEvent.type(passwordInput, '1234567');

  expect(submitButton).toBeDisabled();

  await userEvent.type(emailInput, 'teste@teste.com');
  await userEvent.type(passwordInput, '1234567');

  expect(submitButton).not.toBeDisabled();

  await userEvent.click(submitButton);
});
