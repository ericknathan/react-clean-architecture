import { faker } from '@faker-js/faker/locale/pt_BR';
import axios from 'axios';

import { AxiosHttpClient } from '@/infra/http/client/axios-http-client';
import { HttpPostClient } from 'data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = () => new AxiosHttpClient();
const mockPostRequest = (url = faker.internet.url()): HttpPostClient.Params<any> => ({
  url,
  body: faker.datatype.json()
})

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
