export interface FieldValidation extends FieldValidation.Properties {
  validate: (value: FieldValidation.Params) => FieldValidation.Result;
}

export namespace FieldValidation {
  export type Params = string;
  export type Result = Error | null;
  export type Properties = {
    field?: string;
  }
}
