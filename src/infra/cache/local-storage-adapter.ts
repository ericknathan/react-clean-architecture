import { SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object): SetStorage.Result {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
