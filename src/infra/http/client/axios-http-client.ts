import { HttpPostClient } from '@/data/protocols/http';
import axios, { AxiosError } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostClient.Params): Promise<HttpPostClient.Response> {
    let httpResponse;

    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch(error) {
      httpResponse = (error as AxiosError).response;
    }

    return {
      statusCode: httpResponse!.status,
      body: httpResponse!.data
    };
  }
}
