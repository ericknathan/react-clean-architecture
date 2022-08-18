import React from 'react';
import { render } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';

describe('Login Page', () => {
  it('should start with initial state', async () => {
    const { queryByText } = render(<Login />);
    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBe(true);
  })
})