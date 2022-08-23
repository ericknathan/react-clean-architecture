import { faker } from '@faker-js/faker/locale/pt_BR';

import { MinLengthValidation } from "@/helpers/validation/validators";
import { InvalidFieldError } from "@/helpers/validation/errors";
import { DICTIONARY } from 'helpers/typo/DICTIONARY';

const makeSut = (field: string) => new MinLengthValidation(field, 5);

describe('MinLengthValidation', () => {
  it('should return error if value length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(sut.minLength - 1) });
    expect(error).toEqual(new InvalidFieldError(sut.field, `O valor de ${DICTIONARY.FIELDS[field] || field} deve ter no mínimo ${sut.minLength} caracteres.`));
  });

  it('should return falsy if value length is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(sut.minLength) });
    expect(error).toBeFalsy();
  });

  it('should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(sut.minLength) });
    expect(error).toBeFalsy();
  });
});
