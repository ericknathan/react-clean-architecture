import { Authentication } from '@/domain/usecases/authentication';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.avatar(),
})