import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { makeApiUrl, makeHttpClient } from '@/main/factories/http';
import { Authentication } from '@/domain/usecases';

export const makeRemoteAuthentication = (): Authentication => new RemoteAuthentication(makeApiUrl('/login'), makeHttpClient());