import { parseArgs } from "jsr:@std/cli/parse-args";
import { serve } from "./src/server/index.ts";
import HelloWorld from "./pages/page.tsx";

const main = async () => {
  console.log("Starting server...");

  const args = parseArgs(Deno.args, {
    string: ["port", "hostname"],
    boolean: ["debug"],
    default: {
      port: 3000,
      hostname: "localhost",
    },
  });

  const server = serve({
    port: Number(args.port),
    hostname: args.hostname,
    debug: args.debug,
  });

  // Add SIGINT listener
  Deno.addSignalListener("SIGINT", () => {
    server.shutdown();
  });

  await server.finished;

  console.log("Server closed");

  Deno.exit(0);
};

if (import.meta.main) main();
