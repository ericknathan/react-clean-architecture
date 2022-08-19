import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "@/helpers/validation/errors";
import { faker } from '@faker-js/faker/locale/pt_BR';

const makeSut = () => new EmailValidation();

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError('email'));
  });

  it('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toBeFalsy();
  });
});
