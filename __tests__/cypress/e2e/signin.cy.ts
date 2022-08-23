import { faker } from '@faker-js/faker/locale/pt_BR';

describe('SignIn E2E', () => {
  beforeEach(() => {
    cy.visit('signin');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'autocomplete');
    cy.getByTestId('email-input').should('have.attr', 'title', '');
    cy.getByTestId('password-input').should('have.attr', 'title', '');
    cy.getByTestId('signin-button').should('have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word()).should('have.attr', 'title', 'Campo e-mail inválido.');
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(3)).should('have.attr', 'title', 'O valor de senha deve ter no mínimo 5 caracteres.');
    cy.getByTestId('signin-button').should('have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email()).should('have.attr', 'title', '');
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5)).should('have.attr', 'title', '');
    cy.getByTestId('signin-button').should('not.have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });
});
