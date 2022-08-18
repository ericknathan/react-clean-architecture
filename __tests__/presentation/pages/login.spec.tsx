import React from 'react';
import { render } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';

describe('Login Page', () => {
  it('should not render spinner on start', async () => {
    const { queryByText } = render(<Login />);
    const buttonText = queryByText('Entrar');
    expect(buttonText).toBeTruthy();
  })
})