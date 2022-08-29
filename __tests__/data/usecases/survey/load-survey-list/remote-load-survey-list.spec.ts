import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpClient } from '@/mocks/data';
import { RemoteLoadSurveyList } from '@/data/usecases';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpClient;
}

const makeSut = (url: string): SutTypes => {
  const httpGetClientSpy = new HttpClient();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url)
  });
});
