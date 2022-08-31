export interface GetStorage {
  get: (key: string) => GetStorage.Result;
}

export namespace GetStorage {
  export type Result = any | Error;
}
