"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  HelpCircle,
  Menu,
  X
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SidebarContent = ({ 
  pathname, 
  onClose, 
  navigationItems 
}: { 
  pathname: string, 
  onClose: () => void, 
  navigationItems: NavSection[] 
}) => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#004a99] rounded-sm flex items-center justify-center text-white font-bold text-xl">M</div>
        <span className="text-xl font-bold tracking-tight text-[#004a99]">Metademic</span>
      </div>
      <button className="md:hidden p-1 hover:bg-gray-100 rounded-full" onClick={onClose}>
        <X className="w-6 h-6 text-black" />
      </button>
    </div>

    <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
      {navigationItems.map((section) => (
        <div key={section.title}>
          <div className="flex items-center justify-between text-[11px] font-bold text-black uppercase tracking-wider mb-2 px-3">
            <span>{section.title}</span>
            <HelpCircle className="w-3 h-3 text-blue-500" />
          </div>
          <ul className="space-y-[2px]">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-1.5 text-[13px] border-l-4 transition-all ${
                      isActive 
                        ? "bg-[#e2e8f0] border-[#004a99] text-[#004a99] font-bold" 
                        : "border-transparent text-black hover:bg-gray-50 hover:text-[#004a99]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>

    <div className="p-4 border-t border-gray-100 bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#004a99] flex items-center justify-center text-white font-bold text-[10px]">RM</div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-black truncate">razin1325@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
);

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: NavSection[] = [
    {
      title: "Account",
      items: [
        { label: "Dashboard", href: "/user/myprofile" },
        { label: "Manage Accounts", href: "/user/accounts" },
        { label: "Change Password", href: "/user/password" },
        { label: "Profile", href: "/user/edit" },
        { label: "Logout", href: "/login" },
      ]
    },
    {
      title: "Submissions",
      items: [
        { label: "Submit", href: "/user/submit" },
        { label: "Submitted Manuscripts", href: "/user/manuscripts" },
        { label: "Co-Authored Manuscripts", href: "/user/co-authored" },
        { label: "Author Services", href: "/user/services" },
        { label: "Discount Vouchers", href: "/user/vouchers" },
        { label: "Invoices", href: "/user/invoices" },
        { label: "LaTeX Word Count", href: "/user/word-count" },
      ]
    },
    {
      title: "Reviewer",
      items: [
        { label: "Volunteer Preferences", href: "/user/volunteer" },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f1f1]">
      {/* Desktop Sidebar */}
      <aside className="w-[240px] bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen shadow-sm">
        <SidebarContent 
          pathname={pathname} 
          onClose={() => {}} 
          navigationItems={navigationItems} 
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 transition-transform duration-300 md:hidden shadow-xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent 
          pathname={pathname} 
          onClose={() => setIsMobileMenuOpen(false)} 
          navigationItems={navigationItems} 
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 md:hidden shrink-0 sticky top-0 z-30">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#004a99] rounded-sm flex items-center justify-center text-white font-bold text-lg">M</div>
              <span className="text-lg font-bold tracking-tight text-[#004a99]">Metademic</span>
            </div>
          </div>
          <div className="w-6" />
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
