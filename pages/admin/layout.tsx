import {
  Edit3,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  Blocks,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Site</h1>
        </div>
        <nav className="mt-4">
          <a
            href="/admin"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </a>
          <a
            href="/admin/posts"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <Edit3 className="mr-2 h-5 w-5" />
            Posts
          </a>
          <a
            href="/admin/pages"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <FileText className="mr-2 h-5 w-5" />
            Pages
          </a>
          <a
            href="/admin/comments"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Comments
          </a>
          <a
            href="/admin/users"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <Users className="mr-2 h-5 w-5" />
            Users
          </a>
          <a
            href="/admin/plugins"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <Blocks className="mr-2 h-5 w-5" />
            Plugins
          </a>
          <a
            href="/admin/settings"
            className="block py-2 px-4 hover:bg-gray-800 flex items-center"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </a>
        </nav>
      </aside>
      {children}
    </div>
  );
}
