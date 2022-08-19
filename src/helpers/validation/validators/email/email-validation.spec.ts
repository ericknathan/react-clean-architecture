import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "@/helpers/validation/errors";

const makeSut = () => new EmailValidation('email');

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError('email'));
  })
})