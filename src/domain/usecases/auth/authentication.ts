import { Account } from '@/domain/models/account-model';

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  }

  export type Result = Account.Model
}
