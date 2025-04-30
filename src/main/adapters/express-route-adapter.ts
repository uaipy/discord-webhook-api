import { Controller } from '@app/application/controllers';
import { Request, Response } from 'express';

const statusCodesMap: Record<string, number> = {
  ok: 200,
  unknown: 500,
  'invalid-argument': 400,
  'not-found': 404,
  'already-exists': 409,
  aborted: 400,
  'out-of-range': 400,
  internal: 500,
  unavailable: 503,
};

export const adaptRoute =
  (controller: Controller) => async (request: Request, response: Response) => {
    const { body }: any = request;
    const { query }: any = request;
    const { params }: any = request;
    const httpRequest: any = { body, query, params };
    const httpResponse: any = await controller.handle(httpRequest);
    const statusCode: number = statusCodesMap[httpResponse.statusCode];
    response.status(statusCode).json(
      httpResponse.statusCode === 'ok'
        ? httpResponse.result
        : {
            error: httpResponse.result.message,
            code: httpResponse.statusCode,
          },
    );
  };
