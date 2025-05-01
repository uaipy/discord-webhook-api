/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Validator } from '@app/application/validation';

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error: Error | undefined = validator.validate();
      if (error !== undefined) return error;
    }
    return undefined;
  }
}
