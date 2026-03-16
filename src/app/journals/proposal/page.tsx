'use client'

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { FileText, Users, Globe, Send, Info } from 'lucide-react';

export default function JournalProposalPage() {
    const [activeTab, setActiveTab] = useState('new');

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            <div className="max-w-[1280px] mx-auto px-4 py-6 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        {/* Hero Section */}
                        <div className="bg-white rounded border border-mdpi-border p-8 mb-6 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-mdpi-blue opacity-5 -mr-16 -mt-16 rounded-full"></div>
                            <h1 className="text-3xl font-extrabold text-mdpi-text-dark mb-4">Journal Proposals</h1>
                            <p className="text-[15px] text-mdpi-gray-text max-w-2xl leading-relaxed">
                                Metademic welcomes proposals for new open access journals in any scientific, technical, or medical field. 
                                We also partner with existing journals looking to transition to a high-impact open access model.
                            </p>
                            
                            <div className="flex gap-4 mt-8 border-b border-mdpi-border">
                                <button 
                                    onClick={() => setActiveTab('new')}
                                    className={`pb-3 px-2 font-bold text-[15px] border-b-2 transition-all ${activeTab === 'new' ? 'border-mdpi-blue text-mdpi-blue' : 'border-transparent text-mdpi-gray-text hover:text-mdpi-text-dark'}`}
                                >
                                    New Journal Proposal
                                </button>
                                <button 
                                    onClick={() => setActiveTab('existing')}
                                    className={`pb-3 px-2 font-bold text-[15px] border-b-2 transition-all ${activeTab === 'existing' ? 'border-mdpi-blue text-mdpi-blue' : 'border-transparent text-mdpi-gray-text hover:text-mdpi-text-dark'}`}
                                >
                                    Existing Journal Transfer
                                </button>
                            </div>
                        </div>

                        {/* Proposal Form */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                {/* Section 1: Proposer Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-mdpi-blue font-bold text-[16px] border-b border-mdpi-border pb-2">
                                        <Users size={18} />
                                        <span>Proposer Information</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block font-bold">Full Name <span className="text-red-500">*</span></label>
                                            <input type="text" className="w-full px-4 py-2.5 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none transition-all" placeholder="Enter your name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block font-bold">Email Address <span className="text-red-500">*</span></label>
                                            <input type="email" className="w-full px-4 py-2.5 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none transition-all" placeholder="email@university.edu" required />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block font-bold">Institution / Affiliation <span className="text-red-500">*</span></label>
                                            <input type="text" className="w-full px-4 py-2.5 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none transition-all" placeholder="University or Organization Name" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Journal Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-mdpi-blue font-bold text-[16px] border-b border-mdpi-border pb-2">
                                        <FileText size={18} />
                                        <span>{activeTab === 'new' ? 'New Journal Details' : 'Existing Journal Details'}</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block font-bold">Proposed Journal Title <span className="text-red-500">*</span></label>
                                            <input type="text" className="w-full px-4 py-2.5 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none transition-all" placeholder="Title of the journal" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block font-bold">Aims & Scope <span className="text-red-500">*</span></label>
                                            <textarea rows={6} className="w-full px-4 py-3 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none resize-none transition-all" placeholder="Describe the focus and goals of the journal..."></textarea>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block font-bold">Frequency of Publication</label>
                                                <select className="w-full px-4 py-2.5 border border-mdpi-border rounded bg-white outline-none cursor-pointer">
                                                    <option>Monthly</option>
                                                    <option>Quarterly</option>
                                                    <option>Semiannual</option>
                                                    <option>Continuous</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block font-bold">Major Subject Area</label>
                                                <select className="w-full px-4 py-2.5 border border-mdpi-border rounded bg-white outline-none cursor-pointer">
                                                    <option>Medicine & Health</option>
                                                    <option>Physical Sciences</option>
                                                    <option>Social Sciences</option>
                                                    <option>Engineering</option>
                                                    <option>Life Sciences</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Editorial Board */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-mdpi-blue font-bold text-[16px] border-b border-mdpi-border pb-2">
                                        <Globe size={18} />
                                        <span>Editorial Board Suggestions</span>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-bold">Potential Editor-in-Chief / Board Members</label>
                                        <textarea rows={4} className="w-full px-4 py-3 border border-mdpi-border rounded focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue outline-none resize-none transition-all" placeholder="List names and affiliations of proposed editorial board members..."></textarea>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-mdpi-blue/5 rounded border border-mdpi-blue/10">
                                        <div className="text-mdpi-blue flex-shrink-0">
                                            <Info size={24} />
                                        </div>
                                        <p className="text-[13px] text-mdpi-blue/80 italic leading-relaxed">
                                            Metademic ensures rigorous peer-review for all journals. Our editorial team will review your proposal for scientific relevance, market demand, and sustainability, and will contact you within 5-10 business days.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-mdpi-border">
                                    <button 
                                        type="submit"
                                        className="w-full md:w-auto px-10 py-4 bg-mdpi-blue text-white font-bold rounded hover:bg-mdpi-blue-dark transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95"
                                    >
                                        <Send size={18} />
                                        Submit Journal Proposal
                                    </button>
                                </div>
                            </form>
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
