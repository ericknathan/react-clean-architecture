import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from '@/presentation/pages/login';
import { Validation } from '@/presentation/protocols';
import { faker } from '@faker-js/faker';
import { Authentication } from 'domain/usecases';

type ValidationInput = Authentication.Params;

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation<ValidationInput>;
}

class ValidationSpy implements Validation<ValidationInput> {
  errorMessage = '';
  input: ValidationInput = {
    email: '',
    password: ''
  };

  validate(input: ValidationInput): string {
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
    expect(validationSpy.input.email).toEqual(email);
  });

  it('should call validation with correct password', async () => {
    const password = faker.internet.password();
    const { sut, validationSpy } = makeSut();

    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.input.password).toEqual(password);
  });
});
