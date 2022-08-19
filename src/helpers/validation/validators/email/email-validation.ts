import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class EmailValidation implements FieldValidation {
  validate(value: string): Error | null {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError('email');
  }
}