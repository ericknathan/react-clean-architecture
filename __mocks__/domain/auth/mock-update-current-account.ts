import { UpdateCurrentAccount } from '@/domain/usecases';

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account!: UpdateCurrentAccount.Params;
  
  async save (account: UpdateCurrentAccount.Params): UpdateCurrentAccount.Result {
    this.account = account;
  }
}
