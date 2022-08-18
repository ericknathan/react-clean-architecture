import React from 'react';
import { render } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';

describe('Login Page', () => {
  it('should start with initial state', async () => {
    const { queryByText, queryByTestId } = render(<Login />);

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBeTruthy();

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    expect(emailInput.required).toBeTruthy();

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    expect(passwordInput.required).toBeTruthy();
  })
})