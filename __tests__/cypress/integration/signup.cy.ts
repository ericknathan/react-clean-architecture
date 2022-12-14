import { faker } from '@faker-js/faker/locale/pt_BR';
import { FormHelper, Helpers } from '@/tests/cypress/utils/helpers';
import { HttpHelper } from '@/tests/cypress/utils/mocks';

const path = /signup/;
const mockEmailInUseError = (): void => HttpHelper.mockForbiddenError(path, 'POST');
const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(path, 'POST');
const mockSuccess = (): void => {
  cy.fixture('account').then(account => HttpHelper.mockOk(path, 'POST', account));
};

const simulateValidSubmit = (error?: string) => {
  const password = faker.internet.password();
  FormHelper.insertTextAndTestInputStatus('name-input', faker.name.fullName(), '');
  FormHelper.insertTextAndTestInputStatus('email-input', faker.internet.email(), '');
  FormHelper.insertTextAndTestInputStatus('password-input', password, '');
  FormHelper.insertTextAndTestInputStatus('password-confirmation-input', password, '');
  FormHelper.testSubmitButton('signup-button', 'main-error-message', error);
};

describe('SignUp Integration', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'autocomplete');
    FormHelper.testInputStatus('name-input', '');
    FormHelper.testInputStatus('email-input', '');
    FormHelper.testInputStatus('password-input', '');
    FormHelper.testInputStatus('password-confirmation-input', '');
    FormHelper.testDisabledButton('signup-button', 'main-error-message');
  });

  it('should present error state if form is invalid', () => {
    FormHelper.insertTextAndTestInputStatus('name-input', faker.random.alphaNumeric(2), 'O valor de nome deve ter no mínimo 3 caracteres.');
    FormHelper.insertTextAndTestInputStatus('email-input', faker.random.word(), 'Campo e-mail inválido.');
    FormHelper.insertTextAndTestInputStatus('password-input', faker.random.alphaNumeric(3), 'O valor de senha deve ter no mínimo 5 caracteres.');
    FormHelper.insertTextAndTestInputStatus('password-confirmation-input', faker.random.alphaNumeric(4), 'Campo confirmação de senha inválido.');
    FormHelper.testDisabledButton('signup-button', 'main-error-message');
  });

  it('should present valid state if form is valid', () => {
    const password = faker.internet.password();
    FormHelper.insertTextAndTestInputStatus('name-input', faker.name.fullName(), '');
    FormHelper.insertTextAndTestInputStatus('email-input', faker.internet.email(), '');
    FormHelper.insertTextAndTestInputStatus('password-input', password, '');
    FormHelper.insertTextAndTestInputStatus('password-confirmation-input', password, '');
    FormHelper.testDisabledButton('signup-button', 'main-error-message', false);
  });

  it('should present InvalidCredentialsError on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit('Esse e-mail já está em uso');
    Helpers.testUrl('/signup');
  });

  it('should present UnexpectedError on client or server errors', () => {
    mockUnexpectedError();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    Helpers.testUrl('/signup');
  });

  it('should save account if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();
    Helpers.testUrl('/');
    Helpers.testLocalStorageItem('@4devs/account');
  });

  it('should prevent multiple submits', () => {
    mockSuccess();
    simulateValidSubmit();
    Helpers.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();
    FormHelper.insertText('email-input', faker.internet.email()).type('{enter}');
    Helpers.testHttpCallsCount(0);
  });
});
