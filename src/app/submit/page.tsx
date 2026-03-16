import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { 
    UploadCloud, 
    FileCheck, 
    UserCheck, 
    AlertTriangle, 
    FileText, 
    HelpCircle, 
    CheckCircle,
    ArrowRight
} from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Submit Manuscript | Metademic Submission System",
    description: "Submit your manuscript to a Metademic open access journal. Fast and rigorous peer-review process.",
};

const submissionSteps = [
    {
        title: "1. Select a Journal",
        description: "Review our journal portfolio and find the best match for your research scope and audience.",
        icon: FileText
    },
    {
        title: "2. Prepare Manuscript",
        description: "Ensure your paper follows our formatting guidelines, ethical standards, and includes all necessary supplementary files.",
        icon: FileCheck
    },
    {
        title: "3. Login to Susy",
        description: "Create an account or login to the Metademic Submission System (SuSy) using your ORCID iD or email.",
        icon: UserCheck
    },
    {
        title: "4. Upload & Submit",
        description: "Upload your manuscript files, enter author details, and finalize your submission for editorial check.",
        icon: UploadCloud
    }
];

export default function SubmitPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-[#1a252f] relative overflow-hidden text-white border-b-4 border-mdpi-blue">
                <div className="absolute inset-0 bg-gradient-to-r from-mdpi-blue-dark to-transparent opacity-50 z-0"></div>
                <div className="max-w-[1280px] mx-auto px-4 py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-white/10 text-white rounded text-[11px] font-extrabold uppercase tracking-widest mb-4 border border-white/20">SuSy Portal</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                            Metademic Submission System
                        </h1>
                        <p className="text-[17px] text-white/80 leading-relaxed mb-8">
                            Welcome to SuSy, Metademic&apos;s centralized manuscript submission and editorial tracking system. Fast, intuitive, and designed to streamline your publication journey.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href="/login" 
                                className="px-8 py-3.5 bg-mdpi-green hover:bg-emerald-600 text-white font-extrabold rounded shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                Submit Manuscript <ArrowRight size={18} />
                            </Link>
                            <Link 
                                href="/information/authors" 
                                className="px-8 py-3.5 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded transition-all"
                            >
                                Instructions for Authors
                            </Link>
                        </div>
                    </div>
                    {/* Visual Graphic */}
                    <div className="hidden lg:block relative w-64 h-64 bg-mdpi-blue/20 rounded-full border-8 border-white/5 flex items-center justify-center shadow-2xl">
                        <UploadCloud size={100} className="text-white opacity-80" />
                        <div className="absolute -bottom-4 -right-4 bg-mdpi-green w-16 h-16 rounded-full border-4 border-[#1a252f] flex items-center justify-center">
                            <CheckCircle size={24} className="text-white" />
                        </div>
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
                        {/* Important Notices */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded shadow-sm">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="font-extrabold text-yellow-800 text-[15px] mb-2">Before You Submit</h3>
                                    <ul className="list-disc pl-5 text-[13px] text-yellow-800/80 space-y-1.5">
                                        <li>Ensure all authors have approved the final manuscript and agreed to its submission to the chosen journal.</li>
                                        <li>Verify that the manuscript is not under consideration by any other journal.</li>
                                        <li>Review our <Link href="/information/research-and-publication-ethics" className="font-bold underline text-yellow-900">Research and Publication Ethics Guidelines</Link> to avoid accidental plagiarism, data fabrication, or authorship disputes.</li>
                                        <li>Have your Cover Letter and all Supplementary Files ready for upload.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submission Steps */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm">
                            <h2 className="text-2xl font-extrabold text-mdpi-text-dark mb-8 text-center border-b border-mdpi-border pb-4">
                                Simple 4-Step Submission Process
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {submissionSteps.map((step, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="w-12 h-12 bg-mdpi-gray-bg rounded-lg flex items-center justify-center text-mdpi-blue mb-4 group-hover:bg-mdpi-blue group-hover:text-white transition-colors border border-mdpi-border group-hover:border-mdpi-blue font-extrabold text-xl shadow-sm">
                                            <step.icon size={24} />
                                        </div>
                                        {idx !== submissionSteps.length - 1 && (
                                            <div className="hidden lg:block absolute top-6 left-12 right-0 h-px bg-mdpi-border w-[calc(100%-24px)] group-hover:bg-mdpi-blue/30 transition-colors"></div>
                                        )}
                                        <h4 className="font-extrabold text-mdpi-text-dark text-[15px] mb-2">{step.title}</h4>
                                        <p className="text-[13px] text-mdpi-gray-text leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded border border-mdpi-border p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-[16px] font-extrabold text-mdpi-blue mb-3 flex items-center gap-2">
                                    <UserCheck size={18} /> ORCID Integration
                                </h3>
                                <p className="text-[13px] text-mdpi-gray-text leading-relaxed mb-4">
                                    Metademic encourages all authors to connect their ORCID iD during the submission process. This ensures your work is accurately attributed and synchronized with your professional record upon publication.
                                </p>
                                <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-mdpi-link-blue hover:underline">Learn more about ORCID &raquo;</a>
                            </div>

                            <div className="bg-white rounded border border-mdpi-border p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-[16px] font-extrabold text-mdpi-blue mb-3 flex items-center gap-2">
                                    <HelpCircle size={18} /> Need Help?
                                </h3>
                                <p className="text-[13px] text-mdpi-gray-text leading-relaxed mb-4">
                                    Encountering technical issues with the SuSy portal? Our editorial support team is available around the clock to assist you with upload issues, format queries, or manuscript tracking.
                                </p>
                                <a href="mailto:support@metademic.com" className="text-[13px] font-bold text-mdpi-link-blue hover:underline">Contact Editorial Support &raquo;</a>
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
