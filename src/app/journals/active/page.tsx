import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function ActiveJournalsPage() {
    const supabase = await createClient();

    // Fetch total active journals count
    const { count: totalJournals } = await supabase
        .from("journals")
        .select("*", { count: 'exact', head: true })
        .eq("is_active", true);

    // Fetch Journals with article counts (Basic version)
    // Note: To get real article counts per journal, we should ideally use a view or a complex query.
    // For now, we'll fetch the journals and their base data.
    const { data: journals } = await supabase
        .from("journals")
        .select(`
            id,
            title,
            short_title,
            slug,
            issn_online,
            founded_year
        `)
        .eq("is_active", true)
        .order("title", { ascending: true });

    const journalList = (journals || []).map(j => ({
        name: j.title,
        acronym: j.short_title,
        slug: j.slug,
        issn: j.issn_online || 'N/A',
        launched: j.founded_year || 'N/A',
        articles: 0 // Placeholder or would need separate count
    }));

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg">
            <Navbar />
            <div className="max-w-[1280px] mx-auto px-4 py-6 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded border border-mdpi-border p-6 mb-6 shadow-sm">
                            <h1 className="text-2xl font-extrabold text-mdpi-text-dark mb-2">Metademic Journal List</h1>
                            <p className="text-[14px] text-mdpi-gray-text mb-6">
                                Metademic is a pioneer in scholarly open access publishing and currently publishes <strong className="text-mdpi-blue">{totalJournals || 0} journals</strong>. Browse all titles below or use the search filters to find specific academic disciplines.
                            </p>
                            
                            <div className="overflow-x-auto border border-mdpi-border rounded">
                                <table className="w-full text-left text-[13px]">
                                    <thead className="bg-[#f8f9fa] text-mdpi-text-dark border-b border-mdpi-border">
                                        <tr>
                                            <th className="px-4 py-3.5 font-bold">#</th>
                                            <th className="px-4 py-3.5 font-bold">Journal Name</th>
                                            <th className="px-4 py-3.5 font-bold text-center">ISSN</th>
                                            <th className="px-4 py-3.5 font-bold text-center">Launched</th>
                                            <th className="px-4 py-3.5 font-bold text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-mdpi-border">
                                        {journalList.map((journal, index) => (
                                            <tr key={journal.name} className="hover:bg-mdpi-blue/[0.02] transition-colors group">
                                                <td className="px-4 py-4 text-mdpi-gray-text">{index + 1}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div 
                                                            className="w-9 h-9 rounded flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm group-hover:scale-105 transition-transform bg-mdpi-blue"
                                                        >
                                                            {journal.acronym?.substring(0, 3).toUpperCase()}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <Link href={`/journals/${journal.slug}`} className="font-bold text-[14px] text-mdpi-blue hover:text-mdpi-blue-dark hover:underline no-underline transition-colors">
                                                                {journal.name}
                                                            </Link>
                                                            <span className="text-[11px] text-mdpi-green font-semibold">Open Access</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-mdpi-gray-text text-center font-mono">{journal.issn}</td>
                                                <td className="px-4 py-4 text-mdpi-gray-text text-center">{journal.launched}</td>
                                                <td className="px-4 py-4 text-mdpi-text-dark text-right font-bold truncate">
                                                    Active
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center text-[13px] text-mdpi-gray-text">
                                <span>Showing {journalList.length} journals</span>
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
