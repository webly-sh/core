function Page() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <img
            src="/uploads/logo.png"
            alt="Webly Logo"
            className="h-48 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Webly</h1>
          <p className="text-xl text-gray-600 mb-8">
            A simple website builder (I hope).
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About Webly
            </h2>
            <p className="text-gray-600 mb-4">
              Inspired by recent developments in web technologies, Webly is an
              experiment to create an extensible and easy-to-self-host website
              builder.
            </p>
            <p className="text-gray-600 mb-4">
              Our goal is to provide a zero-config setup that allows you to get
              started quickly through an admin UI, reading from three key
              folders: pages, api, and uploads.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              Key Features:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>JSX for pages and page building</li>
              <li>Tailwind or Raw CSS for styling</li>
              <li>SQLite for storage</li>
              <li>JSR for plugins and self-updates</li>
              <li>Folder-based routing and API endpoints</li>
              <li>JWT for authentication</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Open Admin Dashboard
          </a>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/webly-sh/core"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
