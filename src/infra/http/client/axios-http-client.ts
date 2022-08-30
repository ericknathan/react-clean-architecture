import { HttpGetClient, HttpPostClient } from '@/data/protocols/http';
import axios, { AxiosError } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostClient.Params): Promise<HttpPostClient.Response> {
    let axiosPostResponse;

    try {
      axiosPostResponse = await axios.post(params.url, params.body);
    } catch(error) {
      axiosPostResponse = (error as AxiosError).response;
    }

    return {
      statusCode: axiosPostResponse!.status,
      body: axiosPostResponse!.data
    };
  }

  async get (params: HttpGetClient.Params): Promise<void> {
    await axios.get(params.url);
  }
}
