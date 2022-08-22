import { AddAccount } from '@/domain/usecases';
import { mockAccountModel, mockAddAccountParams } from '@/mocks/domain';

export class AddAccountStub implements AddAccount {
  params: AddAccount.Params = mockAddAccountParams();
  account: AddAccount.Result = mockAccountModel();
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
