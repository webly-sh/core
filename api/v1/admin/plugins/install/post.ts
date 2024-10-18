import { db } from "../../../../../src/db/index.ts";
import { installJSRPlugin } from "../../../../../src/db/plugins.ts";
import { redirect } from "../../../../../src/pages/index.ts";
import { getJSRPackageDetails } from "../../../../../src/services/jsr/index.ts";

export const route = async (req: Request): Promise<Response> => {
  const formData = await req.formData();
  const scope = formData.get("scope")?.toString();
  const name = formData.get("name")?.toString();

  if (!scope || !name) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const packageDetails = await getJSRPackageDetails(scope, name);

    await installJSRPlugin(db.db, packageDetails);
  } catch (_) {
    return new Response("Failed to install plugin", { status: 500 });
  }

  return redirect("/admin/plugins");
};
