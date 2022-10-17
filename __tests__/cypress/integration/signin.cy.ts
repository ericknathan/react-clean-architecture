import { faker } from '@faker-js/faker/locale/pt_BR';
import { FormHelper, Helpers } from '@/tests/cypress/utils/helpers';
import { HttpHelper } from '@/tests/cypress/utils/mocks';

const path = /login/;
const mockInvalidCredentialsError = (): void => HttpHelper.mockUnauthorizedError(path);
const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(path, 'POST');
const mockSuccess = (): void => {
  cy.fixture('account').then(account => HttpHelper.mockOk(path, 'POST', account));
};

const simulateValidSubmit = (error?: string) => {
  FormHelper.insertText('email-input', faker.internet.email());
  FormHelper.insertText('password-input', faker.internet.password());
  FormHelper.testDisabledButton('signin-button', 'main-error-message', false);
  FormHelper.testSubmitButton('signin-button', 'main-error-message', error);
};

describe('SignIn Integration', () => {
  beforeEach(() => {
    cy.visit('signin');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'autocomplete');
    FormHelper.testInputStatus('email-input', '');
    FormHelper.testInputStatus('password-input', '');
    FormHelper.testDisabledButton('signin-button', 'main-error-message');
  });

  it('should present error state if form is invalid', () => {
    FormHelper.insertTextAndTestInputStatus('email-input', faker.random.word(), 'Campo e-mail inválido.');
    FormHelper.insertTextAndTestInputStatus('password-input', faker.random.alphaNumeric(3), 'O valor de senha deve ter no mínimo 5 caracteres.');
    FormHelper.testDisabledButton('signin-button', 'main-error-message');
  });

  it('should present valid state if form is valid', () => simulateValidSubmit());

  it('should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError();
    simulateValidSubmit('Credenciais inválidas');
    Helpers.testUrl('/signin');
  });

  it('should present UnexpectedError on client or server errors', () => {
    mockUnexpectedError();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    Helpers.testUrl('/signin');
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
