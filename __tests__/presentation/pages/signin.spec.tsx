import React from 'react';
import { expect } from '@jest/globals';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { ApiContext } from '@/presentation/contexts';
import { AuthenticationStub, ValidationStub } from '@/mocks/presentation';
import { SignIn } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';
import { Account } from '@/domain/models';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  authenticationStub: AuthenticationStub;
  setCurrentAccountMock: (account: Account.Model) => void;
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/signin'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const authenticationStub = new AuthenticationStub();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: jest.fn()
    }}>
      <Router location={history.location} navigator={history}>
        <SignIn
          validation={validationStub}
          authentication={authenticationStub}
        />
      </Router>
    </ApiContext.Provider>
  );

  return {
    authenticationStub,
    setCurrentAccountMock
  };
};

const validSubmitFields = (email = faker.internet.email(), password = faker.internet.password()) => ([
  { name: 'email-input', value: email },
  { name: 'password-input', value: password }
]);

describe('SignIn Page', () => {
  it('should start with initial state', () => {
    makeSut();

    Helper.testButtonIsDisabled('signin-button');
    Helper.testInputIsValid('email-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid('password-input', DEFAULT_LABEL_VALUE);
  });

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email-input', faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
  });
  
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('password-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });
  });

  it('should not show input email error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('email-input', faker.internet.email(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });
  
  it('should not show input password error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('password-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('email-input', faker.internet.email());
    Helper.populateField('password-input', faker.internet.password());

    Helper.testButtonIsDisabled('signin-button', false);
  });

  it('should show spinner on submit', async () => {
    makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());

    Helper.testElementExists('spinner');
  });

  it('should call Authentication with correct values', async () => {
    const { authenticationStub } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await Helper.simulateValidSubmit(validSubmitFields(email, password));

    expect(authenticationStub.params).toEqual({ email, password });
  });
  
  it('should call Authentication only once', async () => {
    const { authenticationStub } = makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());
    await Helper.simulateValidSubmit(validSubmitFields());

    expect(authenticationStub.callsCount).toBe(1);
  });
  
  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationStub } = makeSut({ validationError });
    await Helper.simulateValidSubmit(validSubmitFields());

    expect(authenticationStub.callsCount).toBe(0);
  });
  
  // TODO: check why mock fails here
  /*
  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const validationError = error.message;
    const { authenticationStub } = makeSut({ validationError });
    
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    Helper.populateField('email-input', faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
    Helper.populateField('password-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });

    Helper.testButtonIsDisabled('signin-button', true);
  });
*/

  it('should call SetCurrentAccount if Authentication succeeds', async () => {
    const { authenticationStub, setCurrentAccountMock } = makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationStub.account);
    expect(history.location.pathname).toBe('/');
    expect(history.index).toBe(0);
  });

  it('should go to signup page on click on register button', () => {
    makeSut();
    const register = screen.getByTestId('signup-link');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
    expect(history.index).toBe(1);
  });
});
