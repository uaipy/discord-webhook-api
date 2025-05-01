import {
  Controller,
  DiscordSendController,
} from '@app/application/controllers';
import { makeDiscordAlertSendUseCase } from '@app/main/factories/domain/use-cases';

export const makeDiscordSendController = (): Controller =>
  new DiscordSendController(makeDiscordAlertSendUseCase());
