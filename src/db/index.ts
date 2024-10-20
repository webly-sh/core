import { Database } from "@db/sqlite";
import {
  createModulesTable,
  migrateModulesTable,
  moduleTableExists,
} from "./modules.ts";

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

    if (!moduleTableExists(this._db)) {
      console.log("Modules table does not exist, creating...");
      await createModulesTable(this._db);
    }

    if (currentVersion < this.version) {
      console.log(
        `Updating database from ${currentVersion} to ${this.version}`
      );
      await migrateModulesTable(this._db, currentVersion, this.version);
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
