const baseUrl = Cypress.config().baseUrl;

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path = ''): void => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => expect(window.localStorage.getItem(key)).to.exist);
};
