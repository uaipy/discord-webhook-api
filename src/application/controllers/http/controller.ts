import {
  badRequest,
  Request,
  Response,
  serverError,
} from '@app/application/helpers';
import { ValidationComposite, Validator } from '@app/application/validation';

export abstract class Controller<B = unknown, Q = unknown, P = unknown> {
  abstract perform(request: Request<B, Q, P>): Promise<Response>;

  buildBodyValidators(body: B): Validator[] {
    return [];
  }

  buildQueryValidators(query: Q): Validator[] {
    return [];
  }

  buildParamsValidators(params: P): Validator[] {
    return [];
  }

  async handle(httpRequest: {
    body: B;
    query?: Q;
    params?: P;
  }): Promise<Response> {
    const bodyError: Error | undefined = this.validate(
      httpRequest.body,
      this.buildBodyValidators,
    );
    if (bodyError !== undefined) return badRequest(bodyError);

    const queryError: Error | undefined = this.validate(
      httpRequest.query,
      this.buildQueryValidators,
    );
    if (queryError !== undefined) return badRequest(queryError);

    const paramsError: Error | undefined = this.validate(
      httpRequest.params,
      this.buildParamsValidators,
    );
    if (paramsError !== undefined) return badRequest(paramsError);

    try {
      return await this.perform({
        body: httpRequest.body,
        query: httpRequest.query,
        params: httpRequest.params,
      });
    } catch (error) {
      return serverError(error);
    }
  }

  private validate<T>(
    data: T,
    buildValidators: (data: T) => Validator[],
  ): Error | undefined {
    const validators: Validator[] = buildValidators(data);
    return new ValidationComposite(validators).validate();
  }
}
