import { parseArgs } from "@std/cli/parse-args";
import { createRequestHandler, hmrClient } from "@webly/router";
import { serve } from "@/server/index.ts";
import { db } from "@/db/index.ts";
import { compileTailwindCSS } from "@/styling/index.ts";

let watcher: Deno.FsWatcher | undefined;

const main = async () => {
  console.log("Starting server...");

  const args = parseArgs(Deno.args, {
    string: ["port", "hostname", "db"],
    boolean: ["debug", "tls"],
    default: {
      port: 3000,
      hostname: "localhost",
      db: "webly.db",
      tls: false,
    },
  });

  if (args.debug) {
    Deno.env.set("DEBUG", "true");
    watch();
  }

  await db.connect(args.db);

  await compileTailwindCSS();

  const requestHandler = createRequestHandler({ basePath: Deno.cwd() });

  const server = await serve({
    port: args.tls ? 443 : Number(args.port),
    hostname: args.hostname,
    handler: requestHandler,
    debug: args.debug,
  });

  // Add SIGINT listener
  Deno.addSignalListener("SIGINT", () => {
    server.shutdown();
    db.close();
    watcher?.close();
  });

  await server.finished;

  console.log("Server closed");

  Deno.exit(0);
};

const watch = async () => {
  watcher = Deno.watchFs("./pages", { recursive: true });

  for await (const event of watcher) {
    hmrClient.reload();
  }
};

if (import.meta.main) main();
