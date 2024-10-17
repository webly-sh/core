import { parseArgs } from "@std/cli/parse-args";
import { serve } from "./src/server/index.ts";
import { connect } from "./src/db/index.ts";
import { compileTailwindCSS } from "./src/styling/index.ts";
import { hmrClient } from "./src/hmr/index.ts";

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
    watch();
  }

  const db = await connect(args.db);

  await compileTailwindCSS();

  const server = await serve({
    port: args.tls ? 443 : Number(args.port),
    hostname: args.hostname,
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
