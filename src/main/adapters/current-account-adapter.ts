import { UnexpectedError } from "@/domain/errors";
import { Account } from "@/domain/models";
import { makeLocalStorageAdapter } from "../factories/cache";

export function setCurrentAccountAdapter(account: Account.Model): void {
  if(!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set('@4devs/account', account);
}