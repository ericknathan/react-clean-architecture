import { HttpResponse } from '.';

export interface HttpPostClient<T, R> {
  post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Response<R>>;
}

export namespace HttpPostClient {
  export type Params<T> = {
    url: string;
    body?: T;
  }
  export type Response<R> = HttpResponse;
}