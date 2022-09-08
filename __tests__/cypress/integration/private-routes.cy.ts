import { Helpers } from '@/tests/cypress/support/helpers';

describe('SignIn Integration', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('');
    Helpers.testUrl('/signin');
  });
});
