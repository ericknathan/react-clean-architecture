import { expect } from '@jest/globals';
import axios from 'axios';

import { mockAxios, mockHttpResponse } from '@/mocks/infra';
import { mockGetRequest, mockPostRequest } from '@/mocks/data';
import { AxiosHttpClient } from '@/infra/http/client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios
  };
};

describe('AxiosHttpClient', () => {
  describe('[POST]', () => {
    it('should call axios.post with correct values', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });
    
    it('should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse.body).toEqual(axiosResponse.data);
      expect(httpResponse.statusCode).toEqual(axiosResponse.status);
    });
    
    it('should return correct error on axios.post failure', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });
  
  describe('[GET]', () => {
    it('should call axios.get with correct values', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers });
    });
    
    it('should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse.body).toEqual(axiosResponse.data);
      expect(httpResponse.statusCode).toEqual(axiosResponse.status);
    });
    
    it('should return correct error on axios.get failure', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
