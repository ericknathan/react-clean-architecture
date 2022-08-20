import { faker } from '@faker-js/faker/locale/pt_BR';

import { MinLengthValidation } from "@/helpers/validation/validators";
import { InvalidFieldError } from "@/helpers/validation/errors";

const makeSut = () => new MinLengthValidation(faker.database.column(), 5);

describe('MinLengthValidation', () => {
  it('should return error if value length is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(sut.minLength - 1));
    expect(error).toEqual(new InvalidFieldError(sut.field, `O valor deve ter no mínimo ${sut.minLength} caracteres`));
  });

  it('should return falsy if value length is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(sut.minLength));
    expect(error).toBeFalsy();
  });
});