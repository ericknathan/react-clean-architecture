import { Authentication } from '@/domain/usecases/authentication';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    switch(httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return {
          accessToken: 'any_token',
        };
      case HttpStatusCode.UNAUTHORIZED: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }

    
  }
}
