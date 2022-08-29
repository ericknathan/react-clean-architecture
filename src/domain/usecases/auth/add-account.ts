import { Account } from '@/domain/models';

export interface AddAccount {
  add(params: AddAccount.Params): Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
  }

  export type Result = Account.Model
}
