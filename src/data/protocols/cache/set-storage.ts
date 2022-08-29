export interface SetStorage<ValueType = any> {
  set: (key: string, value: ValueType) => SetStorage.Result;
}

export namespace SetStorage {
  export type Result = Promise<void>;
}
