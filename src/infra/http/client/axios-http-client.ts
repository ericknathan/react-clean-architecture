import { HttpPostClient } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostClient.Params<any>): Promise<HttpPostClient.Response<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}