import { Authentication } from '@/domain/usecases';
import { mockAccountModel, mockAuthenticationParams } from '@/mocks/domain';

export class AuthenticationStub implements Authentication {
  params: Authentication.Params = mockAuthenticationParams();
  account: Authentication.Result = mockAccountModel();
  callsCount = 0;
  
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }

}
