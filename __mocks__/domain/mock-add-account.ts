import { faker } from '@faker-js/faker/locale/pt_BR';

import { AddAccount } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  }
}