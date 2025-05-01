export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const globalRequired: string = 'BACKEND_ERRORS.VALIDATION.REQUIRED_FIELD';
    const message: string = !fieldName
      ? `${globalRequired}.ANY`
      : `${globalRequired}.${fieldName.toUpperCase()}`;
    super(message);
    this.name = 'RequiredFieldError';
  }
}
