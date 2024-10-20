import { Blocks, Plus } from "lucide-react";
import { getInstalledModules } from "@/modules/index.ts";

export default async function Page() {
  const modules = await getInstalledModules();

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modules</h1>
          <Blocks className="h-8 w-8 text-gray-400" />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-end mb-4">
            <a href="/admin/modules/install">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </button>
            </a>
          </div>
          {modules.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {module.scope ? `@${module.scope}/` : ""}
                    {module.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {module.registry}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        "Active" === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {module.approximate_version ? "^" : ""}
                      {module.version}
                    </span>
                    {module.required ? (
                      <span className="text-sm text-gray-600">required</span>
                    ) : (
                      <form
                        action="/api/v1/admin/modules/remove"
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
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          remove
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No modules found</p>
              <a href="/admin/modules/install">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Add Module
                </button>
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
