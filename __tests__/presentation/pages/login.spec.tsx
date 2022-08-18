import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return {
    sut
  }
}

describe('Login Page', () => {
  it('should start with initial state', async () => {
    const { sut } = makeSut();
    const { queryByText, queryByTestId } = sut;

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBeTruthy();

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    expect(emailInput.required).toBeTruthy();

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    expect(passwordInput.required).toBeTruthy();
  })
})