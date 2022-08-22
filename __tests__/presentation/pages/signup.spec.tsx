import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import { SignUp } from '@/presentation/pages';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  );

  return {
    sut
  };
};

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, expected = true): void => {
  const button = sut.queryByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(expected);
};

const testInputIsValid = (sut: RenderResult, fieldName: string, value: string): void => {
  const input = sut.queryByTestId(fieldName) as HTMLInputElement;
  expect(input.required).toBeTruthy();
  expect(input.title).toBe(value);
};

describe('SignUp Page', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut } = makeSut();

    testButtonIsDisabled(sut, 'signup-button');
    testInputIsValid(sut, 'name-input', DEFAULT_LABEL_VALUE);
    testInputIsValid(sut, 'email-input', DEFAULT_LABEL_VALUE);
    testInputIsValid(sut, 'password-input', DEFAULT_LABEL_VALUE);
    testInputIsValid(sut, 'password-confirmation-input', DEFAULT_LABEL_VALUE);
  });
});
