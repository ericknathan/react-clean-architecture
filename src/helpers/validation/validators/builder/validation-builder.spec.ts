import { faker } from '@faker-js/faker/locale/pt_BR';

import { 
  ValidationBuilder as sut,
  RequiredFieldValidation
} from '@/helpers/validation/validators';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  })
})