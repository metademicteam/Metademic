import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Browse by Indexing | Metademic Journals",
    description: "Browse Metademic open access journals categorized by major indexing databases like Web of Science, Scopus, and PubMed.",
};

const indexingData = [
    {
        name: "Web of Science (Clarivate)",
        description: "Journals indexed in Science Citation Index Expanded (SCIE), Social Sciences Citation Index (SSCI), Arts & Humanities Citation Index (AHCI), or Emerging Sources Citation Index (ESCI).",
        journals: [
            { name: "Sustainability", acronym: "SU", impactFactor: "3.8", color: "#4caf50" },
            { name: "Sensors", acronym: "SE", impactFactor: "3.9", color: "#ff9800" },
            { name: "IJMS", acronym: "IJ", impactFactor: "5.6", color: "#9c27b0" },
            { name: "Energies", acronym: "EN", impactFactor: "3.2", color: "#ff5722" },
            { name: "Cancers", acronym: "CA", impactFactor: "5.2", color: "#f44336" }
        ]
    },
    {
        name: "Scopus (Elsevier)",
        description: "Journals included in the Scopus abstract and citation database.",
        journals: [
            { name: "Applied Sciences", acronym: "AS", impactFactor: "2.7", color: "#e91e63" },
            { name: "JCM", acronym: "JC", impactFactor: "3.9", color: "#2196f3" },
            { name: "Mathematics", acronym: "MA", impactFactor: "2.4", color: "#607d8b" },
            { name: "Foods", acronym: "FO", impactFactor: "3.0", color: "#ff6f00" },
            { name: "Molecules", acronym: "MO", impactFactor: "4.6", color: "#00bcd4" }
        ]
    },
    {
        name: "PubMed / MEDLINE (NLM)",
        description: "Life sciences and biomedical topics journals indexed in PubMed Central (PMC) or MEDLINE.",
        journals: [
            { name: "Nutrients", acronym: "NU", impactFactor: "5.9", color: "#8bc34a" },
            { name: "Healthcare", acronym: "HE", impactFactor: "2.8", color: "#5c6bc0" },
            { name: "Life", acronym: "LI", impactFactor: "3.2", color: "#26a69a" },
            { name: "IJMS", acronym: "IJ", impactFactor: "5.6", color: "#9c27b0" },
            { name: "Cancers", acronym: "CA", impactFactor: "5.2", color: "#f44336" }
        ]
    },
    {
        name: "DOAJ (Directory of Open Access Journals)",
        description: "High quality, open access, peer-reviewed journals approved by DOAJ.",
        journals: [
            { name: "Sustainability", acronym: "SU", impactFactor: "3.8", color: "#4caf50" },
            { name: "Materials", acronym: "MT", impactFactor: "3.4", color: "#3f51b5" },
            { name: "Plants", acronym: "PL", impactFactor: "4.5", color: "#2e7d32" },
            { name: "Water", acronym: "WA", impactFactor: "3.5", color: "#03a9f4" },
            { name: "Remote Sensing", acronym: "RS", impactFactor: "5.0", color: "#009688" }
        ]
    }
];

export default function BrowseByIndexingPage() {
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
                                    Metademic continuously applies to new indexes to ensure maximum exposure for our authors. Currently, over 95% of our published articles are indexed in the Web of Science Core Collection and Scopus.
                                </p>
                            </div>
                        </div>

                        {indexingData.map((db, idx) => (
                            <div key={idx} className="bg-white border border-mdpi-border rounded shadow-sm overflow-hidden">
                                <div className="bg-mdpi-gray-bg/50 px-6 py-4 border-b border-mdpi-border">
                                    <h2 className="text-lg font-extrabold text-mdpi-text-dark md:flex items-center gap-2">
                                        <Database size={18} className="text-mdpi-blue hidden md:inline" />
                                        {db.name}
                                    </h2>
                                    <p className="text-[13px] text-mdpi-gray-text mt-1">{db.description}</p>
                                </div>
                                <div className="p-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:gap-px bg-mdpi-border">
                                        {db.journals.map((journal, jIdx) => (
                                            <Link 
                                                key={jIdx} 
                                                href={`/journal/${journal.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="bg-white p-4 flex items-center gap-4 hover:bg-mdpi-blue/[0.03] transition-colors group no-underline"
                                            >
                                                <div 
                                                    className="w-10 h-10 rounded-md flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm group-hover:scale-105 transition-transform flex-shrink-0"
                                                    style={{ backgroundColor: journal.color }}
                                                >
                                                    {journal.acronym}
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
                                <div className="bg-mdpi-gray-bg/30 px-6 py-3 border-t border-mdpi-border text-center">
                                    <button className="text-[13px] font-bold text-mdpi-link-blue hover:underline">View all {db.name} mapped journals</button>
                                </div>
                            </div>
                        ))}
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
