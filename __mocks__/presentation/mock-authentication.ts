import { Authentication } from '@/domain/usecases';
import { mockAccountModel, mockAuthentication } from '@/mocks/domain';

export class AuthenticationStub implements Authentication {
  params: Authentication.Params = mockAuthentication();
  account: Authentication.Result = mockAccountModel();
  
  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    return Promise.resolve(this.account);
  }

}