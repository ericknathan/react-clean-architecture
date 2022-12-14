import { faker } from '@faker-js/faker/locale/pt_BR';
import { Method } from 'cypress/types/net-stubbing';

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    },
    delay: 500
  });
};

export const mockForbiddenError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    body: {
      error: faker.random.words()
    },
    delay: 500
  });
};

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: faker.internet.httpStatusCode({
      types: ['clientError', 'serverError']
    }),
    body: {
      error: faker.random.words()
    },
    delay: 500
  });
};

export const mockOk = (url: RegExp, method: Method, response: any): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
    delay: 500
  }).as('request');
};
