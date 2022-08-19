import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import { ValidationStub } from '@/mocks/presentation';
import { Authentication } from '@/domain/usecases';
import { mockAccountModel } from '@/mocks/domain';

const DEFAULT_LABEL_VALUE = '';

class AuthenticationSut implements Authentication {
  params: Authentication.Params = { email: '', password: '' };
  
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    return Promise.resolve(mockAccountModel());
  }

}

type SutTypes = {
  sut: RenderResult;
  authenticationSut: AuthenticationSut;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const authenticationSut = new AuthenticationSut();
  const sut = render(<Login validation={validationStub} authentication={authenticationSut} />);

  return {
    sut,
    authenticationSut
  }
}

describe('Login Page', () => {
  afterEach(cleanup);

  it('should start with initial state', async () => {
    const { sut } = makeSut();
    const { queryByText, queryByTestId } = sut;

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    expect(emailInput.required).toBeTruthy();
    expect(emailInput.title).toBe(DEFAULT_LABEL_VALUE);

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    expect(passwordInput.required).toBeTruthy();
    expect(passwordInput.title).toBe(DEFAULT_LABEL_VALUE);
  });

  it('should show email error if Validation fails', async () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { queryByTestId } = sut;
    
    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    expect(emailInput.title).toBe(validationError)
  });
  
  it('should show password error if Validation fails', async () => {
    const { sut } = makeSut();
    const { queryByTestId } = sut;
    
    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    expect(passwordInput.title).toBe(DEFAULT_LABEL_VALUE);
  });

  it('should enable submit button if form is valid', async () => {
    const { sut } = makeSut();
    const { queryByText, queryByTestId } = sut;

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    const { queryByText, queryByTestId } = sut;

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    fireEvent.click(submitButton);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSut } = makeSut();
    const { queryByText, queryByTestId } = sut;
    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(authenticationSut.params).toEqual({
      email,
      password
    });
  });
});
