import { GetStorage } from '@/data/protocols/cache';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class GetStorageSpy implements GetStorage {
  key!: string;
  value = faker.datatype.json();

  get(key: string): GetStorage.Result {
    this.key = key;
    return this.value;
  }
}
