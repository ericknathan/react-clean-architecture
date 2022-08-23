describe('SignIn E2E', () => {
  beforeEach(() => {
    cy.visit('signin');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'title', '');
    cy.getByTestId('password-input').should('have.attr', 'title', '');
    cy.getByTestId('signin-button').should('have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });
});
