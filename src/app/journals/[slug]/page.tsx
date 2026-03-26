import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { 
    BookOpen, 
    Star, 
    Users, 
    FileText, 
    TrendingUp, 
    Clock, 
    AlertCircle, 
    ChevronRight,
    Award
} from 'lucide-react';
import { notFound } from "next/navigation";
import { createClient, createAdminClient } from "@/utils/supabase/server";

export const revalidate = 86400; // ISR validation every 24 hours

type SupabaseArticle = {
  id: string;
  title: string;
  submission_type: string;
  published_at: string | null;
  views_count: number;
  downloads_count: number;
  authors: { full_name: string; author_order: number }[];
};

export async function generateStaticParams() {
    const supabase = createAdminClient();
    const { data: journals } = await supabase
        .from("journals")
        .select("slug")
        .eq("is_active", true);
        
    return (journals || []).map((j) => ({
        slug: j.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const supabase = createAdminClient();
    const { data: journal } = await supabase
        .from("journals")
        .select("title, description")
        .eq("slug", slug)
        .single();
    
    if (!journal) {
        return { title: 'Journal Not Found | Metademic' };
    }

    return {
        title: `${journal.title} | An Open Access Journal by Metademic`,
        description: journal.description,
    };
}

export default async function JournalHomePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const supabase = await createClient();

    // Fetch Journal Details
    const { data: journal } = await supabase
        .from("journals")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!journal) {
        notFound();
    }

    // Fetch recent articles for this journal
    const { data: articles } = await supabase
        .from("articles")
        .select(`
            id,
            title,
            submission_type,
            published_at,
            views_count,
            downloads_count,
            authors:article_authors (
                full_name,
                author_order
            )
        `)
        .eq("journal_id", journal.id)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(5) as { data: SupabaseArticle[] | null };

    const mappedArticles = (articles || []).map(art => ({
        title: art.title,
        authors: art.authors
            .sort((a, b) => a.author_order - b.author_order)
            .map(auth => auth.full_name)
            .join(', '),
        type: art.submission_type.charAt(0).toUpperCase() + art.submission_type.slice(1),
        date: art.published_at 
          ? new Date(art.published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Recently",
        views: art.views_count,
        downloads: art.downloads_count
    }));

    const color = (journal as { color?: string }).color || "#004a99"; // Fallback color

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Journal Hero Section */}
            <div className="bg-[#1a252f] text-white pt-10 pb-12 relative overflow-hidden" style={{ borderBottom: `4px solid ${color}` }}>
                {/* Background Decor */}
                <div 
                    className="absolute right-0 top-0 w-96 h-96 opacity-10 -mr-24 -mt-24 rounded-full blur-3xl mix-blend-screen"
                    style={{ backgroundColor: color }}
                ></div>

                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    {/* Journal Logo/Acronym Block */}
                    <div 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center text-white text-3xl md:text-4xl font-extrabold shadow-2xl flex-shrink-0 border-2 border-white/20"
                        style={{ backgroundColor: color }}
                    >
                        {journal.short_title}
                    </div>
                    
                    {/* Journal Details */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 bg-white/10 text-[11px] font-extrabold uppercase tracking-wider rounded border border-white/20 backdrop-blur-sm">
                                Open Access
                            </span>
                            <span className="px-2.5 py-1 bg-white/10 text-[11px] font-extrabold uppercase tracking-wider rounded border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
                                <Award size={12} className="text-yellow-400" /> Peer-Reviewed
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
                            {journal.title}
                        </h1>
                        <p className="text-white/70 text-[15px] max-w-3xl mb-4 leading-relaxed line-clamp-2">
                            {journal.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/90">
                            <span className="flex items-center gap-1.5 font-bold"><BookOpen size={16} className="opacity-80" /> ISSN: {journal.issn_online || journal.issn_print}</span>
                            <span className="flex items-center gap-1.5 font-bold"><TrendingUp size={16} className="text-green-400" /> Impact Factor: {journal.impact_factor || 'N/A'}</span>
                            <span className="flex items-center gap-1.5 font-bold"><Star size={16} className="text-yellow-400" /> CiteScore: {journal.cite_score || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <Link 
                            href="/submit"
                            className="block w-full text-center px-8 py-4 bg-mdpi-green hover:bg-emerald-600 text-white font-extrabold rounded shadow-lg transition-all hover:-translate-y-1 text-[16px]"
                        >
                            Submit to {journal.short_title}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bg-white border-b border-mdpi-border shadow-sm sticky top-0 z-20 hidden md:block">
                <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between text-[13px]">
                    <div className="flex gap-8 font-bold text-mdpi-text-dark">
                        <Link href="#aims" className="hover:text-mdpi-blue flex items-center gap-1.5"><AlertCircle size={15} /> Aims & Scope</Link>
                        <Link href="#board" className="hover:text-mdpi-blue flex items-center gap-1.5"><Users size={15} /> Editorial Board</Link>
                        <Link href="/information/authors" className="hover:text-mdpi-blue flex items-center gap-1.5"><FileText size={15} /> Instructions for Authors</Link>
                    </div>
                    <div className="flex gap-6 text-mdpi-gray-text">
                        <span><strong>APC:</strong> {journal.submission_fee ? `${journal.submission_fee} USD` : 'Free'}</span>
                        <span><strong>Time to First Decision:</strong> ~16 Days</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Journal specifics */}
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <div className="bg-white rounded border border-mdpi-border shadow-sm mb-6 overflow-hidden">
                            <div className="bg-mdpi-gray-bg px-4 py-3 border-b border-mdpi-border font-extrabold text-[14px] text-mdpi-text-dark uppercase tracking-wide">
                                Journal Menu
                            </div>
                            <ul className="divide-y divide-mdpi-border text-[13px] font-bold text-mdpi-text-dark">
                                <li><a href="#" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors flex justify-between items-center group">Journal Home <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                                <li><a href="#" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors flex justify-between items-center group">Articles <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                                <li><a href="#" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors flex justify-between items-center group">Special Issues <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                                <li><a href="#" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors flex justify-between items-center group">Editorial Board <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                                <li><a href="#" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors flex justify-between items-center group">Article Processing Charges <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 space-y-8">
                        
                        {/* Aims and Scope */}
                        <div id="aims" className="bg-white rounded border border-mdpi-border shadow-sm p-6 scroll-mt-20">
                            <h2 className="text-[20px] font-extrabold text-mdpi-blue mb-4 pb-2 border-b border-mdpi-border">
                                Aims & Scope
                            </h2>
                            <p className="text-mdpi-gray-text leading-relaxed mb-6">
                                {journal.aims_scope || journal.description}
                            </p>
                        </div>

                        {/* Recent Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-4 border-b border-mdpi-border pb-2">
                                <h2 className="text-[20px] font-extrabold text-mdpi-text-dark">
                                    Latest Articles
                                </h2>
                                <Link href="#" className="text-[13px] font-bold text-mdpi-link-blue hover:underline">View all articles &raquo;</Link>
                            </div>
                            
                            <div className="space-y-4">
                                {mappedArticles.length > 0 ? mappedArticles.map((article, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded border border-mdpi-border shadow-sm hover:border-mdpi-blue transition-colors group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <span className="inline-block px-2 py-0.5 bg-mdpi-blue/10 text-mdpi-blue font-extrabold text-[11px] uppercase rounded">
                                                {article.type}
                                            </span>
                                            <div className="flex items-center gap-4 text-[12px] text-mdpi-gray-text font-bold">
                                                <span className="flex items-center gap-1"><Clock size={13} /> Published: {article.date}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-[16px] font-extrabold text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors mb-2 cursor-pointer leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-[13px] text-mdpi-gray-text mb-4 italic">
                                            {article.authors}
                                        </p>
                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-mdpi-border">
                                            <div className="flex gap-4 text-[12px] text-mdpi-gray-text font-bold">
                                                <span title="Views" className="flex items-center gap-1.5"><AlertCircle size={14} className="opacity-70" /> {article.views.toLocaleString()}</span>
                                                <span title="Downloads" className="flex items-center gap-1.5"><FileText size={14} className="opacity-70" /> {article.downloads.toLocaleString()}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="px-3 py-1.5 bg-mdpi-blue text-white rounded text-[12px] font-bold hover:bg-mdpi-blue-dark transition-colors">HTML</button>
                                                <button className="px-3 py-1.5 bg-rose-600 text-white rounded text-[12px] font-bold hover:bg-rose-700 transition-colors flex items-center gap-1">PDF</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="bg-white p-8 rounded border border-mdpi-border text-center text-mdpi-gray-text italic">
                                        No articles published in this journal yet.
                                    </div>
                                )}
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
