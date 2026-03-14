"use client";

import Link from "next/link";
import { Send, FileText, CheckSquare, MessageSquare } from "lucide-react";

export default function UserDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans max-w-full overflow-x-hidden">
      <div className="border-b border-gray-200 pb-2">
        <h1 className="text-xl font-bold text-black">User Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Submissions", value: "0", icon: Send, color: "text-black", bg: "bg-gray-100" },
          { title: "Published", value: "0", icon: FileText, color: "text-black", bg: "bg-gray-100" },
          { title: "Reviews", value: "0", icon: CheckSquare, color: "text-black", bg: "bg-gray-100" },
          { title: "Comments", value: "0", icon: MessageSquare, color: "text-black", bg: "bg-gray-100" },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${stat.bg} ${stat.color} uppercase tracking-wider`}>Total</span>
            </div>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
            <p className="text-[11px] font-bold text-black mt-1 uppercase tracking-tight">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-[#fcfcfc] px-4 py-2 border-b border-gray-200">
            <h3 className="font-bold text-black text-[13px]">Latest Submissions</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-black" />
            </div>
            <p className="text-[13px] text-black font-medium">No manuscripts submitted yet.</p>
            <button className="text-[13px] font-bold text-[#004a99] mt-3 hover:underline">Start a new submission</button>
          </div>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-[#fcfcfc] px-4 py-2 border-b border-gray-200">
            <h3 className="font-bold text-black text-[13px]">Account Overview</h3>
          </div>
          <div className="p-5 space-y-4">
             <div className="flex items-center justify-between text-[13px] gap-2">
               <span className="text-black font-medium truncate">ORCID Integration</span>
               <div className="flex items-center gap-1.5 font-bold text-green-600 shrink-0">
                 <div className="w-4 h-4 rounded-full bg-[#A6CE39] flex items-center justify-center text-white text-[8px]">iD</div>
                 Connected
               </div>
             </div>
             <div className="flex items-center justify-between text-[13px] gap-2">
               <span className="text-black font-bold truncate">Profile Completion</span>
               <div className="flex items-center gap-3">
                 <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-[#004a99] w-[85%]"></div>
                 </div>
                 <span className="font-bold text-[#004a99]">85%</span>
               </div>
             </div>
             <div className="pt-4 border-t border-gray-50">
               <p className="text-[11px] text-black font-medium leading-normal italic">
                 Update your profile to enable all features, including manuscript submission and reviewer invitations.
               </p>
             </div>
             <Link href="/user/edit" className="block w-full text-center py-1.5 border border-[#004a99] text-[#004a99] text-[12px] font-bold rounded-sm hover:bg-blue-50 transition-colors">
               Edit Profile
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
