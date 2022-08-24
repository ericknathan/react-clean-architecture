import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { EmailValidation } from "@/helpers/validation/validators";
import { InvalidFieldError } from "@/helpers/validation/errors";

const makeSut = (field: string) => new EmailValidation(field);

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError('email'));
  });

  it('should return falsy if email is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
