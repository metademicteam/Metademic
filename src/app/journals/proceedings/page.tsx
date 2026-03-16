import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { CheckCircle, ArrowRight, Award, Zap, Globe } from 'lucide-react';

export const revalidate = 86400; // Revalidate once a day (proceedings don't change often)

export default function ProceedingsPage() {
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
                        <div className="bg-[#1a252f] rounded border border-mdpi-border mb-8 shadow-xl overflow-hidden relative min-h-[300px] flex items-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-mdpi-blue-dark to-transparent opacity-60"></div>
                            <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
                                <span className="inline-block px-3 py-1 bg-mdpi-blue rounded text-[11px] font-bold uppercase tracking-widest mb-4">Conference Services</span>
                                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Open Access Proceedings for Academic Conferences</h1>
                                <p className="text-[16px] text-white/80 mb-8 leading-relaxed">
                                    Metademic provides a fast and professional service for conference organizers to publish their proceedings as open access articles.
                                </p>
                                <button className="px-8 py-3 bg-white text-mdpi-blue-dark font-extrabold rounded hover:bg-white/90 transition-all flex items-center gap-3 shadow-md hover:shadow-lg active:scale-95 group">
                                    Propose a Proceedings Volume
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 opacity-20 text-white">
                                <Award size={180} />
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white p-8 rounded border border-mdpi-border shadow-sm">
                                <h2 className="text-xl font-extrabold text-mdpi-text-dark mb-6 flex items-center gap-2 border-b border-mdpi-border pb-3">
                                    <Zap className="text-mdpi-blue" size={22} />
                                    Why Publish With Us?
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        'Full Open Access: All articles are freely available to readers worldwide.',
                                        'DOI Assignment: Each article receives a unique Digital Object Identifier.',
                                        'Fast Publication: Proceedings are typically published within 4-6 weeks.',
                                        'No Length Constraints: Detailed research can be presented without restrictions.',
                                        'Indexing: High visibility through major academic databases including Scopus.',
                                        'Long-term Archiving: Guaranteed preservation through CLOCKSS and Portico.'
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex gap-3 text-mdpi-gray-text leading-relaxed group">
                                            <CheckCircle size={18} className="text-mdpi-green flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-8 rounded border border-mdpi-border shadow-sm">
                                <h2 className="text-xl font-extrabold text-mdpi-text-dark mb-6 flex items-center gap-2 border-b border-mdpi-border pb-3">
                                    <Globe className="text-mdpi-blue" size={22} />
                                    Proceedings Series
                                </h2>
                                <p className="text-mdpi-gray-text mb-6">
                                    Browse our dedicated proceedings journals across various disciplines:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Engineering Proceedings', href: '#' },
                                        { name: 'Medical Sciences Forum', href: '#' },
                                        { name: 'Biology and Life Sciences Forum', href: '#' },
                                        { name: 'Computer Sciences & Math Forum', href: '#' },
                                        { name: 'Physical Sciences Forum', href: '#' },
                                        { name: 'Environmental Sciences Proceedings', href: '#' }
                                    ].map((series) => (
                                        <a 
                                            key={series.name} 
                                            href={series.href}
                                            className="group flex items-center justify-between p-3 border border-mdpi-border rounded hover:border-mdpi-blue hover:bg-mdpi-blue/5 transition-all no-underline"
                                        >
                                            <span className="font-bold text-mdpi-text-dark group-hover:text-mdpi-blue">{series.name}</span>
                                            <ArrowRight size={14} className="text-mdpi-gray-light group-hover:text-mdpi-blue group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Proceedings */}
                        <div className="bg-white p-8 rounded border border-mdpi-border shadow-sm">
                            <h2 className="text-xl font-extrabold text-mdpi-text-dark mb-6 flex items-center justify-between">
                                <span>Recent Proceedings Volumes</span>
                                <button className="text-[13px] text-mdpi-blue font-bold hover:underline">View All</button>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'The 4th International Electronic Conference on Applied Sciences', date: 'March 2026' },
                                    { title: 'The 1st International Conference on Sustainable Energy Analytics', date: 'February 2026' },
                                    { title: 'Proceedings of the 12th Global Summit on Climate Change', date: 'January 2026' }
                                ].map((vol, i) => (
                                    <div key={i} className="flex flex-col border border-mdpi-border rounded overflow-hidden hover:shadow-lg transition-all border-t-4 border-t-mdpi-blue">
                                        <div className="p-5 flex-1 bg-white">
                                            <h3 className="font-bold text-mdpi-text-dark text-[14px] mb-3 line-clamp-3 hover:text-mdpi-blue transition-colors cursor-pointer leading-snug">{vol.title}</h3>
                                            <div className="flex items-center gap-2 text-[12px] text-mdpi-gray-text mt-auto">
                                                <span className="w-2 h-2 rounded-full bg-mdpi-green"></span>
                                                {vol.date}
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-mdpi-gray-bg border-t border-mdpi-border text-[11px] font-extrabold text-mdpi-blue hover:bg-mdpi-blue hover:text-white transition-colors uppercase tracking-widest">
                                            VIEW VOLUME
                                        </button>
                                    </div>
                                ))}
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
