import { HttpGetClient } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { makeLocalStorageAdapter } from "../cache";
import { makeHttpClient } from "../http";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient =>
  new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeHttpClient()
  );
