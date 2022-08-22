import { faker } from '@faker-js/faker/locale/pt_BR';

import { RequiredFieldValidation } from "@/helpers/validation/validators";
import { RequiredFieldError } from "@/helpers/validation/errors";

const makeSut = (field: string) => new RequiredFieldValidation(field);

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return false if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
