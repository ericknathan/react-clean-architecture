import { faker } from '@faker-js/faker/locale/pt_BR';

import { CompareFieldsValidation } from "@/helpers/validation/validators";
import { InvalidFieldError } from "@/helpers/validation/errors";

const makeSut = (valueToCompare: string = faker.internet.password()) =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('CompareFieldValidation', () => {
  it('should return error if compare is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.password());
    expect(error).toEqual(new InvalidFieldError(sut.field));
  });
  
  it('should return false if compare is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
