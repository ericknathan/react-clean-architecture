export interface Validation<InputObject = object> {
  errorMessage: string;
  input: InputObject;
  
  validate (input: InputObject): string;
}
