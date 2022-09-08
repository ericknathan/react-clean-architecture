import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}
  
  get(params: HttpGetClient.Params): Promise<HttpGetClient.Response> {
    this.getStorage.get('@4devs/account');
    return null as any;
  }
}
