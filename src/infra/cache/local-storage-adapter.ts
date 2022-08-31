import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): SetStorage.Result {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get (key: string): GetStorage.Result {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}
