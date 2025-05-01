import { DiscordApi } from '@app/infrastructure/gateway';
import { makeDiscordAxiosHttpClient } from '@app/main/factories/infrastructure';

export const makeDiscordApi = (): DiscordApi => {
  return new DiscordApi(makeDiscordAxiosHttpClient());
};
