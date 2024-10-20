import type { Database } from "@db/sqlite";
import type { JSRModuleDetails } from "@/services/jsr/index.ts";

export type Module = {
  id: number;
  registry: string;
  scope: string;
  name: string;
  version: string;
  created_at: string;
  updated_at: string;
};

export const createModulesTable = (db: Database) => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS modules (
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
    `CREATE INDEX IF NOT EXISTS idx_modules_scope_name ON modules (scope, name)`
  );
};

export const moduleTableExists = (db: Database) => {
  const stmt = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='modules'"
  );
  const result = stmt.get();
  return result !== undefined;
};

export const migrateModulesTable = async (
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

export const getModules = (db: Database): Module[] => {
  const stmt = db.prepare("SELECT * FROM modules");
  return stmt.all();
};

export const installJSRModule = (db: Database, module: JSRModuleDetails) => {
  const stmt = db.prepare(
    "INSERT INTO modules (registry, scope, name, version) VALUES (?, ?, ?, ?)"
  );
  stmt.run("jsr", module.scope, module.name, module.latestVersion);
};
