/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Required,
  RequiredBoolean,
  RequiredNumber,
  RequiredString,
  Validator,
} from '@app/application/validation';

export type RequiredPropsType = Array<{
  field: string;
  type: 'string' | 'email' | 'number' | 'enum' | 'boolean';
}>;

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = [],
  ) {}

  static of({
    value,
    fieldName,
  }: {
    value: any;
    fieldName?: string;
  }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(): this {
    if (typeof this.value === 'number') {
      this.validators.push(new RequiredNumber(this.value, this.fieldName));
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName));
    } else if (typeof this.value === 'boolean') {
      this.validators.push(new RequiredBoolean(this.value, this.fieldName));
    } else {
      this.validators.push(new Required(this.value, this.fieldName));
    }
    return this;
  }

  requiredProps({ validate }: { validate: RequiredPropsType }): this {
    // para validar como objeto {}
    validate.forEach(({ field, type }: { field: string; type: string }) => {
      if (type === 'number') {
        this.validators.push(
          new RequiredNumber(this.value[field], `${this.fieldName}.${field}`),
        );
      } else if (type === 'string') {
        this.validators.push(
          new RequiredString(this.value[field], `${this.fieldName}.${field}`),
        );
      } else if (type === 'boolean') {
        this.validators.push(
          new RequiredBoolean(this.value[field], `${this.fieldName}.${field}`),
        );
      } else {
        this.validators.push(
          new Required(this.value[field], `${this.fieldName}.${field}`),
        );
      }
    });

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
