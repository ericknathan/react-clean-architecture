import { Account } from "@/domain/models";
import { makeLocalStorageAdapter } from "@/main/factories/cache";

export function setCurrentAccountAdapter(account: Account.Model): void {
  makeLocalStorageAdapter().set('@4devs/account', account);
}

export function getCurrentAccountAdapter(): Account.Model | null {
  return makeLocalStorageAdapter().get('@4devs/account');
}
