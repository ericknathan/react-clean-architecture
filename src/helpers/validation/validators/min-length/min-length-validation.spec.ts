import { MinLengthValidation } from "./min-length-validation";
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidFieldError } from "../../errors";

const makeSut = () => new MinLengthValidation(faker.database.column(), 5);

describe('MinLengthValidation', () => {
  it('should return error if value length is invalid', () => {
    const sut = makeSut();
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError(sut.field, `O valor deve ter no mínimo ${sut.minLength} caracteres`))
  })
})