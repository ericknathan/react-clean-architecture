import { Account } from "@/domain/models";

export interface UpdateCurrentAccount {
  save: (account: UpdateCurrentAccount.Params) => UpdateCurrentAccount.Result;
}

export namespace UpdateCurrentAccount {
  export type Params = Account.Model | undefined;
  export type Result = Promise<void>
}
