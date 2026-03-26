import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { BookOpen, Search, FileEdit, Award, Microscope, Database, Globe, Zap } from 'lucide-react';
import { createClient } from "@/utils/supabase/server";

export const metadata = {
    title: "Journals | Metademic",
    description: "Explore our wide range of open access journals across all scientific disciplines.",
};

const serviceCards = [
    {
        title: "Active Journals",
        desc: "Browse our complete list of open access journals.",
        href: "/journals/active",
        icon: BookOpen,
        color: "bg-blue-500"
    },
    {
        title: "Find a Journal",
        desc: "Use our AI matching tool to find the perfect home for your research.",
        href: "/journals/find",
        icon: Search,
        color: "bg-green-500"
    },
    {
        title: "Journal Proposal",
        desc: "Found a gap in the literature? Propose a new journal or series.",
        href: "/journals/proposal",
        icon: FileEdit,
        color: "bg-purple-500"
    },
    {
        title: "Proceedings Series",
        desc: "Fast-track publishing for academic conferences and forums.",
        href: "/journals/proceedings",
        icon: Award,
        color: "bg-orange-500"
    }
];

export default async function JournalsLandingPage() {
    const supabase = await createClient();

    // Fetch total active journals count
    const { count: totalJournals } = await supabase
        .from("journals")
        .select("*", { count: 'exact', head: true })
        .eq("is_active", true);

    // Fetch total published articles count
    const { count: totalArticles } = await supabase
        .from("articles")
        .select("*", { count: 'exact', head: true })
        .eq("status", "published");

    // Fetch Subjects
    const { data: subjects } = await supabase
        .from("subjects")
        .select("id, name, slug")
        .limit(8);

    const stats = [
        { label: "Journals", value: `${totalJournals || 0}+` },
        { label: "Articles Published", value: `${totalArticles || 0}+` },
        { label: "Editorial Boards", value: "35,000+" },
        { label: "Reviewers", value: "150,000+" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-white border-b border-mdpi-border overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 py-12 md:py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-mdpi-text-dark mb-6 tracking-tight leading-tight">
                            Publishing Research that <br />
                            <span className="text-mdpi-blue">Shapes the Future</span>
                        </h1>
                        <p className="text-[18px] text-mdpi-gray-text mb-8 leading-relaxed">
                            Metademic is a pioneer in scholarly open access publishing. We serve the scientific community by providing high-quality, rigorous peer-review and global visibility for your work.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/journals/active" className="px-8 py-3.5 bg-mdpi-blue text-white font-bold rounded hover:bg-mdpi-blue-dark transition-all shadow-md hover:shadow-lg">
                                Browse Journals
                            </Link>
                            <Link href="/journals/find" className="px-8 py-3.5 bg-white text-mdpi-blue border border-mdpi-blue font-bold rounded hover:bg-mdpi-blue/5 transition-all">
                                Journal Finder
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-mdpi-footer-dark text-white py-10">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[12px]">
                        {stats.map((stat) => (
                            <div key={stat.label} className="space-y-1">
                                <div className="text-3xl font-extrabold text-mdpi-blue-light">{stat.value}</div>
                                <div className="uppercase tracking-widest opacity-70 font-bold">{stat.label}</div>
                            </div>
                        ))}
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
                    <div className="flex-1 min-w-0">
                        {/* Service Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {serviceCards.map((card) => (
                                <Link 
                                    key={card.title} 
                                    href={card.href}
                                    className="group bg-white p-6 rounded border border-mdpi-border hover:border-mdpi-blue hover:shadow-xl transition-all no-underline flex gap-5"
                                >
                                    <div className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <card.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-[16px] text-mdpi-text-dark mb-1 group-hover:text-mdpi-blue transition-colors">{card.title}</h3>
                                        <p className="text-mdpi-gray-text text-[13px] leading-relaxed">{card.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Why Metademic Section */}
                        <div className="bg-white rounded border border-mdpi-border overflow-hidden mb-8">
                            <div className="bg-mdpi-gray-bg/50 px-8 py-4 border-b border-mdpi-border">
                                <h2 className="text-[18px] font-extrabold text-mdpi-text-dark">Why Publish Your Research in Metademic?</h2>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="flex gap-4">
                                        <div className="text-mdpi-blue mt-1"><Microscope size={24} /></div>
                                        <div>
                                            <h4 className="font-bold mb-2">Rigorous Peer-Review</h4>
                                            <p className="text-[13px] text-mdpi-gray-text">Independent, blind peer-review system managed by world-class academic editors from leading institutions.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-mdpi-blue mt-1"><Zap size={24} /></div>
                                        <div>
                                            <h4 className="font-bold mb-2">Fast Publication</h4>
                                            <p className="text-[13px] text-mdpi-gray-text">Efficient editorial workflows ensuring a median time from submission to first decision of just 20 days.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-mdpi-blue mt-1"><Globe size={24} /></div>
                                        <div>
                                            <h4 className="font-bold mb-2">Global Visibility</h4>
                                            <p className="text-[13px] text-mdpi-gray-text">Immediate open access worldwide, maximizing the impact and citations of your scholarly work.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-mdpi-blue mt-1"><Database size={24} /></div>
                                        <div>
                                            <h4 className="font-bold mb-2">Extensive Indexing</h4>
                                            <p className="text-[13px] text-mdpi-gray-text">Journals are indexed in Scopus, Web of Science, PubMed, and other major academic databases.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Categories */}
                        <div className="space-y-4">
                            <h2 className="text-[18px] font-extrabold text-mdpi-text-dark">Browse by Discipline</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(subjects || []).map(cat => (
                                    <Link 
                                        key={cat.id} 
                                        href={`/journals/subject/${cat.slug}`}
                                        className="bg-white px-4 py-3 rounded border border-mdpi-border text-center font-medium hover:bg-mdpi-blue hover:text-white hover:border-mdpi-blue transition-all no-underline text-[13px]"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
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
