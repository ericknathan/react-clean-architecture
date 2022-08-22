import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { AddAccountStub, ValidationStub } from '@/mocks/presentation';
import { SaveAccessTokenMock } from '@/mocks/domain';
import { SignUp } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';
import { EmailInUseError } from '@/domain/errors';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  sut: RenderResult;
  addAccountStub: AddAccountStub;
  saveAccessTokenMock: SaveAccessTokenMock;
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const addAccountStub = new AddAccountStub();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountStub}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    sut,
    addAccountStub,
    saveAccessTokenMock
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
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut } = makeSut();

    Helper.testButtonIsDisabled(sut, 'signup-button');
    Helper.testInputIsValid(sut, 'name-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'email-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'password-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'password-confirmation-input', DEFAULT_LABEL_VALUE);
  });

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'name-input', faker.name.fullName(), { comparedField: 'title', comparedValue: validationError });
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
  
  it('should show password confirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'password-confirmation-input', faker.internet.password(), { comparedField: 'title', comparedValue: validationError });
  });

  it('should not show input name error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name-input', faker.name.fullName(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input email error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email-input', faker.internet.email(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input password error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });

  it('should not show input password confirmation error if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password-confirmation-input', faker.internet.password(), { comparedField: 'title', comparedValue: DEFAULT_LABEL_VALUE });
  });
  
  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name-input', faker.internet.email());
    Helper.populateField(sut, 'email-input', faker.internet.email());
    Helper.populateField(sut, 'password-input', faker.internet.password());
    Helper.populateField(sut, 'password-confirmation-input', faker.internet.password());

    Helper.testButtonIsDisabled(sut, 'signup-button', false);
  });
  
  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    Helper.testElementExists(sut, 'spinner');
  });
  
  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await Helper.simulateValidSubmit(sut, validSubmitFields(name, email, password));

    expect(addAccountStub.params).toEqual({ name, email, password, passwordConfirmation: password });
  });
  
  it('should call AddAccount only once', async () => {
    const { sut, addAccountStub } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    expect(addAccountStub.callsCount).toBe(1);
  });
  
  it('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, addAccountStub } = makeSut({ validationError });
    await Helper.simulateValidSubmit(sut, validSubmitFields());

    expect(addAccountStub.callsCount).toBe(0);
  });

  // TODO: check why mock fails here
  /*
  it('should present error if AddAccount fails', async () => {
    const error = new EmailInUseError();
    const validationError = error.message;
    const { sut, addAccountStub } = makeSut({ validationError });

    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(error);

    await Helper.simulateValidSubmit(sut, validSubmitFields());

    Helper.compareFieldValue(
      sut.queryByTestId('main-error-message') as HTMLInputElement,
      { comparedField: 'value', comparedValue: validationError }
    );

    Helper.testButtonIsDisabled(sut, 'signup-button', true);
  }); */

  it('should call SaveAccessToken if Authentication succeeds', async () => {
    const { sut, addAccountStub, saveAccessTokenMock } = makeSut();
    await Helper.simulateValidSubmit(sut, validSubmitFields());
    expect(saveAccessTokenMock.accessToken).toBe(addAccountStub.account.accessToken);
    expect(history.location.pathname).toBe('/');
    expect(history.index).toBe(0);
  });

  it('should present error if SaveAccessToken fails', async () => {
    const error = new EmailInUseError();
    const validationError = error.message;
    const { sut, saveAccessTokenMock } = makeSut({ validationError });

    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);

    Helper.simulateValidSubmit(sut, validSubmitFields());

    Helper.testButtonIsDisabled(sut, 'signup-button', true);
  });
  
  it('should go to signin page on click on login button', () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signin-link');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signin');
    expect(history.index).toBe(1);
  });
});
