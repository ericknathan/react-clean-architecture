import { HttpResponse } from '.';

export interface HttpPostClient<BodyType, ResponseType> {
  post(params: HttpPostClient.Params<BodyType>): Promise<HttpPostClient.Response<ResponseType>>;
}

export namespace HttpPostClient {
  export type Params<BodyType> = {
    url: string;
    body?: BodyType;
  }
  export type Response<ResponseType> = HttpResponse<ResponseType>;
}
