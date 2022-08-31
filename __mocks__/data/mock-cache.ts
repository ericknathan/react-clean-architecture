import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock<ValueType = any> implements SetStorage {
  key!: string;
  value!: ValueType;

  set(key: string, value: ValueType): SetStorage.Result {
    this.key = key;
    this.value = value;
  }
}
