import { Settings, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const currentVersion = "1.0.0";
  const isUpgrading = false;
  const showAlert = false;

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <Settings className="h-8 w-8 text-gray-400" />
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Application Version
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>View and manage your application version</p>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Current Version
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {currentVersion}
                </p>
              </div>
              <button
                disabled={isUpgrading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isUpgrading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpgrading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Upgrading...
                  </>
                ) : (
                  "Upgrade"
                )}
              </button>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <p className="text-sm text-gray-500">
              Upgrading may take a few minutes. Please do not close the
              application during this process.
            </p>
          </div>
        </div>

        {showAlert && (
          <div className="mt-8 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your application has been successfully upgraded to version{" "}
                    {currentVersion}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
