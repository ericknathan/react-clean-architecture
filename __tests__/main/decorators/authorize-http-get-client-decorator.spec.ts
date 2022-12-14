import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { GetStorageSpy, HttpClient, mockGetRequest } from "@/mocks/data";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { HttpGetClient } from 'data/protocols/http';
import { mockAccountModel } from '@/mocks/domain';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpClient;
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpClient();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  };
};

describe('AuthorizeHttpGetClient Decorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('@4devs/account');
  });

  it('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
      headers: faker.datatype.json()
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toBe(httpRequest.headers);
  });
  
  it('should not add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    });
  });
  
  it('should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpGetClient.Params = {
      url: faker.internet.url(),
      headers: { field }
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    });
  });
  
  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResponse = await sut.get(mockGetRequest());
    expect(httpResponse).toBe(httpGetClientSpy.response);
  });
});
