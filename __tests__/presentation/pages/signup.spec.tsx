import React from 'react';
import { expect } from '@jest/globals';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { ApiContext } from '@/presentation/contexts';
import { AddAccountStub, ValidationStub } from '@/mocks/presentation';
import { SignUp } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';
import { Account } from '@/domain/models';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  addAccountStub: AddAccountStub;
  setCurrentAccountMock: (account: Account.Model) => void;
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const addAccountStub = new AddAccountStub();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: jest.fn()
    }}>
      <Router location={history.location} navigator={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountStub}
        />
      </Router>
    </ApiContext.Provider>
  );

  return {
    addAccountStub,
    setCurrentAccountMock
  };
};

const validSubmitFields = (
  name = faker.name.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) => ([
  { name: 'name-input', value: name },
  { name: 'email-input', value: email },
  { name: 'password-input', value: password },
  { name: 'password-confirmation-input', value: password }
]);

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    makeSut();

    Helper.testButtonIsDisabled('signup-button');
    Helper.testInputIsValid('name-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid('email-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid('password-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid('password-confirmation-input', DEFAULT_LABEL_VALUE);
  });

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('name-input', faker.name.fullName(), { comparedField: 'title', comparedValue: validationError });
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
  
  it('should show password confirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('password-confirmation-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });
  });

  it('should not show input name error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('name-input', faker.name.fullName(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input email error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('email-input', faker.internet.email(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input password error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('password-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input password confirmation error if Validation succeeds', () => {
    makeSut();
    Helper.populateField('password-confirmation-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });
  
  it('should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('name-input', faker.internet.email());
    Helper.populateField('email-input', faker.internet.email());
    Helper.populateField('password-input', faker.internet.password());
    Helper.populateField('password-confirmation-input', faker.internet.password());

    Helper.testButtonIsDisabled('signup-button', false);
  });
  
  it('should show spinner on submit', async () => {
    makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());

    Helper.testElementExists('spinner');
  });
  
  it('should call AddAccount with correct values', async () => {
    const { addAccountStub } = makeSut();
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await Helper.simulateValidSubmit(validSubmitFields(name, email, password));

    expect(addAccountStub.params).toEqual({ name, email, password, passwordConfirmation: password });
  });
  
  it('should call AddAccount only once', async () => {
    const { addAccountStub } = makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());
    await Helper.simulateValidSubmit(validSubmitFields());

    expect(addAccountStub.callsCount).toBe(1);
  });
  
  it('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountStub } = makeSut({ validationError });
    await Helper.simulateValidSubmit(validSubmitFields());

    expect(addAccountStub.callsCount).toBe(0);
  });

  // TODO: check why mock fails here
  /*
  it('should present error if AddAccount fails', async () => {
    const error = new EmailInUseError();
    const validationError = error.message;
    const { addAccountStub } = makeSut({ validationError });

    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(error);

    await Helper.simulateValidSubmit(validSubmitFields());

    Helper.compareFieldValue(
      sut.queryByTestId('main-error-message') as HTMLInputElement,
      { comparedField: 'value', comparedValue: validationError }
    );

    Helper.testButtonIsDisabled('signup-button', true);
  }); */

  it('should call SetCurrentAccount if Authentication succeeds', async () => {
    const { addAccountStub, setCurrentAccountMock } = makeSut();
    await Helper.simulateValidSubmit(validSubmitFields());
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountStub.account);
    expect(history.location.pathname).toBe('/');
    expect(history.index).toBe(0);
  });
  
  it('should go to signin page on click on login button', () => {
    makeSut();
    const register = screen.getByTestId('signin-link');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signin');
    expect(history.index).toBe(1);
  });
});
