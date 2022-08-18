import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols';
import { ValidationSpy } from '@/mocks/presentation';

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy}/>);

  return {
    sut,
    validationSpy
  }
}

describe('Login Page', () => {
  afterEach(cleanup);

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
  });

  it('should call validation with correct email', async () => {
    const email = faker.internet.email();
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldName).toBe('email');
        expect(validationSpy.fieldValue).toBe(email);
  });

  it('should call validation with correct password', async () => {
    const password = faker.internet.password();
    const { sut, validationSpy } = makeSut();

    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldName).toBe('password');
        expect(validationSpy.fieldValue).toBe(password);
  });
});
