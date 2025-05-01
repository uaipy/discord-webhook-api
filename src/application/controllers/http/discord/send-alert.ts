import { Controller } from '@app/application/controllers/http';
import { notFound, ok, Request, Response } from '@app/application/helpers';
import { ValidationBuilder, Validator } from '@app/application/validation';
import { NoDataFoundError } from '@app/domain/entities/errors';
import { DiscordAlertSendUseCase } from '@app/domain/use-cases';

type Model = Error | boolean;

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IHttpRequestBody {
  orquestratorName: string;
  orquestratorId: string;
  data: {
    message: string;
  }[];
}

export class DiscordSendAlertController extends Controller<IHttpRequestBody> {
  constructor(private readonly DiscordAlertSendUseCase: DiscordAlertSendUseCase) {
    super();
  }

  async perform({ body }: Request<IHttpRequestBody>): Promise<Response<Model>> {
    try {
      await this.DiscordAlertSendUseCase({
        ...body,
      });
      return ok(true);
    } catch (error) {
      if (error instanceof NoDataFoundError) return notFound(error);
      throw error;
    }
  }

  buildBodyValidators({
    data,
    orquestratorId,
    orquestratorName,
  }: IHttpRequestBody): Validator[] {
    return [
      ...ValidationBuilder.of({
        value: orquestratorName,
        fieldName: 'orquestratorName',
      })
        .required()
        .build(),
      ...ValidationBuilder.of({
        value: orquestratorId,
        fieldName: 'orquestratorId',
      })
        .required()
        .build(),
      ...ValidationBuilder.of({
        value: data,
        fieldName: 'data',
      })
        .required()
        .build(),
    ];
  }
}
