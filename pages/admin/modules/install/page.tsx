import { type JSRModuleDetails, searchJSR } from "@/services/jsr/index.ts";
import { Blocks } from "lucide-react";

export default async function Page(req: Request) {
  const query = new URL(req.url).searchParams.get("query");

  let modules: JSRModuleDetails[] = [];
  if (query) {
    modules = await searchJSR(query);
  }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Install a plugin</h1>
          <Blocks className="h-8 w-8 text-gray-400" />
        </div>
        <form action="" method="get" className="mb-8">
          <div className="flex items-center border-b border-b-2 border-gray-300 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search for plugins..."
              aria-label="Search for plugins"
              name="query"
              autoFocus
              defaultValue={query ?? ""}
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {query && (
          <div className="mb-4">
            <p className="text-gray-600">
              Showing results for:{" "}
              <span className="font-semibold">{query}</span>
            </p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {modules.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {modules.map((module, index) => (
                <li key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {module.scope ? `@${module.scope}/` : ""}
                        {module.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {module.description}
                      </p>
                    </div>
                    <div className="mr-4">
                      <p className="text-sm font-medium text-gray-900">
                        Latest: {module.latestVersion}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <form
                        action="/api/v1/admin/modules"
                        method="POST"
                        className="m-0"
                      >
                        <input
                          type="hidden"
                          name="scope"
                          value={module.scope}
                        />
                        <input type="hidden" name="name" value={module.name} />
                        <button
                          type="submit"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Install
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="text-center py-4 text-gray-500">
              No plugins found matching your search.
            </p>
          ) : (
            <p className="text-center py-4 text-gray-500">
              Enter a search query to find plugins.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
