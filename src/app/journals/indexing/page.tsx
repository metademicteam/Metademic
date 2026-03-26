import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { createClient } from "@/utils/supabase/server";

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Browse by Indexing | Metademic Journals",
    description: "Browse Metademic open access journals categorized by major indexing databases like Web of Science, Scopus, and PubMed.",
};

export default async function BrowseByIndexingPage() {
    const supabase = await createClient();

    // Fetch Journals
    // In a real scenario, we'd fetch journals by their specific indexing status.
    // For now, we'll fetch all journals to demonstrate the connection.
    const { data: journals } = await supabase
        .from("journals")
        .select("id, title, short_title, slug, impact_factor")
        .eq("is_active", true)
        .order("title", { ascending: true });

    const journalList = (journals || []).map(j => ({
        name: j.title,
        acronym: j.short_title,
        slug: j.slug,
        impactFactor: j.impact_factor || 'N/A',
        color: "#004a99"
    }));

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-[#1a252f] text-white py-12 relative overflow-hidden border-b-4 border-mdpi-blue">
                <div className="absolute right-0 top-0 w-64 h-64 bg-mdpi-blue opacity-10 -mr-16 -mt-16 rounded-full blur-3xl"></div>
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Database size={32} className="text-mdpi-blue-light" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Browse by Indexing</h1>
                        <p className="text-[15px] text-white/80 max-w-2xl">
                            Explore Metademic journals indexed in major academic databases. We are committed to ensuring high visibility and rigorous indexing standards for all published research.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 space-y-8">
                        
                        <div className="bg-white border border-mdpi-border rounded shadow-sm p-6 mb-4 flex items-start gap-4 border-l-4 border-l-mdpi-green">
                            <ShieldCheck className="text-mdpi-green flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="text-[15px] font-extrabold text-mdpi-text-dark mb-1">Commitment to Quality</h3>
                                <p className="text-mdpi-gray-text text-[13px] leading-relaxed">
                                    Metademic continuously applies to new indexes to ensure maximum exposure for our authors. Currently, most of our published articles are indexed in the Web of Science Core Collection and Scopus.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-mdpi-border rounded shadow-sm overflow-hidden">
                            <div className="bg-mdpi-gray-bg/50 px-6 py-4 border-b border-mdpi-border">
                                <h2 className="text-lg font-extrabold text-mdpi-text-dark flex items-center gap-2">
                                    <Database size={18} className="text-mdpi-blue" />
                                    Web of Science Core Collection & Scopus
                                </h2>
                                <p className="text-[13px] text-mdpi-gray-text mt-1">High quality, peer-reviewed journals approved by major academic databases.</p>
                            </div>
                            <div className="p-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:gap-px bg-mdpi-border">
                                    {journalList.map((journal, jIdx) => (
                                        <Link 
                                            key={jIdx} 
                                            href={`/journals/${journal.slug}`}
                                            className="bg-white p-4 flex items-center gap-4 hover:bg-mdpi-blue/[0.03] transition-colors group no-underline"
                                        >
                                            <div 
                                                className="w-10 h-10 rounded-md flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 bg-mdpi-blue"
                                            >
                                                {journal.acronym?.substring(0, 3).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[14px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors line-clamp-1">{journal.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[11px] px-1.5 py-0.5 bg-mdpi-gray-bg text-mdpi-gray-text rounded border border-mdpi-border">IF: {journal.impactFactor}</span>
                                                    <CheckCircle2 size={12} className="text-mdpi-green" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Sidebar */}
                    <div className="w-full lg:w-[260px] flex-shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
