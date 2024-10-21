import { UntarStream } from "@std/tar/untar-stream";
import { dirname, normalize } from "@std/path";
import type { JSRModuleDetails } from "@/services/jsr/index.ts";
import {
  parseImportSpecifier,
  type ParsedImportSpecifier,
} from "@/modules/imports.ts";

interface DenoJson {
  imports: {
    [key: string]: string;
  };
}

export type WeblyModule = {
  name: string;
  description: string;
  type: "spa";
  dist: string;
  repository: string;
};

const isWeblyModule = (obj: { [key: string]: unknown }): obj is WeblyModule => {
  return (
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    obj.type === "spa" &&
    typeof obj.dist === "string" &&
    typeof obj.repository === "string"
  );
};

export const getModuleName = (module: JSRModuleDetails, version?: string) => {
  let name = `jsr:@${module.scope}/${module.name}`;

  if (typeof version !== "undefined") {
    name += `@${version}`;
  }

  return name;
};

export const installModule = async (
  module: JSRModuleDetails,
  version: string
): Promise<boolean> => {
  const name = getModuleName(module, version);

  const command = new Deno.Command("deno", {
    args: ["add", name],
  });

  const output = await command.spawn().output();

  if (output.code !== 0) {
    console.error(`Failed to install module ${name}`);
    return false;
  }

  return true;
};

export const uninstallModule = async (
  module: JSRModuleDetails
): Promise<boolean> => {
  const name = getModuleName(module);

  const command = new Deno.Command("deno", {
    args: ["remove", name],
  });

  const output = await command.spawn().output();

  if (output.code !== 0) {
    console.error(`Failed to install module ${name}`);
    return false;
  }

  return true;
};

export const downloadModuleDist = async (
  module: ParsedImportSpecifier,
  to: string
) => {
  const mod = await import(`@${module.scope}/${module.name}`);

  console.log(mod);

  if (typeof mod === "undefined") {
    throw new Error(`Module ${module.scope}/${module.name} not found`);
  }

  if (!isWeblyModule(mod?.weblyModule)) {
    throw new Error(
      `Module ${module.scope}/${module.name} is not a valid Webly module`
    );
  }

  const weblyModule = mod.weblyModule as WeblyModule;

  const fileName = weblyModule.dist.split("/").pop() || "downloaded_file";

  // Construct the GitHub download URL
  const downloadUrl = `${weblyModule.repository}/raw/main/${fileName}`;

  try {
    // Download the file
    const response = await fetch(downloadUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fileContent = await response.arrayBuffer();

    // Write the file to disk
    await Deno.mkdir("tmp", { recursive: true });
    await Deno.writeFile(`tmp/${fileName}`, new Uint8Array(fileContent));

    console.log(`File downloaded successfully: ${fileName}`);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }

  try {
    for await (const entry of (await Deno.open(`tmp/${fileName}`)).readable
      .pipeThrough(new DecompressionStream("gzip"))
      .pipeThrough(new UntarStream())) {
      const untarredPath = entry.path.replace("dist/", "");

      let path = normalize(to);
      if (untarredPath) {
        path = normalize(`${to}/${untarredPath}`);
      }

      await Deno.mkdir(dirname(path), { recursive: true });
      await entry.readable?.pipeTo((await Deno.create(path)).writable);
    }

    console.log("File unpacked successfully");
  } catch (error) {
    console.error("Error unpacking file:", error);
  }

  return;
};

export const getInstalledModules = async (): Promise<
  ParsedImportSpecifier[]
> => {
  const denoJson = await Deno.readTextFile(`${Deno.cwd()}/deno.json`);

  const denoJsonObj = JSON.parse(denoJson) as DenoJson;

  const modules = Object.values(denoJsonObj.imports)
    .map(parseImportSpecifier)
    .filter((imp) => imp !== null);

  return modules;
};

export const getInstalledModule = async ({
  scope,
  name,
}: {
  scope?: string;
  name: string;
}): Promise<ParsedImportSpecifier | null> => {
  const denoJson = await Deno.readTextFile(`${Deno.cwd()}/deno.json`);

  const denoJsonObj = JSON.parse(denoJson) as DenoJson;

  const module = Object.values(denoJsonObj.imports)
    .map(parseImportSpecifier)
    .find((imp) => {
      if (scope && imp?.scope !== scope) {
        return false;
      }

      return imp?.name === name;
    });

  return module ?? null;
};
