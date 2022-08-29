import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpGetClient, HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export const mockPostRequest = (url = faker.internet.url()): HttpPostClient.Params => ({
  url,
  body: faker.datatype.json()
});

export const mockGetRequest = (url = faker.internet.url()): HttpGetClient.Params => ({
  url,
  body: faker.datatype.json()
});

export class HttpClient<BodyType = any, ResponseType = any> implements
  HttpPostClient<BodyType, ResponseType>,
  HttpGetClient<BodyType, ResponseType> {
  url?: string;
  body?: BodyType;
  response: HttpPostClient.Response<ResponseType> = {
    statusCode: HttpStatusCode.OK,
  };

  async post(params: HttpPostClient.Params<BodyType>): Promise<HttpPostClient.Response<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }

  async get(params: HttpGetClient.Params<BodyType>): Promise<HttpGetClient.Response<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}
