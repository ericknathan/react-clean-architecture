import { faker } from '@faker-js/faker/locale/pt_BR';
import { SignUpHttpHelper } from '@/tests/cypress/support/mocks';
import { FormHelper } from '@/tests/cypress/support/helpers';

const simulateValidSubmit = (error?: string) => {
  const password = faker.internet.password();
  FormHelper.insertTextAndTestInputStatus('name-input', faker.name.fullName(), '');
  FormHelper.insertTextAndTestInputStatus('email-input', faker.internet.email(), '');
  FormHelper.insertTextAndTestInputStatus('password-input', password, '');
  FormHelper.insertTextAndTestInputStatus('password-confirmation-input', password, '');
  FormHelper.testSubmitButton('signup-button', 'main-error-message', error);
}

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
    FormHelper.insertTextAndTestInputStatus('name-input', faker.random.alphaNumeric(2), 'O valor de nome deve ter no mínimo 3 caracteres.')
    FormHelper.insertTextAndTestInputStatus('email-input', faker.random.word(), 'Campo e-mail inválido.')
    FormHelper.insertTextAndTestInputStatus('password-input', faker.random.alphaNumeric(3), 'O valor de senha deve ter no mínimo 5 caracteres.')
    FormHelper.insertTextAndTestInputStatus('password-confirmation-input', faker.random.alphaNumeric(4), 'Campo confirmação de senha inválido.')
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
    SignUpHttpHelper.mockEmailInUseError();
    simulateValidSubmit('Esse e-mail já está em uso');
    FormHelper.testUrl('/signup');
  });

  it('should present UnexpectedError on client or server errors', () => {
    SignUpHttpHelper.mockUnexpectedError();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    FormHelper.testUrl('/signup');
  });

  it('should present UnexpectedError if invalid data is returned', () => {
    SignUpHttpHelper.mockInvalidData();
    simulateValidSubmit('Ocorreu um erro inesperado. Tente novamente em breve.');
    FormHelper.testUrl('/signup');
  });

  it('should save account if valid credentials are provided', () => {
    SignUpHttpHelper.mockOk();
    simulateValidSubmit();
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('@4devs/account');
  });

  it('should prevent multiple submits', () => {
    SignUpHttpHelper.mockOk();
    simulateValidSubmit();
    FormHelper.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    SignUpHttpHelper.mockOk();
    FormHelper.insertText('email-input', faker.internet.email()).type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});
