import { RequiredFieldError } from '@app/application/errors';
import { Validator } from '@app/application/validation';

export class Required implements Validator {
  constructor(
    readonly value: unknown,
    readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fieldName);
    }
    return undefined;
  }
}
export class RequiredString extends Required {
  constructor(
    readonly value: string,
    readonly fieldName?: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() !== undefined || this.value === '') {
      return new RequiredFieldError(this.fieldName);
    }
    return undefined;
  }
}

export class RequiredNumber extends Required {
  constructor(
    readonly value: number,
    readonly fieldName?: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    const strNumber: string = this.value.toString();
    if (super.validate() !== undefined || Number.isNaN(parseInt(strNumber))) {
      return new RequiredFieldError(this.fieldName);
    }
    return undefined;
  }
}

export class RequiredBoolean extends Required {
  constructor(
    readonly value: boolean,
    readonly fieldName?: string,
  ) {
    super(value, fieldName);
  }

  validate(): Error | undefined {
    if (super.validate() !== undefined) {
      return new RequiredFieldError(this.fieldName);
    }
    return undefined;
  }
}
