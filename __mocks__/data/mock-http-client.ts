import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export class HttpClient implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpPostClient.Result = {
    statusCode: HttpStatusCode.NO_CONTENT,
  }

  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}