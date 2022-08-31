import React from 'react';
import { expect } from '@jest/globals';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { ApiContext } from '@/presentation/contexts'
import { AuthenticationStub, ValidationStub } from '@/mocks/presentation';
import { SignIn } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';
import { Account } from '@/domain/models';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  sut: RenderResult;
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
  const sut = render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock
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
    sut,
    authenticationStub,
    setCurrentAccountMock
  };
};

const validSubmitFields = (email = faker.internet.email(), password = faker.internet.password()) => ([
  { name: 'email-input', value: email },
  { name: 'password-input', value: password }
]);

describe('SignIn Page', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut } = makeSut();

    Helper.testButtonIsDisabled(sut, 'signin-button');
    Helper.testInputIsValid(sut, 'email-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'password-input', DEFAULT_LABEL_VALUE);
  });

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'email-input', faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
  });
  
  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'password-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });
  });

  it('should not show input email error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email-input', faker.internet.email(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });
  
  it('should not show input password error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email-input', faker.internet.email());
    Helper.populateField(sut, 'password-input', faker.internet.password());

    Helper.testButtonIsDisabled(sut, 'signin-button', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    Helper.testElementExists(sut, 'spinner');
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await Helper.simulateValidSubmit(sut, validSubmitFields(email, password));

    expect(authenticationStub.params).toEqual({ email, password });
  });
  
  it('should call Authentication only once', async () => {
    const { sut, authenticationStub } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    expect(authenticationStub.callsCount).toBe(1);
  });
  
  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationStub } = makeSut({ validationError });
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    expect(authenticationStub.callsCount).toBe(0);
  });
  
  // TODO: check why mock fails here
  /*
  it('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const validationError = error.message;
    const { sut, authenticationStub } = makeSut({ validationError });
    
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    Helper.populateField(sut, 'email-input', faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
    Helper.populateField(sut, 'password-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });

    Helper.testButtonIsDisabled(sut, 'signin-button', true);
  });
*/

  it('should call SetCurrentAccount if Authentication succeeds', async () => {
    const { sut, authenticationStub, setCurrentAccountMock } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationStub.account);
    expect(history.location.pathname).toBe('/');
    expect(history.index).toBe(0);
  });

  it('should go to signup page on click on register button', () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup-link');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
    expect(history.index).toBe(1);
  });
});
