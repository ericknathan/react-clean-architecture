import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { HttpClient } from '@/mocks/data/mock-http-client';
import { faker } from '@faker-js/faker/locale/pt_BR';

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
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});