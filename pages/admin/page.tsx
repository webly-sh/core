import { BarChart2, Grid, Home } from "lucide-react";
import { redirect } from "@webly/router";

function Page(_req?: Request) {
  // const auth = _req?.headers.get("Authorization");
  // if (!auth) {
  //   // Redirect to /login if unauthorized
  //   return redirect("/login");
  // }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Home className="h-8 w-8 text-gray-400" />
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <Grid className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        At a Glance
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          5 Posts, 2 Pages, 3 Comments
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <BarChart2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Activity
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          10 new comments this week
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
