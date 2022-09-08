import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { Survey } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
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
      case HttpStatusCode.NO_CONTENT: return [];
      case HttpStatusCode.FORBIDDEN: throw new AccessDeniedError();
      default: throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Result = Survey.Model[];
}
