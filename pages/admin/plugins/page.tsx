import { Blocks, Plus } from "lucide-react";
import { getPlugins, type Plugin } from "../../../src/db/plugins.ts";
import { db } from "../../../src/db/index.ts";

export default function Page() {
  const plugins: Plugin[] = getPlugins(db.db);

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Plugins</h1>
          <Blocks className="h-8 w-8 text-gray-400" />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-end mb-4">
            <a href="/admin/plugins/install">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Plugin
              </button>
            </a>
          </div>
          {plugins.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plugins.map((plugin, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">{plugin.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plugin.scope}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        "Active" === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {plugin.version}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No plugins found</p>
              <a href="/admin/plugins/install">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Add Plugin
                </button>
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
