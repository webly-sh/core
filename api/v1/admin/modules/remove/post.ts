import { redirect } from "@webly/router";
import { getJSRModuleDetails } from "@/services/jsr/index.ts";
import { uninstallModule } from "@/modules/index.ts";
import { restartServer } from "@/server/index.ts";

export const route = async (req: Request): Promise<Response> => {
  const formData = await req.formData();
  const scope = formData.get("scope")?.toString();
  const name = formData.get("name")?.toString();

  if (!scope || !name) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const moduleDetails = await getJSRModuleDetails(scope, name);

    const installed = await uninstallModule(moduleDetails);

    if (!installed) {
      throw new Error("Failed to uninstall module");
    }

    restartServer();
  } catch (_) {
    return new Response("Failed to uninstall module", { status: 500 });
  }

  return redirect("/admin/modules");
};
