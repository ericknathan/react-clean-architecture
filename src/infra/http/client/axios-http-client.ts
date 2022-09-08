import { HttpGetClient, HttpPostClient, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostClient.Params): Promise<HttpPostClient.Response> {
    let axiosPostResponse: AxiosResponse;

    try {
      axiosPostResponse = await axios.post(params.url, params.body);
    } catch(error) {
      axiosPostResponse = (error as AxiosError).response!;
    }

    return this.adapt(axiosPostResponse);
  }

  async get (params: HttpGetClient.Params): Promise<HttpGetClient.Response> {
    let axiosGetResponse: AxiosResponse;

    try {
      axiosGetResponse = await axios.get(params.url, { headers: params.headers });
    } catch(error) {
      axiosGetResponse = (error as AxiosError).response!;
    }
    
    return this.adapt(axiosGetResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
