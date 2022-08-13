import { HttpPostClient } from '@/data/protocols/http/http-post-client';

export class HttpClient implements HttpPostClient {
  url?: string;

  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result> {
    this.url = params.url;
  }
}