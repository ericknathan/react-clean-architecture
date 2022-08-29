import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { Survey } from '@/domain/models';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteLoadSurveyList.Result>
  ) {}

  async loadAll (): Promise<RemoteLoadSurveyList.Result> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
    });

    
    switch(httpResponse.statusCode) {
      case HttpStatusCode.OK: return httpResponse.body!;
      default: throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Result = Survey.Model[];
}