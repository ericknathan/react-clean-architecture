import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  
  get(params: HttpGetClient.Params): Promise<HttpGetClient.Response> {
    this.getStorage.get('@4devs/account');
    return this.httpGetClient.get(params);
  }
}
