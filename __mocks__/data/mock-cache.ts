import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock implements SetStorage {
  key!: string;
  value!: object;

  set(key: string, value: object): SetStorage.Result {
    this.key = key;
    this.value = value;
  }
}
