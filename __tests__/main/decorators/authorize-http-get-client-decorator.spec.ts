import { expect } from '@jest/globals';
import { GetStorageSpy, mockGetRequest } from "@/mocks/data";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";

describe('AuthorizeHttpGetClient Decorator', () => {
  it('should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('@4devs/account');
  });
});
