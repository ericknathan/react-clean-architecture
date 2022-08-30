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

  async get (params: HttpGetClient.Params): Promise<HttpGetClient.Response> {
    let axiosGetResponse;

    try {
      axiosGetResponse = await axios.get(params.url);
    } catch(error) {
      axiosGetResponse = (error as AxiosError).response;
    }
    return {
      statusCode: axiosGetResponse!.status,
      body: axiosGetResponse!.data
    };
  }
}
