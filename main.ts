import { parseArgs } from "@std/cli/parse-args";
import { serve } from "./src/server/index.ts";
import { connect } from "./src/db/index.ts";

const main = async () => {
  console.log("Starting server...");

  const args = parseArgs(Deno.args, {
    string: ["port", "hostname", "db"],
    boolean: ["debug"],
    default: {
      port: 3000,
      hostname: "localhost",
      db: "webly.db",
    },
  });

  const db = await connect(args.db);

  const server = await serve({
    port: Number(args.port),
    hostname: args.hostname,
    debug: args.debug,
  });

  // Add SIGINT listener
  Deno.addSignalListener("SIGINT", () => {
    server.shutdown();
    db.close();
  });

  await server.finished;

  console.log("Server closed");

  Deno.exit(0);
};

if (import.meta.main) main();
