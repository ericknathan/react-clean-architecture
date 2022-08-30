import { expect } from '@jest/globals';
import { SetStorageMock } from '@/mocks/data';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { LocalUpdateCurrentAccount } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return { sut, setStorageMock };
};

describe('LocalUpdateCurrentAccount', () => {
  it('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = {
      accessToken:  faker.datatype.uuid(),
      name: faker.name.firstName(),
    }
    await sut.save(account);
    expect(setStorageMock.key).toBe('@4devs/account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });
  
  it('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save({
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName(),
    });
    await expect(promise).rejects.toThrow();
  });
  
  it('should throw if account is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});