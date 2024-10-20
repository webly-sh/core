import { fileExists } from "@/utils.ts";
import { getInstalledModule } from "@/modules/index.ts";
import { downloadModuleDist } from "@/modules/index.ts";

export const setupEditor = async () => {
  // check if editor is installed
  if (await fileExists(`${Deno.cwd()}/pages/admin/pages/editor/index.html`)) {
    await Deno.remove(`${Deno.cwd()}/pages/admin/pages/editor`, {
      recursive: true,
    });
  }

  try {
    const installedModule = await getInstalledModule({
      scope: "webly",
      name: "editor",
    });

    if (!installedModule) {
      throw new Error("Editor module not found");
    }

    await downloadModuleDist(
      installedModule,
      `${Deno.cwd()}/pages/admin/pages/editor`
    );
  } catch (error) {
    console.error("Failed to setup editor", error);
  }
};
