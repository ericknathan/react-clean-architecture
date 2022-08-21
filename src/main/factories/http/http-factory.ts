import { AxiosHttpClient } from '@/infra/http/client';

export const makeHttpClient = () => new AxiosHttpClient();
