import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';
import 'jest-localstorage-mock';

import { LocalStorageAdapter } from '@/infra/cache';
import { Account } from '@/domain/models';

const makeSut = () => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should call localStorage with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const account: Account.Model = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    };

    sut.set(key, account);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(account));
  });
});
