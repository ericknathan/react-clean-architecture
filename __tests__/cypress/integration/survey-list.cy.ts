import { faker } from '@faker-js/faker/locale/pt_BR';
import { SurveyListHttpHelper } from '@/tests/cypress/support/mocks';
import { Helpers } from '@/tests/cypress/support/helpers';

describe('SurveyList Integration', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('@4devs/account', { accessToken: faker.datatype.uuid(), name: faker.name.firstName() });
    cy.visit('');
  });

  it('should present error on UnexpectedError', () => {
    SurveyListHttpHelper.mockUnexpectedError();
    cy.getByTestId('survey-list-error').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente em breve.');
  });

  it('should logout on AccessDeniedError', () => {
    SurveyListHttpHelper.mockAccessDeniedError();
    Helpers.testUrl('/signin');
  });

  it('should present correct username', () => {
    SurveyListHttpHelper.mockUnexpectedError();
    const { name } = Helpers.getLocalStorageItem('@4devs/account');
    cy.getByTestId('header-username').should('contain.text', name);
  });

  it('should logout on logout link click', () => {
    SurveyListHttpHelper.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('header-logout-button').click();
    Helpers.testUrl('/signin');
  });
});
