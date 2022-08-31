import { expect } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

type ComparationOptions = {
  comparedField?: keyof HTMLInputElement;
  comparedValue?: string;
}

type Field = {
  name: string;
  value?: string;
}

export const simulateValidSubmit = async (fields: Field[]): Promise<void> => {
  const { queryByTestId } = screen;
  for(const field of fields) {
    populateField(field.name, field.value);
  }

  const form = queryByTestId('form') as HTMLFormElement;
  fireEvent.submit(form);
  await waitFor(() => form);
};

export const populateField = (fieldName: string, value = faker.random.word(), comparationOptions: ComparationOptions = {}): HTMLInputElement => {
  const input = screen.queryByTestId(fieldName) as HTMLInputElement;
  fireEvent.input(input, { target: { value } });
  if (comparationOptions.comparedField) compareFieldValue(input, comparationOptions);
  return input;
};

export const compareFieldValue = (field: HTMLInputElement, comparationOptions: ComparationOptions): void => {
  const { comparedField, comparedValue } = comparationOptions;
  expect(field[comparedField!]).toBe(comparedValue);
};

export const testElementExists = (fieldName: string): void => {
  const element = screen.queryByTestId(fieldName);
  expect(element).toBeTruthy();
};

export const testButtonIsDisabled = (fieldName: string, expected = true): void => {
  const button = screen.queryByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(expected);
};

export const testInputIsValid = (fieldName: string, value: string): void => {
  const input = screen.queryByTestId(fieldName) as HTMLInputElement;
  expect(input.required).toBeTruthy();
  expect(input.title).toBe(value);
};
