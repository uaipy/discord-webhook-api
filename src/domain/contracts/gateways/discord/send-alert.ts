export interface SendMessageDiscord {
  sendMessageDiscord: (
    params: SendMessageDiscordParams,
  ) => Promise<SendMessageDiscordResult>;
}

export type SendMessageDiscordParams = {
  content: string;
};

export type SendMessageDiscordResult = {
  response: boolean | undefined;
  error?: unknown;
};
