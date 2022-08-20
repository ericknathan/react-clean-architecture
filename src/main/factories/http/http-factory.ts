import { AxiosHttpClient } from '@/infra/http/client/axios-http-client';

export const makeHttpClient = () => new AxiosHttpClient();
