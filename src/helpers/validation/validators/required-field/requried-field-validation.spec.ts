import { RequiredFieldValidation } from "./required-field-validation";
import { RequiredFieldError } from "@/helpers/validation/errors";
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  })

  it('should return false if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  })
})