"use client";

import { FileText, Send, CheckSquare, MessageSquare } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to your academic workstation. Track your research and contributions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Submissions", value: "0", icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Published", value: "0", icon: FileText, color: "text-green-600", bg: "bg-green-50" },
          { title: "Reviews", value: "0", icon: CheckSquare, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Comments", value: "0", icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.bg} ${stat.color} uppercase tracking-wider`}>Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Latest Submissions</h3>
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
            <FileText className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-sm text-gray-500">No manuscripts submitted yet.</p>
            <button className="text-sm font-semibold text-[var(--mdpi-blue)] mt-2 hover:underline">Start a new submission</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Account Overview</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between text-sm">
               <span className="text-gray-500">ORCID Integration</span>
               <span className="font-medium text-green-600">Connected</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-gray-500">Profile Completion</span>
               <span className="font-medium text-blue-600">85%</span>
             </div>
             <div className="pt-4 border-t border-gray-50">
               <p className="text-xs text-gray-400 leading-relaxed italic">
                 Update your profile to enable all features, including manuscript submission and reviewer invitations.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
