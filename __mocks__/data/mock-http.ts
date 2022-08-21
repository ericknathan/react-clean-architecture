import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export const mockPostRequest = (url = faker.internet.url()): HttpPostClient.Params<any> => ({
  url,
  body: faker.datatype.json()
});

export class HttpClient<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpPostClient.Response<R> = {
    statusCode: HttpStatusCode.OK,
  }

  async post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Response<R>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}