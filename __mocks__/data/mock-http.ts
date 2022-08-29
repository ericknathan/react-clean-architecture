import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export const mockPostRequest = (url = faker.internet.url()): HttpPostClient.Params<any> => ({
  url,
  body: faker.datatype.json()
});

export class HttpClient<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
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
}
