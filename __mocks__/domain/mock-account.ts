import { Authentication } from '@/domain/usecases/authentication';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { AccountModel } from '@/domain/models';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.avatar(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
});