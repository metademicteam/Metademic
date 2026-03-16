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

export const revalidate = 86400; // ISR validation every 24 hours

// Mock database of journals for ISR generation
const journalDatabase: Record<string, { 
    name: string, 
    acronym: string, 
    issn: string,
    impactFactor: string, 
    citeScore: string,
    apc: string,
    color: string,
    description: string,
    aims: string[]
}> = {
    'sustainability': {
        name: "Sustainability",
        acronym: "SU",
        issn: "2071-1050",
        impactFactor: "3.8",
        citeScore: "5.8",
        apc: "2400 USD",
        color: "#4caf50",
        description: "Sustainability is an international, cross-disciplinary, scholarly, peer-reviewed and open access journal of environmental, cultural, economic, and social sustainability of human beings.",
        aims: [
            "Sustainable Engineering and Science",
            "Energy Sustainability",
            "Economic aspects of sustainability",
            "Sustainable agriculture",
            "Urban sustainability and smart cities"
        ]
    },
    'sensors': {
        name: "Sensors",
        acronym: "SE",
        issn: "1424-8220",
        impactFactor: "3.9",
        citeScore: "7.3",
        apc: "2600 USD",
        color: "#ff9800",
        description: "Sensors is the leading international, peer-reviewed, open access journal on the science and technology of sensors. Sensors is published semimonthly online by Metademic.",
        aims: [
            "Physical sensors",
            "Chemical sensors",
            "Biosensors",
            "Optical sensors",
            "Internet of Things (IoT) sensors"
        ]
    },
    'ijms': {
        name: "International Journal of Molecular Sciences",
        acronym: "IJMS",
        issn: "1422-0067",
        impactFactor: "5.6",
        citeScore: "7.8",
        apc: "2900 USD",
        color: "#9c27b0",
        description: "International Journal of Molecular Sciences is an international, peer-reviewed, open access journal providing an advanced forum for biochemistry, molecular and cell biology, molecular biophysics, molecular medicine, and all aspects of molecular research in chemistry.",
        aims: [
            "Molecular biology, molecular biophysics",
            "Biochemistry",
            "Molecular medicine",
            "Molecular plant sciences",
            "Material science and applications"
        ]
    },
    'cancers': {
        name: "Cancers",
        acronym: "CA",
        issn: "2072-6694",
        impactFactor: "5.2",
        citeScore: "7.4",
        apc: "2900 USD",
        color: "#f44336",
        description: "Cancers is a peer-reviewed, open access journal of oncology. It publishes research papers, reviews, editorials, communications, and short notes.",
        aims: [
            "Tumor biology and immunology",
            "Cancer therapy and prevention",
            "Cancer biomarkers",
            "Epidemiology",
            "Clinical trials in oncology"
        ]
    },
    'applied-sciences': {
        name: "Applied Sciences",
        acronym: "AS",
        issn: "2076-3417",
        impactFactor: "2.7",
        citeScore: "4.5",
        apc: "2400 USD",
        color: "#e91e63",
        description: "Applied Sciences is an international, peer-reviewed, open access journal on all aspects of applied natural sciences published semimonthly online by Metademic.",
        aims: [
            "Acoustics and Vibrations",
            "Applied Biosciences and Bioengineering",
            "Applied Dentistry",
            "Applied Materials",
            "Computing and Artificial Intelligence"
        ]
    }
};

export function generateStaticParams() {
    return Object.keys(journalDatabase).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const journal = journalDatabase[slug];
    
    if (!journal) {
        return { title: 'Journal Not Found | Metademic' };
    }

    return {
        title: `${journal.name} | An Open Access Journal by Metademic`,
        description: journal.description,
    };
}

export default async function JournalHomePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const journal = journalDatabase[slug];

    if (!journal) {
        notFound();
    }

    // Mock recent articles
    const recentArticles = [
        {
            title: "Advancements in Machine Learning for Predictive Modeling in Healthcare",
            authors: "Sarah Johnson, Michael Chen, David Smith",
            type: "Article",
            date: "17 Mar 2026",
            views: 1240,
            downloads: 385
        },
        {
            title: "A Comprehensive Review of Renewable Energy Storage Solutions in Urban Environments",
            authors: "Elena Rodriguez, James Wilson",
            type: "Review",
            date: "15 Mar 2026",
            views: 3100,
            downloads: 890
        },
        {
            title: "Evaluating the Impact of Microplastics on Marine Biodiversity Ecosystems",
            authors: "Robert Taylor, Anna Kowalski, Li Wei",
            type: "Article",
            date: "12 Mar 2026",
            views: 950,
            downloads: 210
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Journal Hero Section */}
            <div className="bg-[#1a252f] text-white pt-10 pb-12 relative overflow-hidden" style={{ borderBottom: `4px solid ${journal.color}` }}>
                {/* Background Decor */}
                <div 
                    className="absolute right-0 top-0 w-96 h-96 opacity-10 -mr-24 -mt-24 rounded-full blur-3xl mix-blend-screen"
                    style={{ backgroundColor: journal.color }}
                ></div>

                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    {/* Journal Logo/Acronym Block */}
                    <div 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center text-white text-3xl md:text-4xl font-extrabold shadow-2xl flex-shrink-0 border-2 border-white/20"
                        style={{ backgroundColor: journal.color }}
                    >
                        {journal.acronym}
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
                            {journal.name}
                        </h1>
                        <p className="text-white/70 text-[15px] max-w-3xl mb-4 leading-relaxed line-clamp-2">
                            {journal.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/90">
                            <span className="flex items-center gap-1.5 font-bold"><BookOpen size={16} className="opacity-80" /> ISSN: {journal.issn}</span>
                            <span className="flex items-center gap-1.5 font-bold"><TrendingUp size={16} className="text-green-400" /> Impact Factor: {journal.impactFactor}</span>
                            <span className="flex items-center gap-1.5 font-bold"><Star size={16} className="text-yellow-400" /> CiteScore: {journal.citeScore}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <Link 
                            href="/submit"
                            className="block w-full text-center px-8 py-4 bg-mdpi-green hover:bg-emerald-600 text-white font-extrabold rounded shadow-lg transition-all hover:-translate-y-1 text-[16px]"
                        >
                            Submit to {journal.acronym}
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
                        <span><strong>APC:</strong> {journal.apc}</span>
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
                                {journal.description} It provides an advanced forum for studies related to its core disciplines. Our aim is to encourage scientists to publish their experimental and theoretical results in as much detail as possible.
                            </p>
                            <h3 className="font-extrabold text-mdpi-text-dark mb-3 text-[15px]">Subject areas include, but are not limited to:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-[13px] text-mdpi-gray-text font-medium">
                                {journal.aims.map((aim, idx) => (
                                    <li key={idx} className="marker:text-mdpi-blue">{aim}</li>
                                ))}
                            </ul>
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
                                {recentArticles.map((article, idx) => (
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
