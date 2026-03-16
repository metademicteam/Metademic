import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Info, BookOpen, Users, DollarSign, Award, ShieldCheck } from 'lucide-react';
import { notFound } from "next/navigation";

export const revalidate = 86400; // ISR validation every 24 hours

const pageData: Record<string, { title: string, content: React.ReactNode, icon: any }> = {
    'authors': {
        title: "Information for Authors",
        icon: Users,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Guidelines for Preparing and Submitting Your Manuscript</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    Metademic provides researchers with a fast, rigorous, and efficient peer-review process. Our open access model ensures that your research gains maximum visibility and impact worldwide immediately upon publication.
                </p>
                <h4 className="font-bold mb-2">1. Manuscript Submission</h4>
                <p className="mb-4 text-mdpi-gray-text">
                    All manuscripts must be submitted through our centralized submission portal. Prior to submission, please ensure your manuscript adheres to our formatting guidelines and ethical standards.
                </p>
                <h4 className="font-bold mb-2">2. Peer-Review Process</h4>
                <p className="mb-4 text-mdpi-gray-text">
                    We employ a double-blind peer-review process. Upon submission, an initial quality check is performed, followed by assignment to independent expert reviewers in the field.
                </p>
            </>
        )
    },
    'reviewers': {
        title: "Information for Reviewers",
        icon: ShieldCheck,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Guidelines and Benefits for Metademic Reviewers</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    Peer-review is the cornerstone of scientific publishing. Metademic relies on the dedication and expertise of our reviewers to maintain the high quality of our journals.
                </p>
                <ul className="list-disc pl-6 mb-4 text-mdpi-gray-text space-y-2">
                    <li>Receive discount vouchers for future APCs when you submit your own papers.</li>
                    <li>Personalized reviewer certificates.</li>
                    <li>Acknowledgment in the journal's annual reviewer list.</li>
                </ul>
            </>
        )
    },
    'editors': {
        title: "Information for Editors",
        icon: BookOpen,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Editorial Board Responsibilities</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    Editorial Board Members play a vital role in steering the direction of Metademic journals. They are responsible for making final decisions on manuscripts, soliciting high-quality papers, and suggesting special issues.
                </p>
            </>
        )
    },
    'librarians': {
        title: "Information for Librarians",
        icon: LibraryIcon,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Institutional Support and Access</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    Metademic supports the transition toward full open access. We collaborate closely with libraries through our Institutional Open Access Program (IOAP), which offers reduced Article Processing Charges (APCs) for affiliated researchers.
                </p>
            </>
        )
    },
    'open-access-policy': {
        title: "Open Access Policy",
        icon: GlobeIcon,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Our Commitment to Open Science</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    All articles published by Metademic are immediately available worldwide under an open access license. This means:
                </p>
                <ul className="list-disc pl-6 mb-4 text-mdpi-gray-text space-y-2">
                    <li>Everyone has free and unlimited access to the full-text of all articles published in Metademic journals.</li>
                    <li>Everyone is free to re-use the published material given proper accreditation/citation.</li>
                    <li>Open access publication is supported by the authors' institutes or research funding agencies.</li>
                </ul>
            </>
        )
    },
    'article-processing-charges': {
        title: "Article Processing Charges (APC)",
        icon: DollarSign,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Transparent Publishing Costs</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    To provide open access, Metademic journals use a business model in which our expenses—including those of peer review, journal production, and online hosting and archiving—are recovered by charging an Article Processing Charge (APC) to the authors or their institutions. 
                </p>
                <p className="text-mdpi-gray-text font-bold">
                    There are no submission charges.
                </p>
            </>
        )
    },
    'awards': {
        title: "Awards",
        icon: Award,
        content: (
            <>
                <h3 className="text-xl font-bold mb-4 text-mdpi-text-dark text-mdpi-blue border-b border-mdpi-border pb-2">Recognizing Excellence</h3>
                <p className="mb-4 text-mdpi-gray-text">
                    Metademic sponsors various awards to support scientific research and recognize excellence across multiple disciplines. Our awards include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-mdpi-gray-text space-y-2">
                    <li>Young Investigator Awards</li>
                    <li>Best Paper Awards</li>
                    <li>Travel Awards</li>
                    <li>Outstanding Reviewer Awards</li>
                </ul>
            </>
        )
    }
    // Add fallback for others...
};

// Extraneous icons for demo
function LibraryIcon(props: any) { return <BookOpen {...props} /> }
function GlobeIcon(props: any) { return <Info {...props} /> }

export function generateStaticParams() {
    return [
        { slug: 'authors' },
        { slug: 'reviewers' },
        { slug: 'editors' },
        { slug: 'librarians' },
        { slug: 'publishers' },
        { slug: 'societies' },
        { slug: 'conference-organizers' },
        { slug: 'open-access-policy' },
        { slug: 'institutional-open-access-program' },
        { slug: 'special-issues-guidelines' },
        { slug: 'editorial-process' },
        { slug: 'research-and-publication-ethics' },
        { slug: 'article-processing-charges' },
        { slug: 'awards' },
        { slug: 'testimonials' },
    ];
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const pageInfo = pageData[slug] || {
        title: `Information regarding ${slug.replace(/-/g, ' ')}`,
        icon: Info,
        content: (
            <>
                <p className="text-mdpi-gray-text">Detailed information and guidelines for this section are being updated to reflect the latest Metademic policies.</p>
            </>
        )
    };

    const Icon = pageInfo.icon;

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-gradient-to-r from-[#1a252f] to-mdpi-blue-dark py-12 text-white border-b-4 border-mdpi-blue">
                <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                        <Icon size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold capitalize">{pageInfo.title.toLowerCase()}</h1>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white p-8 rounded border border-mdpi-border shadow-sm">
                            {pageInfo.content}
                            
                            <div className="mt-8 pt-6 border-t border-mdpi-border bg-mdpi-gray-bg/50 p-4 rounded text-[13px] text-mdpi-gray-text">
                                <strong>Need further assistance?</strong> Contact our support team at <a href="mailto:support@metademic.com" className="text-mdpi-link-blue hover:underline">support@metademic.com</a>
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
