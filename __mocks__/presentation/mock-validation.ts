import { Validation } from "@/presentation/protocols";

export class ValidationStub implements Validation {
  errorMessage = '';

  validate({ fieldName, input }: Validation.Params): Validation.Result {
    return this.errorMessage;
  }
}
