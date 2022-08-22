import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { ValidationStub } from '@/mocks/presentation';
import { SignUp } from '@/presentation/pages';
import { Helper } from '@/tests/presentation/helpers';

const DEFAULT_LABEL_VALUE = '';

type SutTypes = {
  sut: RenderResult;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError || DEFAULT_LABEL_VALUE;
  const sut = render(
    <SignUp
      validation={validationStub}
    />
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

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'name-input', faker.name.fullName(), { comparedField: 'title', comparedValue: validationError });
  });
  
  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'email-input', faker.internet.email(), { comparedField: 'title', comparedValue: validationError });
  });
});
