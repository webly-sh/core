import { redirect } from "../../src/pages/index.ts";

function Page(_req?: Request) {
  // const auth = _req?.headers.get("Authorization");
  // if (!auth) {
  //   // Redirect to /admin/login if unauthorized
  //   return redirect("/admin/login");
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Site</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <Home className="mr-2 h-5 w-5" /> */}
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <Edit3 className="mr-2 h-5 w-5" /> */}
            Posts
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <FileText className="mr-2 h-5 w-5" /> */}
            Pages
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <MessageSquare className="mr-2 h-5 w-5" /> */}
            Comments
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <Users className="mr-2 h-5 w-5" /> */}
            Users
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            {/* <Settings className="mr-2 h-5 w-5" /> */}
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              New Post
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* At a Glance Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    {/* <Grid className="h-6 w-6 text-white" /> */}
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

            {/* Activity Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    {/* <BarChart2 className="h-6 w-6 text-white" /> */}
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

            {/* Quick Draft Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quick Draft
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Create a new post draft</p>
                </div>
                <form className="mt-5 space-y-4">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Title"
                  />
                  <textarea
                    id="content"
                    name="content"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Content"
                  ></textarea>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Draft
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
