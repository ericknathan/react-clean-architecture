import { faker } from '@faker-js/faker/locale/pt_BR';

import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { HttpClient } from '@/mocks/data/mock-http-client';
import { mockAuthentication } from '@/mocks/domain/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpClient;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpClient();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
  
  it('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  });
  
  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  });
});