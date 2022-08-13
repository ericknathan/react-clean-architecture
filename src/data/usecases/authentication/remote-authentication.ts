import { Authentication } from '@/domain/usecases/authentication';
import { HttpPostClient } from '@/data/protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    await this.httpPostClient.post({ url: this.url, body: params });
    return {
      accessToken: 'any_token',
    }
  }
}
