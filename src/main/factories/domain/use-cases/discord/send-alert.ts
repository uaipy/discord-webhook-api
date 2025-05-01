import {
  DiscordAlertSendUseCase,
  setupDiscordAlertSendUseCase,
} from '@app/domain/use-cases';
import { makeDiscordApi } from '@app/main/factories/infrastructure/gateways';

export const makeDiscordAlertSendUseCase = (): DiscordAlertSendUseCase =>
  setupDiscordAlertSendUseCase(makeDiscordApi());
