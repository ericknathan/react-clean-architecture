import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols';
import { ValidationStub } from '@/mocks/presentation';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  sut: RenderResult;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const sut = render(<Login validation={validationStub}/>);

  return {
    sut
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
    const { getByTestId } = sut;
    
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    expect(emailInput.title).toBe(validationError)
  });
  
  it('should show password error if Validation fails', async () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    
    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    expect(passwordInput.title).toBe(DEFAULT_LABEL_VALUE);
  });

  it('should enable submit button if form is valid', async () => {
    const { sut } = makeSut();
    const { queryByText, getByTestId } = sut;

    const emailInput = getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
