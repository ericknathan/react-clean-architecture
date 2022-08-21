export interface SetStorage<V = any> {
  set: (key: string, value: V) => SetStorage.Result;
}

export namespace SetStorage {
  export type Result = Promise<void>;
}
