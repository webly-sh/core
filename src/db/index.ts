import { Database } from "@db/sqlite";
import {
  createPluginsTable,
  migratePluginsTable,
  pluginTableExists,
} from "./plugins.ts";

export class DB {
  private _db?: Database;
  private version = 0;

  async connect(path = "webly.db") {
    const dataDir = `${Deno.cwd()}/data`;

    // create data directory
    try {
      await Deno.stat(dataDir);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.mkdir(dataDir);
      }
    }

    // create version file
    try {
      await Deno.stat(`${dataDir}/version`);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.writeTextFile(`${dataDir}/version`, this.version.toString());
      }
    }

    // read version file
    let currentVersion: number = this.version;
    try {
      currentVersion = parseInt(await Deno.readTextFile(`${dataDir}/version`));
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.writeTextFile(`${dataDir}/version`, this.version.toString());
      }
    }

    this._db = new Database(`${dataDir}/${path}`);

    if (!pluginTableExists(this._db)) {
      console.log("Plugins table does not exist, creating...");
      await createPluginsTable(this._db);
    }

    if (currentVersion < this.version) {
      console.log(
        `Updating database from ${currentVersion} to ${this.version}`
      );
      await migratePluginsTable(this._db, currentVersion, this.version);
    }

    return this._db;
  }

  async close() {
    await this._db?.close();
  }

  get db(): Database {
    if (!this._db) {
      throw new Error("Database not connected");
    }
    return this._db;
  }
}

export const db = new DB();
