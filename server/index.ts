import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { AppRouter } from "./router";

const server = createHTTPServer({
  router: AppRouter,
});

server.listen(3000);