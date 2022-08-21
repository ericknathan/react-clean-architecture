import { faker } from '@faker-js/faker/locale/pt_BR';
import 'jest-localstorage-mock';

import { LocalStorageAdapter } from '@/infra/cache';

const makeSut = () => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should call localStorage with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value);
  });
});
