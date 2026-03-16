import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Info, Mail, Briefcase, Newspaper, Camera, Edit3 } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

const pageData: Record<string, { title: string, content: React.ReactNode, icon: React.ElementType }> = {
    'overview': {
        title: "Overview",
        icon: Info,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">About Metademic</h3>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    A pioneer in scholarly, open access publishing, Metademic has supported academic communities since its inception. Based in Dhaka, Bangladesh with editorial and production teams around the world, Metademic pursues its mission to foster open scientific exchange across all disciplines.
                </p>
                <h4 className="font-bold mb-2">Our Mission</h4>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    Our mission is to foster open scientific exchange in all forms, across all disciplines. We do this by ensuring that the latest research findings are freely available, and that authors receive rigorous, constructive, and speedy peer-review.
                </p>
            </>
        )
    },
    'contact': {
        title: "Contact Us",
        icon: Mail,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Get in Touch with Metademic</h3>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    For general inquiries, editorial questions, or technical support, please refer to the contact options below.
                </p>
                <div className="bg-mdpi-gray-bg/50 p-6 rounded border border-mdpi-border grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="font-bold text-mdpi-text-dark">Editorial Office</h5>
                        <p className="text-mdpi-gray-text mt-2 text-[13px]">
                            House 12, Road 4, Dhanmondi<br />
                            Dhaka 1205, Bangladesh<br />
                            <a href="mailto:support@metademic.com" className="text-mdpi-blue hover:underline">support@metademic.com</a>
                        </p>
                    </div>
                </div>
            </>
        )
    },
    'careers': {
        title: "Careers",
        icon: Briefcase,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Join Our Global Team</h3>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    At Metademic, we are dedicated to academic publishing. Are you highly motivated, detail-oriented, and looking to forge a career within academic open access publishing? We are always seeking talented individuals to join our international offices.
                </p>
                <button className="px-6 py-2 bg-mdpi-blue text-white font-bold rounded shadow hover:bg-mdpi-blue-dark transition-colors">
                    View Open Positions
                </button>
            </>
        )
    },
    'news': {
        title: "News",
        icon: Newspaper,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Latest Updates</h3>
                <ul className="space-y-4">
                    <li className="p-4 border border-mdpi-border rounded hover:bg-mdpi-gray-bg/50 transition-colors">
                        <span className="text-[12px] text-mdpi-gray-text font-bold">March 17, 2026</span>
                        <h5 className="font-bold text-mdpi-blue cursor-pointer hover:underline text-[15px] mt-1">Metademic Surpasses 500 Open Access Journals</h5>
                        <p className="text-[13px] text-mdpi-gray-text mt-2">A major milestone representing our continuous growth and commitment to global researchers.</p>
                    </li>
                    <li className="p-4 border border-mdpi-border rounded hover:bg-mdpi-gray-bg/50 transition-colors">
                        <span className="text-[12px] text-mdpi-gray-text font-bold">February 28, 2026</span>
                        <h5 className="font-bold text-mdpi-blue cursor-pointer hover:underline text-[15px] mt-1">New API Tools Released for Institutional Partners</h5>
                        <p className="text-[13px] text-mdpi-gray-text mt-2">Simplifying the integration of publication metrics for IOAP libraries.</p>
                    </li>
                </ul>
            </>
        )
    },
    'press': {
        title: "Press",
        icon: Camera,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Press Releases</h3>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    View official statements, announcements, and media assets regarding Metademic.
                </p>
            </>
        )
    },
    'blog': {
        title: "Blog",
        icon: Edit3,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Metademic Blog</h3>
                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                    Read the latest insights from our editorial team, author interviews, and discussions on open science.
                </p>
            </>
        )
    }
};

export function generateStaticParams() {
    return [
        { slug: 'overview' },
        { slug: 'contact' },
        { slug: 'careers' },
        { slug: 'news' },
        { slug: 'press' },
        { slug: 'blog' },
    ];
}

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const pageInfo = pageData[slug] || {
        title: `About ${slug.replace(/-/g, ' ')}`,
        icon: Info,
        content: (
            <>
                <p className="text-mdpi-gray-text leading-relaxed">More information about {slug.replace(/-/g, ' ')} will be available soon.</p>
            </>
        )
    };

    const Icon = pageInfo.icon;

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-[#1a252f] py-16 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mdpi-blue opacity-5 -mr-32 -mt-32 rounded-full"></div>
                <div className="max-w-[800px] mx-auto px-4 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-mdpi-blue/20 rounded-full">
                            <Icon size={48} className="text-mdpi-blue-light" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4 tracking-tight">{pageInfo.title}</h1>
                    <p className="text-[16px] text-white/70">
                        Learn more about Metademic&apos;s heritage, services, and commitment to the academic community.
                    </p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white p-8 md:p-10 rounded shadow-sm border border-mdpi-border">
                            {pageInfo.content}
                            
                            <div className="mt-10 pt-6 border-t border-mdpi-border flex items-center justify-between text-[13px] text-mdpi-gray-text">
                                <span>Stay connected with Metademic</span>
                                <div className="flex gap-4">
                                    <a href="#" className="hover:text-mdpi-blue transition-colors">Twitter</a>
                                    <a href="#" className="hover:text-mdpi-blue transition-colors">LinkedIn</a>
                                </div>
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
