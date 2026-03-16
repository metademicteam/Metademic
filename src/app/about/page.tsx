import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { Info, Mail, Briefcase, Newspaper, Camera, Edit3, ArrowRight } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "About Metademic | Open Access Publishing",
    description: "Learn about Metademic, an academic open-access publisher driven by the mission to foster open scientific exchange across all disciplines.",
};

const aboutSections = [
    {
        title: "Overview",
        slug: "overview",
        description: "Learn about our history, mission, and the core values that drive Metademic's open access publishing initiatives.",
        icon: Info,
        color: "text-mdpi-blue"
    },
    {
        title: "Contact Us",
        slug: "contact",
        description: "Get in touch with our editorial offices, support team, or find our global office locations.",
        icon: Mail,
        color: "text-mdpi-green"
    },
    {
        title: "Careers",
        slug: "careers",
        description: "Join our international team. Explore current job openings in editorial, IT, marketing, and management.",
        icon: Briefcase,
        color: "text-amber-600"
    },
    {
        title: "News",
        slug: "news",
        description: "Stay updated with the latest announcements, milestones, and developments from Metademic.",
        icon: Newspaper,
        color: "text-purple-600"
    },
    {
        title: "Press",
        slug: "press",
        description: "Access official press releases, media kits, and corporate announcements for public relation matters.",
        icon: Camera,
        color: "text-rose-600"
    },
    {
        title: "Blog",
        slug: "blog",
        description: "Read insights, interviews, and articles from our editors and the wider scientific community.",
        icon: Edit3,
        color: "text-teal-600"
    }
];

export default function AboutLandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-[#1a252f] text-white py-16 relative overflow-hidden border-b-4 border-mdpi-blue">
                <div className="absolute inset-0 bg-gradient-to-r from-mdpi-blue-dark to-transparent opacity-50 z-0"></div>
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            About Metademic
                        </h1>
                        <p className="text-[17px] text-white/80 leading-relaxed mb-6">
                            A pioneer in scholarly, open access publishing, Metademic has supported academic communities since its inception. Based in Switzerland with editorial and production teams worldwide, we are dedicated to fostering open scientific exchange across all disciplines.
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                href="/about/overview" 
                                className="px-6 py-3 bg-mdpi-blue hover:bg-mdpi-blue-dark text-white font-bold rounded shadow-lg transition-colors inline-block"
                            >
                                Read Full Overview
                            </Link>
                        </div>
                    </div>
                    {/* Visual Graphic */}
                    <div className="hidden lg:block relative w-64 h-64 bg-white/5 rounded-full border border-white/10 flex items-center justify-center p-8 backdrop-blur-sm shadow-xl">
                        <Info size={100} className="text-white opacity-80" />
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
                        <div>
                            <h2 className="text-[22px] font-extrabold text-mdpi-text-dark mb-6 border-b border-mdpi-border pb-2">
                                Corporate Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {aboutSections.map((section, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={`/about/${section.slug}`}
                                        className="bg-white rounded border border-mdpi-border p-6 shadow-sm hover:shadow-md transition-all group no-underline"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-lg bg-mdpi-gray-bg group-hover:bg-white border border-transparent group-hover:border-mdpi-border transition-colors ${section.color}`}>
                                                <section.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-extrabold text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors flex items-center gap-1.5 mb-2">
                                                    {section.title}
                                                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-mdpi-blue" />
                                                </h3>
                                                <p className="text-[13px] text-mdpi-gray-text leading-relaxed">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Metademic Facts Section */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-6 text-center">
                                Metademic at a Glance
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x divide-mdpi-border">
                                <div className="pl-0 border-l-0">
                                    <div className="text-3xl md:text-4xl font-extrabold text-mdpi-blue mb-2">500+</div>
                                    <div className="text-[12px] text-mdpi-gray-text font-bold uppercase tracking-wide">Open Access Journals</div>
                                </div>
                                <div className="pl-6">
                                    <div className="text-3xl md:text-4xl font-extrabold text-mdpi-green mb-2">2M+</div>
                                    <div className="text-[12px] text-mdpi-gray-text font-bold uppercase tracking-wide">Published Articles</div>
                                </div>
                                <div className="pl-6 mt-6 lg:mt-0 border-t lg:border-t-0 border-l lg:border-l pt-6 lg:pt-0 border-mdpi-border">
                                    <div className="text-3xl md:text-4xl font-extrabold text-amber-500 mb-2">15+</div>
                                    <div className="text-[12px] text-mdpi-gray-text font-bold uppercase tracking-wide">Global Offices</div>
                                </div>
                                <div className="pl-6 mt-6 lg:mt-0 border-t lg:border-t-0 border-l pt-6 lg:pt-0 border-mdpi-border">
                                    <div className="text-3xl md:text-4xl font-extrabold text-purple-500 mb-2">24/7</div>
                                    <div className="text-[12px] text-mdpi-gray-text font-bold uppercase tracking-wide">Author Support</div>
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
