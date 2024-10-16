import { router } from "./router.ts";

export const serve = ({
  port = 3000,
  hostname = "localhost",
  handler = router,
  debug = false,
}: {
  port: number;
  hostname: string;
  handler?: (req: Request) => Promise<Response>;
  debug?: boolean;
}) => {
  const ac = new AbortController();

  const server = Deno.serve({
    port,
    hostname,
    handler,
    signal: ac.signal,
    onError(err) {
      if (debug) {
        console.error(err);
      }

      return new Response("Internal Server Error", { status: 500 });
    },
    onListen({ port, hostname }) {
      if (debug) {
        console.log(`Server started at http://${hostname}:${port}`);
      }
    },
  });

  const listener = () => {
    console.log("Interrupt received, shutting down...");
    ac.abort();
  };

  // Add SIGINT listener
  Deno.addSignalListener("SIGINT", listener);

  return server;
};
