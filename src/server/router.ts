import { renderToString } from "react-dom/server";

export const router = async (_req: Request): Promise<Response> => {
  const url = new URL(_req.url);

  const basePath = url.pathname.split("/")[1];

  switch (basePath) {
    case "api": {
      const response = await apiHandler(_req);
      return response;
    }
    case "uploads": {
      const response = await fileHandler(url);
      return response;
    }
    case "static": {
      const response = await fileHandler(url);
      return response;
    }
    default: {
      const response = await pageHandler(_req);
      return response;
    }
  }
};

const fileHandler = async (url: URL): Promise<Response> => {
  const path = url.pathname;

  try {
    const fileDir = `${Deno.cwd()}${path}`;

    const file = await Deno.readFile(fileDir);
    const response = new Response(file);

    // Cache the file
    const cacheControl = "public, max-age=3600"; // Cache for 1 hour
    response.headers.set("Cache-Control", cacheControl);

    return response;
  } catch (error) {
    console.error(
      `Error loading file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return new Response("Not found", { status: 404 });
  }
};

const apiHandler = async (_req: Request): Promise<Response> => {
  const method = _req.method;
  const url = new URL(_req.url);

  let path = url.pathname;
  if (!path.endsWith("/")) {
    path += "/";
  }

  const apiDir = `${Deno.cwd()}${path}`;

  try {
    const module = await import(`${apiDir}${method.toLowerCase()}.ts`);
    return module.route(_req);
  } catch (error) {
    console.error(
      `Error loading api: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return new Response("Not found", { status: 404 });
  }
};

const pageHandler = async (_req: Request): Promise<Response> => {
  const url = new URL(_req.url);

  let path = url.pathname;
  if (!path.endsWith("/")) {
    path += "/";
  }

  try {
    let pageDir = `${Deno.cwd()}/pages${path}`;

    // Compile Tailwind CSS
    const tailwindFilePath = `/static/global.css`;

    // Read page-specific CSS files
    const cssFileContents: string[] = [];

    for await (const dirEntry of Deno.readDir(pageDir)) {
      if (dirEntry.name.endsWith(".css")) {
        cssFileContents.push(
          await Deno.readTextFile(`${pageDir}/${dirEntry.name}`)
        );
      }
    }

    // Dynamically import the file
    if (!pageDir.endsWith("/")) {
      pageDir += "/";
    }

    const module = await import(`${pageDir}page.tsx`);

    // Access the default export
    const defaultExport = module.default;

    if (
      typeof defaultExport !== "function" &&
      typeof defaultExport !== "string"
    ) {
      throw new Error("Invalid export type");
    }

    let content = "";
    for (const css of cssFileContents) {
      content += `<style>${css}</style>`;
    }

    content += `<link href="${tailwindFilePath}" rel="stylesheet">`;

    if (typeof defaultExport === "string") {
      content += defaultExport;
    } else {
      const response: Response | JSX.Element = defaultExport(_req);

      if (response instanceof Response) {
        return response;
      }

      content += renderToString(response);
    }

    return new Response(content, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error(
      `Error loading page: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return new Response("Not found", { status: 404 });
  }
};
