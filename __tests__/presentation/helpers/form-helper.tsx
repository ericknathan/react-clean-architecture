import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

type ComparationOptions = {
  comparedField?: keyof HTMLInputElement;
  comparedValue?: string;
}

export const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  const { queryByTestId } = sut;
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = queryByTestId('form') as HTMLFormElement;
  fireEvent.submit(form);
  await waitFor(() => form);
};

export const populateEmailField = (sut: RenderResult, email = faker.internet.email(), comparationOptions: ComparationOptions = {}): HTMLInputElement => {
  const emailInput = sut.queryByTestId('email-input') as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
  if (comparationOptions.comparedField) compareFieldValue(emailInput, comparationOptions);
  return emailInput;
};

export const populatePasswordField = (sut: RenderResult, password = faker.internet.password(), comparationOptions: ComparationOptions = {}): HTMLInputElement => {
  const passwordInput = sut.queryByTestId('password-input') as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
  if (comparationOptions.comparedField) compareFieldValue(passwordInput, comparationOptions);
  return passwordInput;
};

export const compareFieldValue = (field: HTMLInputElement, comparationOptions: ComparationOptions): void => {
  const { comparedField, comparedValue } = comparationOptions;
  expect(field[comparedField!]).toBe(comparedValue);
};

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.queryByTestId(fieldName);
  expect(element).toBeTruthy();
};

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, expected = true): void => {
  const button = sut.queryByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(expected);
};

export const testInputIsValid = (sut: RenderResult, fieldName: string, value: string): void => {
  const input = sut.queryByTestId(fieldName) as HTMLInputElement;
  expect(input.required).toBeTruthy();
  expect(input.title).toBe(value);
};
