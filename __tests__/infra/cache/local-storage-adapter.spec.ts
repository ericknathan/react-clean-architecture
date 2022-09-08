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

  it('should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const account: Account.Model = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    };

    sut.set(key, account);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(account));
  });

  it('should call localStorage.removeItem if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();

    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(key);
  });

  it('should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value: Account.Model = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    };
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
