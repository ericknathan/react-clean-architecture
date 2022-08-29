import { HttpResponse } from '.';

export interface HttpPostClient<BodyType = any, ResponseType = any> {
  post(params: HttpPostClient.Params<BodyType>): Promise<HttpPostClient.Response<ResponseType>>;
}

export namespace HttpPostClient {
  export type Params<BodyType = any> = {
    url: string;
    body?: BodyType;
  }
  export type Response<ResponseType = any> = HttpResponse<ResponseType>;
}
