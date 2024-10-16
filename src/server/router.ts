import { renderToString } from "react-dom/server";

export const router = async (_req: Request): Promise<Response> => {
  const url = new URL(_req.url);

  switch (url.pathname) {
    case "/api": {
      return new Response("Hello World");
    }
    default: {
      const response = await pageHandler(url);
      return response;
    }
  }
};

const pageHandler = async (url: URL): Promise<Response> => {
  let path = url.pathname;
  if (!path.endsWith("/")) {
    path += "/";
  }

  try {
    let cssFileContents: string[] = [];

    // find all css files in the page directory
    for await (const dirEntry of Deno.readDir(`${Deno.cwd()}/pages${path}`)) {
      if (dirEntry.name.endsWith(".css")) {
        console.log(dirEntry.name);
        cssFileContents.push(
          await Deno.readTextFile(`${Deno.cwd()}/pages${path}${dirEntry.name}`)
        );
      }
    }

    // for (const file of cssFiles) {
    //   if (file.name.endsWith(".css")) {
    //     console.log(file.name);
    //   }
    // }

    // Dynamically import the file
    const module = await import(`${Deno.cwd()}/pages${path}page.tsx`);

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

    content +=
      typeof defaultExport === "function"
        ? renderToString(defaultExport())
        : defaultExport;

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
