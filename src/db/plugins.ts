import type { Database } from "@db/sqlite";
import type { JSRPackageDetails } from "@/services/jsr/index.ts";

export type Plugin = {
  id: number;
  registry: string;
  scope: string;
  name: string;
  version: string;
  created_at: string;
  updated_at: string;
};

export const createPluginsTable = (db: Database) => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS plugins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registry TEXT NOT NULL,
      scope TEXT NOT NULL,
      name TEXT NOT NULL,
      version TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );

  db.exec(
    `CREATE INDEX IF NOT EXISTS idx_plugins_scope_name ON plugins (scope, name)`
  );
};

export const pluginTableExists = (db: Database) => {
  const stmt = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='plugins'"
  );
  const result = stmt.get();
  return result !== undefined;
};

export const migratePluginsTable = async (
  db: Database,
  currentVersion: number,
  targetVersion: number
): Promise<void> => {
  const migrations: {
    [version: string]: () => Promise<void>;
  } = {};

  for (let i = currentVersion; i < targetVersion; i++) {
    const migration = migrations[i.toString()];
    if (!migration) {
      continue;
    }
    await migrations[i.toString()]();
  }
};

export const getPlugins = (db: Database): Plugin[] => {
  const stmt = db.prepare("SELECT * FROM plugins");
  return stmt.all();
};

export const installJSRPlugin = (db: Database, plugin: JSRPackageDetails) => {
  const stmt = db.prepare(
    "INSERT INTO plugins (registry, scope, name, version) VALUES (?, ?, ?, ?)"
  );
  stmt.run("jsr", plugin.scope, plugin.name, plugin.latestVersion);
};
