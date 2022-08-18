import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols';
import { ValidationStub } from '@/mocks/presentation';

type SutTypes = {
  sut: RenderResult;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub}/>);

  return {
    sut,
    validationStub
  }
}

describe('Login Page', () => {
  afterEach(cleanup);

  it('should start with initial state', async () => {
    const { sut } = makeSut();
    const { queryByText, queryByTestId } = sut;

    const submitButton = queryByText('Entrar') as HTMLButtonElement;
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBeTruthy();

    const emailInput = queryByTestId('email-input') as HTMLInputElement;
    expect(emailInput.required).toBeTruthy();

    const passwordInput = queryByTestId('password-input') as HTMLInputElement;
    expect(passwordInput.required).toBeTruthy();
  });

  it('should call validation with correct email', async () => {
    const email = faker.internet.email();
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;

    const emailInput = getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationStub.fieldName).toBe('email');
        expect(validationStub.fieldValue).toBe(email);
  });

  it('should call validation with correct password', async () => {
    const password = faker.internet.password();
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;

    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationStub.fieldName).toBe('password');
        expect(validationStub.fieldValue).toBe(password);
  });
  
  it('should show email error if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;
    
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailInputLabel = getByTestId('email-label') as HTMLLabelElement;
    expect(emailInputLabel.textContent).toBe(validationStub.errorMessage)
  });
  
  it('should show password error if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;
    
    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordInputLabel = getByTestId('password-label') as HTMLLabelElement;
    expect(passwordInputLabel.textContent).toBe(validationStub.errorMessage);
  });
});
