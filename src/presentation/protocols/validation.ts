export interface Validation extends Validation.Properties {
  validate (params: Validation.Params): Validation.Result;
}

export namespace Validation {
  export type Params = {
    fieldName: string,
    fieldValue: string
  }
  export type Result = string | void;
  export type Properties = {
    errorMessage?: string;
  }
}
