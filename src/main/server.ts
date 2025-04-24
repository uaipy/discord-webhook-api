import app from './config/app';

async function main(): Promise<void> {
  app.listen(3333, () => {
    console.log(`Server is running on port http://localhost:3333`);
  });
}

main().catch((e: Error) => {
  throw e;
});
