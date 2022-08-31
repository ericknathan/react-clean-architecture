import { Validation } from "@/presentation/protocols";

export class ValidationStub implements Validation {
  errorMessage = '';

  validate(): Validation.Result {
    return this.errorMessage;
  }
}
