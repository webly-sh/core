import { redirect } from "../../src/pages/index.ts";

function Page(_req?: Request) {
  const auth = _req?.headers.get("Authorization");
  if (!auth) {
    // Redirect to /admin/login if unauthorized
    return redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Admin Page
        </h2>
        <p>This is the admin page</p>
      </div>
    </div>
  );
}

export default Page;
