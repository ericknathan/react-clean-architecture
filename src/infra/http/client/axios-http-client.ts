import { HttpPostClient } from '@/data/protocols/http';
import axios, { Axios, AxiosError } from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostClient.Params<any>): Promise<HttpPostClient.Response<any>> {
    let httpResponse;

    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch(error) {
      httpResponse = (error as AxiosError).response;
    }

    return {
      statusCode: httpResponse!!.status,
      body: httpResponse!!.data
    }
  }
}