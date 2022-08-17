import { faker } from '@faker-js/faker/locale/pt_BR';
import axios from 'axios';

import { AxiosHttpClient } from '@/infra/http/client/axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = () => new AxiosHttpClient();

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL', async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  })
})