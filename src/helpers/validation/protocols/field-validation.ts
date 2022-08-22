export interface FieldValidation extends FieldValidation.Properties {
  validate: (input: FieldValidation.Params) => FieldValidation.Result;
}

export namespace FieldValidation {
  export type Params = {
    [key: string]: any;
  };
  export type Result = Error | null;
  export type Properties = {
    field?: string;
  }
}
