import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export class HttpClient<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpPostClient.Response<R> = {
    statusCode: HttpStatusCode.OK,
  }

  async post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Response<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}