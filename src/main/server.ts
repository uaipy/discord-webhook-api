import 'dotenv/config';

import app from '@app/main/config/app';
import { enviroments } from '@app/main/config/enviroments';

async function main(): Promise<void> {
  try {
    app.listen(enviroments.PORT, () => {
      console.log(
        `Server is running on port http://localhost:${enviroments.PORT}`,
      );
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}

main().catch((e: Error) => {
  throw e;
});
