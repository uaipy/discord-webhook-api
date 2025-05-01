import { AxiosHttpClient } from '@app/infrastructure/http';
import { enviroments } from '@app/main/config/enviroments';

export const makeDiscordAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient({
    baseURL: enviroments.DISCORD_BASE_URL,
    headers: {},
  });
};
