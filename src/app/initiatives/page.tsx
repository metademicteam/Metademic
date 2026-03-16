import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { TreePine, LockOpen, GraduationCap, Leaf, Presentation, Lightbulb } from 'lucide-react';
import Image from "next/image";

export const revalidate = 86400; // ISR validation every 24 hours

export default function InitiativesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-white border-b border-mdpi-border py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-mdpi-green/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-3 py-1 bg-mdpi-green/10 text-mdpi-green rounded text-[11px] font-extrabold uppercase tracking-widest mb-4"><Lightbulb size={12} className="inline mr-1" /> Expanding Horizons</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-mdpi-text-dark mb-4 tracking-tight">Metademic Initiatives</h1>
                    <p className="text-[17px] text-mdpi-gray-text leading-relaxed max-w-2xl mx-auto">
                        Beyond journal publishing, Metademic invests in platforms and projects that support sustainability, open science infrastructure, and next-generation researchers.
                    </p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-8">
                        {/* Preprints */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-mdpi-blue">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-mdpi-blue/10 rounded-lg text-mdpi-blue text-xl"><LockOpen /></div>
                                    <h2 className="text-2xl font-extrabold text-mdpi-text-dark">MetaPreprints</h2>
                                </div>
                                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                                    A multidisciplinary preprint platform empowering researchers to share early-stage research outputs freely and immediately. Authors receive a DOI, boosting citations before formal peer review.
                                </p>
                                <button className="text-[13px] font-bold text-mdpi-blue hover:underline bg-mdpi-blue/5 px-4 py-2 rounded">Explore MetaPreprints →</button>
                            </div>
                        </div>

                        {/* Sustainability */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-mdpi-green">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-mdpi-green/10 rounded-lg text-mdpi-green text-xl"><TreePine /></div>
                                    <h2 className="text-2xl font-extrabold text-mdpi-text-dark">Sustainability Support Initiative</h2>
                                </div>
                                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                                    Aligned with the UN Sustainable Development Goals (SDGs). We offer APC waivers to researchers from developing nations studying renewable energy, climate action, and biodiversity.
                                </p>
                                <button className="text-[13px] font-bold text-mdpi-green hover:underline bg-mdpi-green/5 px-4 py-2 rounded">Learn about Waivers →</button>
                            </div>
                        </div>

                        {/* SCIFORUM */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-orange-500">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600 text-xl"><Presentation /></div>
                                    <h2 className="text-2xl font-extrabold text-mdpi-text-dark">Sciforum by Metademic</h2>
                                </div>
                                <p className="mb-4 text-mdpi-gray-text leading-relaxed">
                                    An event-planning platform supporting scholars in hosting international academic conferences. We provide comprehensive infrastructure for abstract submission, peer review, and hosting.
                                </p>
                                <button className="text-[13px] font-bold text-orange-600 hover:underline bg-orange-50 px-4 py-2 rounded">Organize an Event →</button>
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
