export const insertText = (field: string, text: string) => cy.getByTestId(field).type(text);

export const testInputStatus = (field: string, error: string) => cy.getByTestId(field).should('have.attr', 'title', error);

export const insertTextAndTestInputStatus = (field: string, text: string, error: string) => {
  insertText(field, text);
  testInputStatus(field, error);
};

export const testSubmitButton = (field: string, errorField?: string, error?: string) => {
  cy.getByTestId(field).dblclick().getByTestId('spinner').should('exist');

  if(errorField) {
    if(!error) cy.getByTestId(errorField).should('not.have.text');
    else cy.getByTestId(errorField).should('contains.text', error);
  }

  cy.getByTestId('spinner').should('not.exist');
};

export const testDisabledButton = (field: string, errorField?: string, disabled = true) => {
  console.log({ button: `${disabled ? 'not.' : ''}have.attr` });
  cy.getByTestId(field).should(`${disabled ? '' : 'not.'}have.attr`, 'disabled');
  if(errorField) cy.getByTestId(errorField).should('not.have.text');
};
