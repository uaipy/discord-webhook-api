import { EnvironmentValues } from '@app/domain/entities/enviroments';

export const enviroments: EnvironmentValues = {
  DISCORD_BASE_URL: process.env.DISCORD_BASE_URL,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  PORT: Number(process.env.PORT),
};
