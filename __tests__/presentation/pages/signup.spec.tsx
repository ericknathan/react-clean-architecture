import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import { SignUp } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';

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

describe('SignUp Page', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut } = makeSut();

    Helper.testButtonIsDisabled(sut, 'signup-button');
    Helper.testInputIsValid(sut, 'name-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'email-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'password-input', DEFAULT_LABEL_VALUE);
    Helper.testInputIsValid(sut, 'password-confirmation-input', DEFAULT_LABEL_VALUE);
  });
});
