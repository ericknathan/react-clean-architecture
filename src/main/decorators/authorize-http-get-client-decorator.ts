import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  
  get(params: HttpGetClient.Params): Promise<HttpGetClient.Response> {
    const account = this.getStorage.get('@4devs/account');
    if(account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      });
    }
    return this.httpGetClient.get(params);
  }
}
