import { Helpers } from '@/tests/cypress/utils/helpers';
import { HttpHelper } from '@/tests/cypress/utils/mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(path, 'GET');
const mockAccessDeniedError = (): void => HttpHelper.mockForbiddenError(path, 'GET');

describe('SurveyList Integration', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helpers.setLocalStorageItem('@4devs/account', account);
      cy.visit('');
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.getByTestId('survey-list-error').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente em breve.');
  });

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    Helpers.testUrl('/signin');
  });

  it('should present correct username', () => {
    mockUnexpectedError();
    const { name } = Helpers.getLocalStorageItem('@4devs/account');
    cy.getByTestId('header-username').should('contain.text', name);
  });

  it('should logout on logout link click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('header-logout-button').click();
    Helpers.testUrl('/signin');
  });
});
