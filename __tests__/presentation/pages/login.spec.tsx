import React, { InputHTMLAttributes } from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import { AuthenticationStub, ValidationStub } from '@/mocks/presentation';

const DEFAULT_LABEL_VALUE = '';

type ComparationOptions = {
  comparedField?: keyof HTMLInputElement;
  comparedValue?: string;
}

type SutTypes = {
  sut: RenderResult;
  authenticationSut: AuthenticationStub;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const authenticationSut = new AuthenticationStub();
  const sut = render(<Login validation={validationStub} authentication={authenticationSut} />);

  return {
    sut,
    authenticationSut
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  const { queryByText } = sut;

  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = queryByText('Entrar') as HTMLButtonElement;
  fireEvent.click(submitButton);
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email(), comparationOptions: ComparationOptions = {}): HTMLInputElement => {
  const emailInput = sut.queryByTestId('email-input') as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
  if (comparationOptions.comparedField) compareFieldValue(emailInput, comparationOptions);
  return emailInput;
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password(), comparationOptions: ComparationOptions = {}): HTMLInputElement => {
  const passwordInput = sut.queryByTestId('password-input') as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
  if (comparationOptions.comparedField) compareFieldValue(passwordInput, comparationOptions);
  return passwordInput;
}

const compareFieldValue = (field: HTMLInputElement, comparationOptions: ComparationOptions): void => {
  const { comparedField, comparedValue } = comparationOptions;
  expect(field[comparedField!!]).toBe(comparedValue);
}

describe('Login Page', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
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

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut, faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
  });
  
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut, faker.internet.password(), { comparedField: 'title', comparedValue: validationError });
  });

  it('should not show input email error if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut, faker.internet.email(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });
  
  it('should not show input password error if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut, faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSut } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSut.params).toEqual({
      email,
      password
    });
  });
});
