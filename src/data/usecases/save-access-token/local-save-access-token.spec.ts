import { SetStorageStub } from '@/mocks/data';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageStub: SetStorageStub;
};

const makeSut = (): SutTypes => {
  const setStorageStub = new SetStorageStub();
  const sut = new LocalSaveAccessToken(setStorageStub);
  return { sut, setStorageStub };
};

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct value', () => {
    const { sut, setStorageStub } = makeSut();
    const accessToken = faker.datatype.uuid();
    sut.save(accessToken);
    expect(setStorageStub.key).toBe('@4devs/accessToken');
    expect(setStorageStub.value).toBe(accessToken);
  });
});
