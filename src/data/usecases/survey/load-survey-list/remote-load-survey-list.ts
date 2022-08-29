import { HttpGetClient } from '@/data/protocols/http/http-get-client';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    this.httpGetClient.get({
      url: this.url
    });
  }
}