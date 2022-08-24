import { faker } from '@faker-js/faker/locale/pt_BR';
import { SignInHttpHelper } from '@/tests/cypress/support/mocks';
import { FormHelper } from '@/tests/cypress/support/helpers';

const simulateValidSubmit = (error?: string) => {
  FormHelper.insertText('email-input', faker.internet.email());
  FormHelper.insertText('password-input', faker.internet.password());
  FormHelper.testSubmitButton('signin-button', 'main-error-message', error);
}

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
    FormHelper.insertTextAndTestInputStatus('email-input', faker.random.word(), 'Campo e-mail inválido.')
    FormHelper.insertTextAndTestInputStatus('password-input', faker.random.alphaNumeric(3), 'O valor de senha deve ter no mínimo 5 caracteres.')
    FormHelper.testDisabledButton('signin-button', 'main-error-message');
  });

  it('should present valid state if form is valid', () => {
    FormHelper.insertTextAndTestInputStatus('email-input', faker.internet.email(), '');
    FormHelper.insertTextAndTestInputStatus('password-input', faker.internet.password(), '');
    FormHelper.testDisabledButton('signin-button', 'main-error-message', false);
  });

  it('should present InvalidCredentialsError on 401', () => {
    SignInHttpHelper.mockInvalidCredentialsError();
    simulateValidSubmit('Credenciais inválidas');
    FormHelper.testUrl('/signin');
  });

  it('should present UnexpectedError on client or server errors', () => {
    SignInHttpHelper.mockUnexpectedError();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    FormHelper.testUrl('/signin');
  });

  it('should present UnexpectedError if invalid data is returned', () => {
    SignInHttpHelper.mockInvalidData();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    FormHelper.testUrl('/signin');
  });

  it('should save accessToken if valid credentials are provided', () => {
    SignInHttpHelper.mockOk();
    simulateValidSubmit();
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('@4devs/accessToken');
  });

  it('should prevent multiple submits', () => {
    SignInHttpHelper.mockOk();
    simulateValidSubmit();
    FormHelper.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    SignInHttpHelper.mockOk();
    FormHelper.insertText('email-input', faker.internet.email()).type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});