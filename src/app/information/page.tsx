import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { 
    Users, 
    ShieldCheck, 
    BookOpen, 
    Library, 
    Building2, 
    Presentation, 
    Globe, 
    Landmark, 
    FileText, 
    GitMerge, 
    Scale, 
    DollarSign, 
    Award, 
    MessageSquare,
    Network,
    ArrowRight
} from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Information & Guidelines | Metademic",
    description: "Access comprehensive guidelines, policies, and information for authors, reviewers, editors, and institutional partners of Metademic.",
};

const informationCategories = [
    {
        title: "For Authors",
        slug: "authors",
        description: "Submit your manuscript, understand the editorial process, and see formatting guidelines.",
        icon: Users,
        color: "text-mdpi-blue"
    },
    {
        title: "For Reviewers",
        slug: "reviewers",
        description: "Learn about the benefits and responsibilities of peer-reviewing for Metademic journals.",
        icon: ShieldCheck,
        color: "text-mdpi-green"
    },
    {
        title: "For Editors",
        slug: "editors",
        description: "Guidelines and responsibilities for Editorial Board Members and Guest Editors.",
        icon: BookOpen,
        color: "text-purple-600"
    },
    {
        title: "For Librarians",
        slug: "librarians",
        description: "Information regarding access, archiving, and institutional support services.",
        icon: Library,
        color: "text-amber-600"
    },
    {
        title: "For Publishers",
        slug: "publishers",
        description: "Explore opportunities for publishing partnerships and journal transitions.",
        icon: Building2,
        color: "text-slate-600"
    },
    {
        title: "For Societies",
        slug: "societies",
        description: "Collaborative publishing models and benefits for academic societies.",
        icon: Network,
        color: "text-rose-600"
    },
    {
        title: "For Conference Organizers",
        slug: "conference-organizers",
        description: "Publish your conference proceedings or organize special issues with us.",
        icon: Presentation,
        color: "text-teal-600"
    }
];

const policyResources = [
    {
        title: "Open Access Policy",
        slug: "open-access-policy",
        icon: Globe
    },
    {
        title: "Institutional Open Access Program",
        slug: "institutional-open-access-program",
        icon: Landmark
    },
    {
        title: "Special Issues Guidelines",
        slug: "special-issues-guidelines",
        icon: FileText
    },
    {
        title: "Editorial Process",
        slug: "editorial-process",
        icon: GitMerge
    },
    {
        title: "Research and Publication Ethics",
        slug: "research-and-publication-ethics",
        icon: Scale
    },
    {
        title: "Article Processing Charges",
        slug: "article-processing-charges",
        icon: DollarSign
    },
    {
        title: "Awards",
        slug: "awards",
        icon: Award
    },
    {
        title: "Testimonials",
        slug: "testimonials",
        icon: MessageSquare
    }
];

export default function InformationLandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-[#1a252f] text-white py-16 relative overflow-hidden border-b-4 border-mdpi-blue">
                <div className="absolute inset-0 bg-gradient-to-r from-mdpi-blue-dark to-transparent opacity-50 z-0"></div>
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Information & Guidelines
                        </h1>
                        <p className="text-[17px] text-white/80 leading-relaxed mb-6">
                            Metademic is committed to providing transparent, comprehensive guidelines for all members of the academic community. From manuscript submission to comprehensive ethics policies, find the resources you need here.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href="/information/authors" 
                                className="px-6 py-3 bg-mdpi-blue hover:bg-mdpi-blue-dark text-white font-bold rounded shadow-lg transition-colors inline-block"
                            >
                                Submit & Author Guidelines
                            </Link>
                            <Link 
                                href="/information/open-access-policy" 
                                className="px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded transition-all inline-block"
                            >
                                Open Access Policy
                            </Link>
                        </div>
                    </div>
                    {/* Visual Graphic */}
                    <div className="hidden lg:block relative w-64 h-64 bg-white/5 rounded-full border border-white/10 flex items-center justify-center p-8 backdrop-blur-sm shadow-xl">
                        <BookOpen size={100} className="text-white opacity-80" />
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
                    <div className="flex-1 min-w-0 space-y-10">
                        
                        {/* Role-Based Guidelines Grid */}
                        <div>
                            <h2 className="text-[22px] font-extrabold text-mdpi-text-dark mb-6 border-b border-mdpi-border pb-2">
                                Guidelines by Role
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {informationCategories.map((category, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={`/information/${category.slug}`}
                                        className="bg-white rounded border border-mdpi-border p-6 shadow-sm hover:shadow-md transition-all group no-underline"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-lg bg-mdpi-gray-bg group-hover:bg-white border border-transparent group-hover:border-mdpi-border transition-colors ${category.color}`}>
                                                <category.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-extrabold text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors flex items-center gap-1.5 mb-2">
                                                    {category.title}
                                                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-mdpi-blue" />
                                                </h3>
                                                <p className="text-[13px] text-mdpi-gray-text leading-relaxed">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Policies & Resources List */}
                        <div>
                            <h2 className="text-[22px] font-extrabold text-mdpi-text-dark mb-6 border-b border-mdpi-border pb-2">
                                Policies & Resources
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {policyResources.map((policy, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={`/information/${policy.slug}`}
                                        className="bg-white rounded border border-mdpi-border p-4 shadow-sm hover:border-mdpi-blue hover:shadow-md transition-all flex items-center gap-3 group no-underline"
                                    >
                                        <div className="p-2 bg-mdpi-gray-bg rounded text-mdpi-gray-text group-hover:text-mdpi-blue transition-colors">
                                            <policy.icon size={18} />
                                        </div>
                                        <h3 className="text-[14px] font-bold text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors line-clamp-2">
                                            {policy.title}
                                        </h3>
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
