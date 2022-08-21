import { SetStorage } from '@/data/protocols/cache';

export class SetStorageStub<V = any> implements SetStorage {
  key!: string;
  value!: V;

  async set(key: string, value: V): SetStorage.Result {
    this.key = key;
    this.value = value;
  }
}
