import { RemoteAddAccount } from '@/data/usecases';
import { makeApiUrl, makeHttpClient } from '@/main/factories/http';
import { AddAccount } from '@/domain/usecases';

export const makeRemoteAddAccount = (): AddAccount => new RemoteAddAccount(makeApiUrl('/signup'), makeHttpClient());
