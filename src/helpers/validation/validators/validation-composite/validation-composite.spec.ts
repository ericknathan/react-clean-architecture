import { faker } from '@faker-js/faker/locale/pt_BR';

import { FieldValidationStub } from '@/mocks/helpers';
import { ValidationComposite } from '@/helpers/validation/validators';

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const validationStub = new FieldValidationStub(fieldName);
    validationStub.error = new Error(faker.random.words());
    const validationStub2 = new FieldValidationStub(fieldName);
    validationStub2.error = new Error(faker.random.words());
    const sut = new ValidationComposite([
      validationStub,
      validationStub2,
    ]);
    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word(),
    });
    expect(error).toBe(validationStub.error.message);
  })
})