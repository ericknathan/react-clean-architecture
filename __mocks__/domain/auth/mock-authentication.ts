import { faker } from '@faker-js/faker/locale/pt_BR';

import { Authentication } from '@/domain/usecases';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.avatar(),
});

export const mockAccountModel = (): Authentication.Result => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.firstName(),
});
