import { expect } from '@jest/globals';
import { GetStorageSpy, mockGetRequest } from "@/mocks/data";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

  return {
    sut,
    getStorageSpy,
  };
};

describe('AuthorizeHttpGetClient Decorator', () => {
  it('should call GetStorage with correct value', () => {
    const { sut, getStorageSpy } = makeSut();
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('@4devs/account');
  });
});
