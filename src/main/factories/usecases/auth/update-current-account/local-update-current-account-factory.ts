import { LocalUpdateCurrentAccount } from '@/data/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalUpdateCurrentAccount = () => new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
