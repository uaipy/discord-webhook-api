/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from '@app/application/errors';

type FunctionsErrorCode =
  | 'ok'
  | 'unknown'
  | 'invalid-argument'
  | 'not-found'
  | 'already-exists'
  | 'aborted'
  | 'out-of-range'
  | 'internal'
  | 'unavailable';

export interface Response<T = any> {
  statusCode: FunctionsErrorCode;
  result: T;
}

export interface Request<B = any, Q = any, P = any> {
  body: B;
  query?: Q;
  params?: P;
}

export const ok = <T = any>(result: T): Response<T> => ({
  statusCode: 'ok',
  result,
});

export const badRequest = (error: Error): Response<Error> => ({
  statusCode: 'invalid-argument',
  result: error,
});

export const notFound = (error: any): Response<Error> => ({
  statusCode: 'not-found',
  result: error,
});

export const dataAlreadyExists = (error: any): Response<Error> => ({
  statusCode: 'already-exists',
  result: error,
});

export const serverError = (error: any): Response<Error> => ({
  statusCode: 'internal',
  result: new ServerError(
    error instanceof Error ? error : JSON.stringify(error),
  ),
});
