import { HttpPostClient } from '@/data/protocols/http';
import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, AccountModel>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    return Promise.resolve({} as AccountModel);
  }
}
