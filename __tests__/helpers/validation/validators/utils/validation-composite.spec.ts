import { faker } from '@faker-js/faker/locale/pt_BR';

import { FieldValidationStub } from '@/mocks/helpers';
import { ValidationComposite } from '@/helpers/validation/validators';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationStubs: FieldValidationStub[];
  fieldName: string;
}

const makeSut = (
  fieldName = faker.database.column(),
  fieldValidationStubs = [
    new FieldValidationStub(fieldName),
    new FieldValidationStub(fieldName),
  ]): SutTypes => {
  const sut = ValidationComposite.build(fieldValidationStubs);

  return {
    sut,
    fieldValidationStubs,
    fieldName
  };
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationStubs, fieldName } = makeSut();
    fieldValidationStubs[0].error = new Error(faker.random.words());
    fieldValidationStubs[1].error = new Error(faker.random.words());
    
    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word(),
    });
    expect(error).toBe(fieldValidationStubs[0].error.message);
  });

  it('should not return error if validation succeeds', () => {
    const { sut, fieldName } = makeSut();
    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word(),
    });
    expect(error).toBeFalsy();
  });
});
