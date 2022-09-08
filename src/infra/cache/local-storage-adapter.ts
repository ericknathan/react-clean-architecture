import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object | undefined | null): SetStorage.Result {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get (key: string): GetStorage.Result {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}
