export interface SaveAccessToken {
  save: (accessToken: SaveAccessToken.Param) => SaveAccessToken.Result;
}

export namespace SaveAccessToken {
  export type Param = string | undefined;
  export type Result = Promise<void>
}
