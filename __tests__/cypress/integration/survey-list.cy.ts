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
});
