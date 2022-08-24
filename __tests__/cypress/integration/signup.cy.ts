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
});
