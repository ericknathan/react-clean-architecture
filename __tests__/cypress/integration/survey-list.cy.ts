import { Helpers } from '@/tests/cypress/utils/helpers';
import { HttpHelper } from '@/tests/cypress/utils/mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(path, 'GET');
const mockAccessDeniedError = (): void => HttpHelper.mockForbiddenError(path, 'GET');
const mockSuccess = (): void => {
  cy.fixture('survey-list').then(surveyList => HttpHelper.mockOk(path, 'GET', surveyList));
};

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

  it('should present survey items', () => {
    mockSuccess();
    cy.visit('');

    cy.get('li:not(#answer-item):empty').should('have.length', 4);
    cy.get('li:not(#answer-item):not(:empty)').should('have.length', 2);

    cy.get('li:not(#answer-item):nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="date"]').text(), 'Em 3 de fevereiro de 2022');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');
      assert.equal(li.find('[data-testid="question-data"]').css('border-left-color'), 'rgb(35, 157, 51)');
    });

    cy.get('li:not(#answer-item):nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="date"]').text(), 'Em 4 de fevereiro de 2022');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2');
      assert.equal(li.find('[data-testid="question-data"]').css('border-left-color'), 'rgb(157, 35, 35)');
    });
  });
});
