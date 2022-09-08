import { HttpResponse } from '.';

export interface HttpGetClient<BodyType = any, ResponseType = any> {
  get(params: HttpGetClient.Params<BodyType>): Promise<HttpGetClient.Response<ResponseType>>;
}

export namespace HttpGetClient {
  export type Params<BodyType = any> = {
    url: string;
    body?: BodyType;
    headers?: any;
  }
  export type Response<ResponseType = any> = HttpResponse<ResponseType>;
}
