export interface HttpPostClient {
  url?: string;
  post(params: HttpPostClient.Params): Promise<HttpPostClient.Result>;
}

export namespace HttpPostClient {
  export type Params = {
    url: string;
    body?: any;
  }

  export type Result = void;
}