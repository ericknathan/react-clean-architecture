import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpClient } from '@/mocks/data';
import { RemoteLoadSurveyList } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockSurveyListModel } from '@/mocks/domain';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpClient;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
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

  it('should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw EmailInUseError if HttpClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw EmailInUseError if HttpClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  
  it('should return a list of SurveyModel if HttpClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual(httpResult);
  });
});
