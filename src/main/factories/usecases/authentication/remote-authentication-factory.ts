import { RemoteAuthentication } from '@/data/usecases';
import { makeApiUrl, makeHttpClient } from '@/main/factories/http';
import { Authentication } from '@/domain/usecases';

export const makeRemoteAuthentication = (): Authentication => new RemoteAuthentication(makeApiUrl('/signin'), makeHttpClient());
