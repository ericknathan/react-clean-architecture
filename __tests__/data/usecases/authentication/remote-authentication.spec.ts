import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';

const makeHttpPostClient = (): HttpPostClient => {
  class HttpClient implements HttpPostClient {
    url?: string;
  
    async post(url: string): Promise<void> {
      this.url = url;
    }
  }

  return new HttpClient();
}

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClient: HttpPostClient;
}

const makeSut = (url: string): SutTypes => {
  const httpPostClient = makeHttpPostClient();
  const sut = new RemoteAuthentication(url, httpPostClient);

  return {
    sut,
    httpPostClient
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = 'any_url';
    const { sut, httpPostClient } = makeSut(url);
    await sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});