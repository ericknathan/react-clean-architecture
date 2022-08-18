import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';
import { Validation } from '@/presentation/protocols';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation;
}

class ValidationSpy implements Validation {
  errorMessage: string = '';
  input: object = {};

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
  
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
    expect(validationSpy.input).toEqual({ email });
  })
})