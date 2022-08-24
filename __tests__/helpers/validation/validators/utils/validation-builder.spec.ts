import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { 
  ValidationBuilder as sut,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '@/helpers/validation/validators';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it('should return MinLengthValidation', () => {
    const field = faker.database.column();
    const minLength = 5;
    const validations = sut.field(field).min(minLength).build();
    expect(validations).toEqual([new MinLengthValidation(field, minLength)]);
  });

  it('should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)]);
  });


  it('should return a list of validations', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(field).required().min(minLength).email().build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new EmailValidation(field),
    ]);
  });
});
