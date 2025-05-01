import {
  SendMessageDiscord,
  SendMessageDiscordParams,
  SendMessageDiscordResult,
} from '@app/domain/contracts/gateways';
import { HttpPostClient } from '@app/infrastructure/http';
import { enviroments } from '@app/main/config/enviroments';
export class DiscordApi implements SendMessageDiscord {
  constructor(private readonly httpClient: HttpPostClient) {}
  async sendMessageDiscord(
    params: SendMessageDiscordParams,
  ): Promise<SendMessageDiscordResult> {
    return this.httpClient
      .post<boolean>({
        url: enviroments.DISCORD_WEBHOOK_URL,
        data: {
          content: params.content,
        },
      })
      .then((result: boolean) => ({
        response: result,
      }))
      .catch((error: unknown) => ({
        response: undefined,
        error,
      }));
  }
}
