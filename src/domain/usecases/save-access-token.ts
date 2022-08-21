export interface SaveAccessToken {
  save: (accessToken: SaveAccessToken.Param) => SaveAccessToken.Result;
}

export namespace SaveAccessToken {
  export type Param = string;
  export type Result = Promise<void>
}
