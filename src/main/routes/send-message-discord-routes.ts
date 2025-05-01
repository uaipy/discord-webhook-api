import { adaptRoute } from '@app/main/adapters';
import { makeDiscordSendController } from '@app/main/factories/application';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/send-alert', adaptRoute(makeDiscordSendController()));
};
