import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock<ValueType = any> implements SetStorage {
  key!: string;
  value!: ValueType;

  async set(key: string, value: ValueType): SetStorage.Result {
    this.key = key;
    this.value = value;
  }
}
