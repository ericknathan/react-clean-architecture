import { faker } from '@faker-js/faker/locale/pt_BR';

const baseUrl: string = Cypress.config().baseUrl;

describe('SignIn Integration', () => {
  beforeEach(() => {
    cy.visit('signin');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'autocomplete');
    cy.getByTestId('email-input').should('have.attr', 'title', '');
    cy.getByTestId('password-input').should('have.attr', 'title', '');
    cy.getByTestId('signin-button').should('have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word()).should('have.attr', 'title', 'Campo e-mail inválido.');
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(3)).should('have.attr', 'title', 'O valor de senha deve ter no mínimo 5 caracteres.');
    cy.getByTestId('signin-button').should('have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email()).should('have.attr', 'title', '');
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5)).should('have.attr', 'title', '');
    cy.getByTestId('signin-button').should('not.have.attr', 'disabled');
    cy.getByTestId('main-error-message').should('not.have.text');
  });

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      },
      delay: 500
    });

    cy.getByTestId('email-input').focus().type(faker.internet.email());
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('signin-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error-message').should('contains.text', 'Credenciais inválidas');
    cy.url().should('eq', `${baseUrl}/signin`);
  });

  it('should present UnexpectedError on client or server errors', () => {
    cy.intercept('POST', /login/, {
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError']
      }),
      body: {
        error: faker.random.words()
      },
      delay: 500
    });

    cy.getByTestId('email-input').focus().type(faker.internet.email());
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('signin-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error-message').should('contains.text', 'Ocorreu um erro inesperado. Tente novamente em breve.');
    cy.url().should('eq', `${baseUrl}/signin`);
  });

  it('should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      },
      delay: 500
    });

    cy.getByTestId('email-input').focus().type(faker.internet.email());
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5)).type('{enter}');
    // cy.getByTestId('signin-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error-message').should('contains.text', 'Ocorreu um erro inesperado. Tente novamente em breve.');
    cy.url().should('eq', `${baseUrl}/signin`);
  });

  it('should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      },
      delay: 500
    });

    cy.getByTestId('email-input').focus().type(faker.internet.email());
    cy.getByTestId('password-input').focus().type(faker.internet.password());
    cy.getByTestId('signin-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('main-error-message').should('not.have.text');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then(window => expect(window.localStorage.getItem('@4devs/accessToken')).to.be.a('string'));
  });

  it('should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      },
      delay: 500
    }).as('request/signin');

    cy.getByTestId('email-input').focus().type(faker.internet.email());
    cy.getByTestId('password-input').focus().type(faker.internet.password());
    cy.getByTestId('signin-button').dblclick();
    cy.get('@request/signin.all').should('have.length', 1);
  });

  it('should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      },
      delay: 500
    }).as('request/signin');

    cy.getByTestId('email-input').focus().type(faker.internet.email()).type('{enter}');
    cy.get('@request/signin.all').should('have.length', 0);
  });
});
