import { ServerError } from '@app/application/errors';
import { SendMessageDiscordResult } from '@app/domain/contracts/gateways';
import { Alert } from '@app/domain/entities';
import { DiscordApi } from '@app/infrastructure/gateway';
import { formatAlertMessage } from '@app/utils';

export type DiscordAlertSendUseCase = (params: {
  orquestratorName: string;
  orquestratorId: string;
  data: {
    message: string;
  }[];
}) => Promise<boolean>;

type Setup = (discordApi: DiscordApi) => DiscordAlertSendUseCase;

export const setupDiscordAlertSendUseCase: Setup =
  (discordApi: DiscordApi) => async (params: Alert) => {
    const { orquestratorName, orquestratorId, data }: Alert = params;

    const message: string = formatAlertMessage({
      alert: {
        orquestratorName,
        orquestratorId,
        data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      roleId: process.env.DISCORD_ROLE_ID,
    });


    const messageHasSent: SendMessageDiscordResult =
      await discordApi.sendMessageDiscord({
        content: message,
      });

    if (messageHasSent.error) {
      throw new ServerError('Error sending message to Discord');
    }

    return messageHasSent.response;
  };
