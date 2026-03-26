import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Search, ChevronRight, Layers, Box, Tag } from 'lucide-react';
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 86400; // ISR validation every 24 hours

export default async function TopicsPage() {
    const supabase = await createClient();

    // Fetch Special Issues as Topics
    const { data: specialIssues, count: totalTopics } = await supabase
        .from("special_issues")
        .select(`
            id,
            title,
            slug,
            deadline,
            is_open,
            journal:journals (
                title
            )
        `, { count: 'exact' })
        .order("created_at", { ascending: false })
        .limit(10);

    const topics = (specialIssues || []).map(issue => {
        const journalTitle = (issue.journal as unknown as { title: string }[])?.[0]?.title || "Multiple Journals";
            
        return {
            id: issue.id,
            title: issue.title,
            slug: issue.slug,
            journal: journalTitle,
            status: issue.is_open ? (new Date(issue.deadline || '') < new Date() ? 'Closing Soon' : 'Open') : 'Closed',
            articles: 15, // Static mock for now
            journals: 1
        };
    });

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-white border-b border-mdpi-border py-10 shadow-sm relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between xl:justify-start">
                    <div className="max-w-xl">
                        <span className="inline-block px-3 py-1 bg-mdpi-blue/10 text-mdpi-blue rounded text-[11px] font-extrabold uppercase tracking-widest mb-4 flex w-fit items-center gap-2"><Layers size={14} /> Thematic Collections</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-mdpi-text-dark mb-4 tracking-tight">Metademic Topics</h1>
                        <p className="text-[15px] text-mdpi-gray-text leading-relaxed mb-6">
                            Multidisciplinary collaborative environments curated by leading experts. Topics group articles across multiple Metademic journals focusing on a specific research area, maximizing visibility and interconnectedness.
                        </p>
                        <form className="relative">
                            <input type="text" placeholder="Search Topics..." className="w-full px-4 py-3 pl-12 border border-mdpi-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue transition-all" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mdpi-gray-text" size={20} />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-mdpi-blue hover:bg-mdpi-blue-dark text-white px-4 py-1.5 rounded transition-colors text-[13px] font-bold">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded border border-mdpi-border shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-extrabold text-mdpi-text-dark mb-4 items-center flex gap-2"><Box className="text-mdpi-blue" /> Browse Active Topics</h2>
                            <div className="flex gap-2 flex-wrap mb-6 border-b border-mdpi-border pb-4">
                                <button className="px-4 py-1.5 text-[13px] font-bold bg-mdpi-blue text-white rounded-full transition-colors">All Subjects</button>
                                {['Biology', 'Engineering', 'Medicine', 'Chemistry', 'Physics'].map(sub => (
                                    <button key={sub} className="px-4 py-1.5 text-[13px] font-medium bg-mdpi-gray-bg border border-mdpi-border hover:bg-white hover:text-mdpi-blue text-mdpi-gray-text rounded-full transition-colors">{sub}</button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {topics.length > 0 ? topics.map(topic => (
                                    <Link key={topic.id} href={`/special-issues/${topic.slug}`} className="group border border-mdpi-border rounded hover:border-mdpi-blue hover:shadow-md transition-all p-5 flex flex-col sm:flex-row gap-4 justify-between bg-white relative overflow-hidden no-underline">
                                        <div className="w-1 absolute left-0 top-0 bottom-0 bg-mdpi-blue scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
                                        <div className="flex-1 pl-2 text-left">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${topic.status === 'Open' ? 'bg-mdpi-green/10 text-mdpi-green' : topic.status === 'Closed' ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-orange-600'}`}>{topic.status}</span>
                                                <span className="text-[12px] text-mdpi-gray-text flex items-center gap-1"><Tag size={12} /> {topic.journal}</span>
                                            </div>
                                            <h3 className="font-bold text-[16px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors mb-2 cursor-pointer leading-tight pr-4">
                                                {topic.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col sm:items-end justify-center min-w-[140px] gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-mdpi-border sm:pl-4 pl-2 text-mdpi-gray-text text-[12px]">
                                            <div className="flex items-center gap-2"><strong>{topic.articles}</strong> Articles</div>
                                            <button className="flex items-center gap-1 text-mdpi-blue font-bold mt-1 group-hover:underline">View Topic <ChevronRight size={14} /></button>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="p-8 text-center text-mdpi-gray-text italic">No topics found.</div>
                                )}
                            </div>
                            
                            <div className="mt-8 pt-4 border-t border-mdpi-border flex justify-between items-center text-[13px]">
                                <span className="text-mdpi-gray-text">Showing {topics.length} of {totalTopics || 0} Topics</span>
                                <button className="px-4 py-2 border border-mdpi-border rounded hover:bg-mdpi-gray-bg hover:text-mdpi-blue font-bold transition-all bg-white">Load More</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-[260px] flex-shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
