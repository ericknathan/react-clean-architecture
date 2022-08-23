export interface Validation extends Validation.Properties {
  validate (params: Validation.Params): Validation.Result;
}

export namespace Validation {
  export type Params = {
    fieldName: string,
    input: {
      [key: string]: any;
    }
  }
  export type Result = string | void;
  export type Properties = {
    errorMessage?: string;
  }
}
