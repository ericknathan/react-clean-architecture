import { faker } from '@faker-js/faker/locale/pt_BR';
import { FormHelper } from '@/tests/cypress/support/helpers';

describe('SignIn Integration', () => {
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
});
