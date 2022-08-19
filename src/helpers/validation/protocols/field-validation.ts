export interface FieldValidation {
  readonly field?: string;
  validate: (value: string) => Error | null;
}