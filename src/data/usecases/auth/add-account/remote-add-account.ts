import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AddAccount } from '@/domain/usecases';
import { EmailInUseError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, AccountModel>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    switch(httpResponse.statusCode) {
      case HttpStatusCode.FORBIDDEN: throw new EmailInUseError();
      default: return {} as AddAccount.Result;
    }
  }
}
