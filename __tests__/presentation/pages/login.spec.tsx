import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';

import { Login } from '@/presentation/pages';
import { AuthenticationStub, ValidationStub } from '@/mocks/presentation';
import { InvalidCredentialsError } from '@/domain/errors';

const DEFAULT_LABEL_VALUE = '';

type ComparationOptions = {
  comparedField?: keyof HTMLInputElement;
  comparedValue?: string;
}

type SutTypes = {
  sut: RenderResult;
  authenticationStub: AuthenticationStub;
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const authenticationStub = new AuthenticationStub();
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationStub} />
    </Router>
  );

  return {
    sut,
    authenticationStub
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  const { queryByTestId } = sut;
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = queryByTestId('signin-button') as HTMLButtonElement;
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
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  })

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
    const { sut, authenticationStub } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationStub.params).toEqual({
      email,
      password
    });
  });
  
  it('should call Authentication only once', () => {
    const { sut, authenticationStub } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationStub.callsCount).toBe(1);
  });
  
  it('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationStub } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.queryByTestId('form') as HTMLFormElement);

    expect(authenticationStub.callsCount).toBe(0);
  });
  
  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const validationError = error.message;
    const { sut, authenticationStub } = makeSut({ validationError });
    
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    populateEmailField(sut, faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
    populatePasswordField(sut, faker.internet.password(), { comparedField: 'title', comparedValue: validationError });

    const submitButton = sut.queryByText('Entrar') as HTMLButtonElement;
    await waitFor(() => submitButton);
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should add accessToken to localStorage if Authentication succeeds', async () => {
    const { sut, authenticationStub } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => expect(localStorage.setItem).toHaveBeenLastCalledWith('@4devs/accessToken', authenticationStub.account.accessToken));    
    expect(history.location.pathname).toBe('/');
    expect(history.index).toBe(0);
  });

  it('should go to signup page on click on register button', () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup-button');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
    expect(history.index).toBe(1);
  });
});
