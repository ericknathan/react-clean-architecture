import { faker } from '@faker-js/faker/locale/pt_BR';

import { 
  ValidationBuilder as sut,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/helpers/validation/validators';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation()]);
  });

  it('should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const minLength = 5;
    const validations = sut.field(fieldName).min(minLength).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)]);
  });

  it('should return a list of validations', () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(fieldName).required().min(minLength).email().build();
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new EmailValidation(),
    ]);
  });
});
