import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { BookMarked, FlaskConical, Stethoscope, Microscope, Settings, LeafyGreen, Monitor, Atom } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Browse by Subject | Metademic Journals",
    description: "Browse Metademic open access journals categorized by scientific subject and discipline.",
};

const subjectsData = [
    {
        name: "Biology & Life Sciences",
        icon: Microscope,
        journals: [
            { name: "Biology", acronym: "BI", count: 840, color: "#1b5e20" },
            { name: "Cells", acronym: "CE", count: 1250, color: "#e91e63" },
            { name: "Life", acronym: "LI", count: 680, color: "#26a69a" },
            { name: "Microorganisms", acronym: "MI", count: 910, color: "#9c27b0" }
        ]
    },
    {
        name: "Chemistry & Materials Science",
        icon: FlaskConical,
        journals: [
            { name: "Molecules", acronym: "MO", count: 2400, color: "#00bcd4" },
            { name: "Materials", acronym: "MT", count: 1850, color: "#3f51b5" },
            { name: "Polymers", acronym: "PO", count: 720, color: "#ff9800" },
            { name: "IJMS", acronym: "IJ", count: 3100, color: "#9c27b0" }
        ]
    },
    {
        name: "Medicine & Pharmacology",
        icon: Stethoscope,
        journals: [
            { name: "JCM", acronym: "JC", count: 1100, color: "#2196f3" },
            { name: "Cancers", acronym: "CA", count: 1650, color: "#f44336" },
            { name: "Nutrients", acronym: "NU", count: 1340, color: "#8bc34a" },
            { name: "Pharmaceuticals", acronym: "PH", count: 890, color: "#607d8b" }
        ]
    },
    {
        name: "Engineering",
        icon: Settings,
        journals: [
            { name: "Applied Sciences", acronym: "AS", count: 2150, color: "#e91e63" },
            { name: "Sensors", acronym: "SE", count: 1870, color: "#ff9800" },
            { name: "Energies", acronym: "EN", count: 1420, color: "#ff5722" },
            { name: "Actuators", acronym: "AC", count: 320, color: "#3f51b5" }
        ]
    },
    {
        name: "Environmental & Earth Sciences",
        icon: LeafyGreen,
        journals: [
            { name: "Sustainability", acronym: "SU", count: 3400, color: "#4caf50" },
            { name: "Water", acronym: "WA", count: 1250, color: "#03a9f4" },
            { name: "Remote Sensing", acronym: "RS", count: 1120, color: "#009688" },
            { name: "Atmosphere", acronym: "AT", count: 480, color: "#00bcd4" }
        ]
    },
    {
        name: "Computer Science & Mathematics",
        icon: Monitor,
        journals: [
            { name: "Mathematics", acronym: "MA", count: 850, color: "#607d8b" },
            { name: "Information", acronym: "IN", count: 420, color: "#2196f3" },
            { name: "Entropy", acronym: "ET", count: 680, color: "#ff9800" },
            { name: "Algorithms", acronym: "AL", count: 290, color: "#9c27b0" }
        ]
    },
    {
        name: "Physical Sciences",
        icon: Atom,
        journals: [
            { name: "Physics", acronym: "PH", count: 310, color: "#3f51b5" },
            { name: "Universe", acronym: "UN", count: 240, color: "#673ab7" },
            { name: "Quantum", acronym: "QU", count: 180, color: "#ff5722" },
            { name: "Photonics", acronym: "PT", count: 520, color: "#e91e63" }
        ]
    }
];

export default function BrowseBySubjectPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-[#1a252f] text-white py-12 relative overflow-hidden border-b-4 border-mdpi-green">
                <div className="absolute right-0 top-0 w-64 h-64 bg-mdpi-green opacity-10 -mr-16 -mt-16 rounded-full blur-3xl"></div>
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <BookMarked size={32} className="text-mdpi-green" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Browse by Subject</h1>
                        <p className="text-[15px] text-white/80 max-w-2xl">
                            Explore our comprehensive portfolio of peer-reviewed, open access journals categorized by major scientific disciplines and research areas.
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
                    <div className="flex-1 min-w-0 space-y-6">
                        
                        {/* Subject Navigation Jump Links */}
                        <div className="bg-white border border-mdpi-border rounded shadow-sm p-5 mb-8 flex flex-wrap gap-2">
                            {subjectsData.map((subject, idx) => (
                                <a 
                                    key={idx} 
                                    href={`#subj-${idx}`}
                                    className="px-3 py-1.5 bg-mdpi-gray-bg border border-mdpi-border rounded-full text-[12px] font-bold text-mdpi-gray-text hover:bg-mdpi-blue hover:text-white hover:border-mdpi-blue transition-colors no-underline flex items-center gap-1.5 whitespace-nowrap"
                                >
                                    <subject.icon size={12} />
                                    {subject.name}
                                </a>
                            ))}
                        </div>

                        {subjectsData.map((subject, idx) => (
                            <div key={idx} id={`subj-${idx}`} className="bg-white border border-mdpi-border rounded shadow-sm overflow-hidden scroll-mt-24">
                                <div className="bg-gradient-to-r from-mdpi-gray-bg to-white px-6 py-4 border-b border-mdpi-border flex items-center gap-3">
                                    <div className="bg-mdpi-blue/10 p-2 rounded-lg text-mdpi-blue">
                                        <subject.icon size={22} />
                                    </div>
                                    <h2 className="text-xl font-extrabold text-mdpi-text-dark">
                                        {subject.name}
                                    </h2>
                                </div>
                                <div className="p-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-px bg-mdpi-border">
                                        {subject.journals.map((journal, jIdx) => (
                                            <Link 
                                                key={jIdx} 
                                                href={`/journal/${journal.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="bg-white p-5 flex flex-col justify-center items-center text-center hover:bg-mdpi-blue/[0.03] transition-colors group no-underline relative overflow-hidden"
                                            >
                                                <div 
                                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-[15px] font-extrabold shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform flex-shrink-0 mb-3"
                                                    style={{ backgroundColor: journal.color }}
                                                >
                                                    {journal.acronym}
                                                </div>
                                                <h4 className="font-bold text-[14px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors line-clamp-1 w-full truncate">
                                                    {journal.name}
                                                </h4>
                                                <div className="flex items-center gap-1 mt-1 text-[11px] text-mdpi-gray-text font-medium bg-mdpi-gray-bg px-2 py-0.5 rounded-full mt-2">
                                                    {journal.count.toLocaleString()} Articles
                                                </div>
                                                
                                                {/* Decorative underline on hover */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-mdpi-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                            </Link>
                                        ))}
                                    </div>
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
