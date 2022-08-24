export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get DOM element by test id attribute.
       * @example cy.getByTestId('email-input')
       */
       getByTestId: (id: string) => Chainable<HTMLElement> | Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('getByTestId', (id: string) => cy.get(`[data-testid=${id}]`));
