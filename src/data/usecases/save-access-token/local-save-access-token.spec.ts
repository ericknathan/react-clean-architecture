import { SetStorageMock } from '@/mocks/data';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return { sut, setStorageMock };
};

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('@4devs/accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
  
  it('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.datatype.uuid());
    await expect(promise).rejects.toThrow()
  });
});
