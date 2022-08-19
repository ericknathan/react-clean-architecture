import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';
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

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  const { queryByTestId } = sut;
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = queryByTestId('form') as HTMLFormElement;
  fireEvent.submit(form);
  await waitFor(() => form);
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

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.queryByTestId(fieldName);
  expect(element).toBeTruthy();
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, expected = true): void => {
  const button = sut.queryByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(expected);
}

const testInputIsValid = (sut: RenderResult, fieldName: string, value: string): void => {
  const input = sut.queryByTestId(fieldName) as HTMLInputElement;
  expect(input.required).toBeTruthy();
  expect(input.title).toBe(value);
}

describe('Login Page', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  })

  it('should start with initial state', () => {
    const { sut } = makeSut();

    testButtonIsDisabled(sut, 'signin-button');
    testInputIsValid(sut, 'email-input', DEFAULT_LABEL_VALUE);
    testInputIsValid(sut, 'password-input', DEFAULT_LABEL_VALUE);
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

    testButtonIsDisabled(sut, 'signin-button', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);

    testElementExists(sut, 'spinner');
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);

    expect(authenticationStub.params).toEqual({ email, password });
  });
  
  it('should call Authentication only once', async () => {
    const { sut, authenticationStub } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationStub.callsCount).toBe(1);
  });
  
  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationStub } = makeSut({ validationError });
    await simulateValidSubmit(sut);

    expect(authenticationStub.callsCount).toBe(0);
  });
  
  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const validationError = error.message;
    const { sut, authenticationStub } = makeSut({ validationError });
    
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    populateEmailField(sut, faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
    populatePasswordField(sut, faker.internet.password(), { comparedField: 'title', comparedValue: validationError });

    testButtonIsDisabled(sut, 'signin-button', true);
  });

  it('should add accessToken to localStorage if Authentication succeeds', async () => {
    const { sut, authenticationStub } = makeSut();
    await simulateValidSubmit(sut);
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
