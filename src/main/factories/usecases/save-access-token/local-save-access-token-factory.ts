import { LocalSaveAccessToken } from '@/data/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalSaveAccessToken = () => new LocalSaveAccessToken(makeLocalStorageAdapter());