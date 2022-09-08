import { HttpGetClient } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { makeLocalStorageAdapter } from "@/main/factories/cache";
import { makeHttpClient } from "@/main/factories/http";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient =>
  new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeHttpClient()
  );
