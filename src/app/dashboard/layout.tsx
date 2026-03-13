import Link from "next/link";
import { 
  BarChart3, User, Settings, Lock, LogOut, 
  FileText, Send, CheckSquare, Layers, 
  HelpCircle, ChevronDown, UserCheck
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--mdpi-blue)] rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Metademic</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-8 mt-4 auto-cols-max">
          {/* Account Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              <span>Account</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <ul className="space-y-1">
              {[
                { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
                { label: "Manage Accounts", icon: Layers, href: "/dashboard/accounts" },
                { label: "Change Password", icon: Lock, href: "/dashboard/password" },
                { label: "Profile", icon: User, href: "/dashboard/profile", active: true },
                { label: "Logout", icon: LogOut, href: "/login" },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active 
                        ? "bg-blue-50 text-[var(--mdpi-blue)] font-medium" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Submissions Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              <span>Submissions</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <ul className="space-y-1">
              {[
                { label: "Submit", icon: Send, href: "/dashboard/submit" },
                { label: "Submitted Manuscripts", icon: FileText, href: "/dashboard/manuscripts" },
                { label: "Co-Authored Manuscripts", icon: UserCheck, href: "/dashboard/co-authored" },
                { label: "Author Services", icon: Settings, href: "/dashboard/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviewer Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              <span>Reviewer</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <ul className="space-y-1">
              {[
                { label: "Volunteer Preferences", icon: CheckSquare, href: "/dashboard/volunteer" },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[var(--mdpi-blue)] font-bold text-xs">RI</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-gray-900 truncate">Razin Molla</p>
              <p className="text-[10px] text-gray-500 truncate">razin1325@gmail.com</p>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
