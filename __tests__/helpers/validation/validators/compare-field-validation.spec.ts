import { faker } from '@faker-js/faker/locale/pt_BR';

import { CompareFieldsValidation } from "@/helpers/validation/validators";
import { InvalidFieldError } from "@/helpers/validation/errors";

const makeSut = (field: string, fieldToCompare: string) =>
  new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);

    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    });
    expect(error).toEqual(new InvalidFieldError(sut.field));
  });
  
  it('should return false if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
