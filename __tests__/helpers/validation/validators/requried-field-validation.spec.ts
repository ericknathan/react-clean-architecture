import { faker } from '@faker-js/faker/locale/pt_BR';

import { RequiredFieldValidation } from "@/helpers/validation/validators";
import { RequiredFieldError } from "@/helpers/validation/errors";

const makeSut = () => new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  })

  it('should return false if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  })
})