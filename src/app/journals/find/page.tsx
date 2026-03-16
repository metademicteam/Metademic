'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Search, Info } from 'lucide-react';

export default function FindJournalPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            <div className="max-w-[1280px] mx-auto px-4 py-6 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded border border-mdpi-border overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-mdpi-blue to-mdpi-blue-dark px-6 py-8 text-white relative overflow-hidden">
                                <div className="absolute -right-8 -bottom-8 opacity-10">
                                    <Search size={200} />
                                </div>
                                <h1 className="text-[26px] font-extrabold mb-2 relative z-10">Find Your Journal</h1>
                                <p className="text-white/80 text-[15px] max-w-2xl relative z-10">
                                    Our Journal Finder helps you identify the most suitable journal for your paper. 
                                    Simply enter your title and abstract, and our AI-powered systems will suggest matching journals across all scientific disciplines.
                                </p>
                            </div>

                            <div className="p-6 md:p-8">
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    {/* Paper Title */}
                                    <div className="space-y-2">
                                        <label className="block font-bold text-mdpi-text-dark">
                                            Paper Title <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter your paper title here..."
                                            className="w-full px-4 py-3 border border-mdpi-border rounded focus:outline-none focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Paper Abstract */}
                                    <div className="space-y-2">
                                        <label className="block font-bold text-mdpi-text-dark">
                                            Paper Abstract <span className="text-red-500">*</span>
                                        </label>
                                        <textarea 
                                            rows={8}
                                            placeholder="Enter your paper abstract here (at least 100 words recommended for better matching)..."
                                            className="w-full px-4 py-3 border border-mdpi-border rounded focus:outline-none focus:ring-2 focus:ring-mdpi-blue/20 focus:border-mdpi-blue transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Advanced Filters */}
                                    <div className="pt-6 border-t border-mdpi-border">
                                        <h3 className="text-[18px] font-bold text-mdpi-text-dark mb-5 flex items-center gap-2">
                                            Search Criteria & Filters
                                            <span title="Refine your search with metrics and indexing requirements" className="cursor-help inline-flex"><Info size={16} className="text-mdpi-gray-text" /></span>
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="block text-[13px] font-bold text-mdpi-gray-text uppercase tracking-wider">Impact Factor</label>
                                                <select className="w-full px-3 py-2.5 border border-mdpi-border rounded bg-white focus:outline-none focus:border-mdpi-blue text-[13px] cursor-pointer">
                                                    <option>Any Impact Factor</option>
                                                    <option>1.0 or higher</option>
                                                    <option>2.0 or higher</option>
                                                    <option>3.0 or higher</option>
                                                    <option>5.0 or higher</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-[13px] font-bold text-mdpi-gray-text uppercase tracking-wider">Maximum APC (USD)</label>
                                                <select className="w-full px-3 py-2.5 border border-mdpi-border rounded bg-white focus:outline-none focus:border-mdpi-blue text-[13px] cursor-pointer">
                                                    <option>No Limit</option>
                                                    <option>Less than $1,000</option>
                                                    <option>Less than $2,000</option>
                                                    <option>Less than $3,000</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-3">
                                            <label className="block text-[13px] font-bold text-mdpi-gray-text uppercase tracking-wider">Minimum Indexing Requirements</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {['Web of Science', 'Scopus', 'PubMed', 'ESCI', 'Google Scholar', 'DOAJ'].map(db => (
                                                    <label key={db} className="flex items-center gap-2 cursor-pointer group p-2 hover:bg-mdpi-gray-bg rounded transition-colors">
                                                        <input type="checkbox" className="w-4 h-4 accent-mdpi-blue rounded border-mdpi-border" />
                                                        <span className="text-[13px] text-mdpi-gray-text group-hover:text-mdpi-blue transition-colors">{db}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                        <button 
                                            type="submit"
                                            className="flex-1 sm:flex-none px-10 py-3.5 bg-mdpi-blue text-white font-bold rounded hover:bg-mdpi-blue-dark transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                                        >
                                            <Search size={18} />
                                            Find Matching Journals
                                        </button>
                                        <button 
                                            type="reset"
                                            className="px-10 py-3.5 bg-white text-mdpi-gray-text border border-mdpi-border font-bold rounded hover:bg-mdpi-gray-bg transition-all"
                                        >
                                            Clear Form
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-white border-l-4 border-mdpi-blue p-5 rounded shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-extrabold text-mdpi-text-dark mb-2 text-[15px]">Advanced AI Matching</h4>
                                <p className="text-mdpi-gray-text text-[13px] leading-relaxed">
                                    Our matching engine uses state-of-the-art Natural Language Processing (NLP) to analyze your abstract&apos;s semantic meaning and scientific context, comparing it against the Aims & Scope of our entire journal portfolio.
                                </p>
                            </div>
                            <div className="bg-white border-l-4 border-mdpi-green p-5 rounded shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-extrabold text-mdpi-text-dark mb-2 text-[15px]">Optimize Acceptance</h4>
                                <p className="text-mdpi-gray-text text-[13px] leading-relaxed">
                                    Submitting to a well-matched journal significantly reduces the chances of desk rejection and increases the likelihood of finding appropriate reviewers, accelerating your publication timeline.
                                </p>
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
