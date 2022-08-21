import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock<V = any> implements SetStorage {
  key!: string;
  value!: V;

  async set(key: string, value: V): SetStorage.Result {
    this.key = key;
    this.value = value;
  }
}
