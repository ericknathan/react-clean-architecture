import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { HttpClient } from '@/mocks/data/mock-http-client';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpClient;
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpClient();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = 'any_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});