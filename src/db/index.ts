import { Database } from "@db/sqlite";

export const connect = async (path = "webly.db") => {
  const dataDir = `${Deno.cwd()}/data`;

  try {
    await Deno.stat(dataDir);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.mkdir(dataDir);
    }
  }

  const db = new Database(`${dataDir}/${path}`);

  return db;
};
