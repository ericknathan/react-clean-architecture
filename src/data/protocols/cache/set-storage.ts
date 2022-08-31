export interface SetStorage {
  set: (key: string, value: object) => SetStorage.Result;
}

export namespace SetStorage {
  export type Result = void | Error;
}
