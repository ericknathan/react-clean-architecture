declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get DOM element by test id attribute.
       * @example cy.getByTestId('email-input')
       */
       getByTestId: (id: string) => Chainable<Element>
    }
  }
}
