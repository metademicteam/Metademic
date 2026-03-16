import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { Info, ShieldCheck, ChevronRight } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Pricing & Plans - Author Services | Metademic",
    description: "View pricing details for Metademic Author Services, including English editing, layout formatting, and plagiarism checks.",
};

export default function AuthorServicesPricingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-[#1a252f] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/80 to-mdpi-blue-dark opacity-90 z-0"></div>
                <div className="max-w-[1280px] mx-auto px-4 py-12 relative z-10 text-center flex flex-col items-center justify-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Author Services Pricing</h1>
                    <p className="text-lg text-white/95 mb-0 font-bold max-w-2xl">Straightforward, transparent pricing for premium editing and formatting services that maximize the impact of your research.</p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full lg:w-[220px] flex-shrink-0 space-y-6">
                        <div className="bg-white rounded border border-mdpi-border shadow-sm overflow-hidden">
                            <div className="bg-mdpi-gray-bg px-4 py-3 border-b border-mdpi-border flex items-center gap-2">
                                <span className="font-extrabold text-[14px] text-mdpi-text-dark tracking-wide">Pricing Menu</span>
                            </div>
                            <ul className="divide-y divide-mdpi-border text-[13px] font-bold text-mdpi-text-dark">
                                <li><Link href="#calculator" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors text-mdpi-blue border-l-2 border-mdpi-blue">Quote Calculator</Link></li>
                                <li><Link href="#editing" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">English Editing</Link></li>
                                <li><Link href="#formatting" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">Plagiarism & Layout</Link></li>
                                <li><Link href="#discount" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">IOAP Discounts</Link></li>
                            </ul>
                        </div>
                        
                        <div className="bg-gradient-to-b from-mdpi-blue to-mdpi-blue-dark text-white rounded shadow-sm p-5 text-center">
                            <h3 className="font-extrabold text-[16px] mb-2">Ready to Submit?</h3>
                            <p className="text-[13px] text-white/80 mb-4">Start your editing journey today.</p>
                            <Link href="/submit" className="inline-block bg-white text-mdpi-blue font-extrabold px-6 py-2 rounded shadow hover:bg-gray-100 transition-colors w-full">
                                Upload Manuscript
                            </Link>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 space-y-10">
                        
                        {/* Interactive Quote Calculator */}
                        <div id="calculator" className="bg-white rounded border border-mdpi-border shadow-sm p-8 scroll-mt-20">
                            <h2 className="text-[22px] font-extrabold text-mdpi-text-dark mb-6 border-b border-mdpi-border pb-2">
                                Calculate Your Estimate
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="font-bold text-mdpi-text-dark text-[13px]">Select Service</label>
                                    <select className="w-full border border-mdpi-border rounded px-3 py-2 text-[14px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue bg-white">
                                        <option>English Editing (Standard)</option>
                                        <option>English Editing (Rapid)</option>
                                        <option>English Editing (Academic)</option>
                                        <option>Layout Editing</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-mdpi-text-dark text-[13px]">Word Count</label>
                                    <input type="number" placeholder="e.g. 6000" className="w-full border border-mdpi-border rounded px-3 py-2 text-[14px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-mdpi-text-dark text-[13px]">Preferred Currency</label>
                                    <select className="w-full border border-mdpi-border rounded px-3 py-2 text-[14px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue bg-white">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>BDT (৳)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-mdpi-gray-bg rounded p-6 flex flex-col sm:flex-row items-center justify-between border border-mdpi-border gap-4">
                                <div>
                                    <h4 className="font-extrabold text-[15px] mb-1 text-mdpi-text-dark">Estimated Total</h4>
                                    <p className="text-[13px] text-mdpi-gray-text flex items-center gap-1">
                                        <Info size={14} className="text-mdpi-blue" />
                                        Excludes applicable domestic taxes
                                    </p>
                                </div>
                                <div className="text-3xl font-extrabold text-mdpi-blue tracking-tight">
                                    $ ---
                                </div>
                            </div>
                        </div>

                        {/* Detailed English Editing Table */}
                        <div id="editing" className="scroll-mt-20">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">
                                English Language Editing Rates
                            </h2>
                            <div className="overflow-x-auto border border-mdpi-border rounded shadow-sm bg-white">
                                <table className="w-full text-left border-collapse text-[13px]">
                                    <thead>
                                        <tr className="bg-mdpi-gray-bg text-mdpi-text-dark font-extrabold border-b border-mdpi-border">
                                            <th className="p-4">Package</th>
                                            <th className="p-4">Delivery Time</th>
                                            <th className="p-4">Price per Word</th>
                                            <th className="p-4">Minimum Charge</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-mdpi-border text-mdpi-gray-text font-medium">
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-extrabold text-mdpi-text-dark">Standard Editing</td>
                                            <td className="p-4">5 Business Days</td>
                                            <td className="p-4">$0.05</td>
                                            <td className="p-4">$95.00</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-extrabold text-mdpi-blue">Rapid Editing (Popular)</td>
                                            <td className="p-4">2 Business Days</td>
                                            <td className="p-4">$0.07</td>
                                            <td className="p-4">$120.00</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-extrabold text-rose-600">Academic Editing</td>
                                            <td className="p-4">1 Business Day</td>
                                            <td className="p-4">$0.09</td>
                                            <td className="p-4">$150.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 text-[12px] text-mdpi-gray-text mb-4 italic">
                                * Word counts exclude references, affiliations, and tables by default unless requested.
                            </p>
                        </div>

                        {/* Formatting and Additional Services */}
                        <div id="formatting" className="scroll-mt-20">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">
                                Formatting & Plagiarism Checks
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded border border-mdpi-border shadow-sm flex flex-col">
                                    <h3 className="text-[16px] font-extrabold text-mdpi-text-dark mb-2">Layout Formatting</h3>
                                    <p className="text-[13px] text-mdpi-gray-text mb-4 grow">
                                        Formatting references, equations, and structure to meet destination journal guidelines precisely.
                                    </p>
                                    <div className="flex items-center justify-between border-t border-mdpi-border pt-4">
                                        <span className="font-bold text-mdpi-text-dark text-[13px]">Standard Delivery (3 Days)</span>
                                        <span className="font-extrabold text-mdpi-blue text-[15px]">From $50.00</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded border border-mdpi-border shadow-sm flex flex-col">
                                    <h3 className="text-[16px] font-extrabold text-mdpi-text-dark mb-2">iThenticate Plagiarism Check</h3>
                                    <p className="text-[13px] text-mdpi-gray-text mb-4 grow">
                                        Comprehensive similarity report utilizing premium plagiarism detection software. Full PDF report included.
                                    </p>
                                    <div className="flex items-center justify-between border-t border-mdpi-border pt-4">
                                        <span className="font-bold text-mdpi-text-dark text-[13px]">Fixed Rate</span>
                                        <span className="font-extrabold text-mdpi-blue text-[15px]">$15.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Discounts */}
                        <div id="discount" className="scroll-mt-20">
                            <div className="bg-emerald-50 border border-emerald-200 rounded p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 flex-shrink-0">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-[16px] font-extrabold text-emerald-800 mb-2">IOAP & Promotional Discounts</h3>
                                        <p className="text-[13px] text-emerald-700 leading-relaxed mb-4">
                                            Authors affiliated with universities participating in our <strong>Institutional Open Access Program (IOAP)</strong>—including many institutions across Dhaka, Bangladesh—automatically receive a <strong>10% discount</strong> on all Author Services upon uploading their manuscript.
                                        </p>
                                        <Link href="/information/institutional-open-access-program" className="inline-flex items-center font-bold text-emerald-700 hover:text-emerald-800 transition-colors text-[13px]">
                                            Check if your institution qualifies <ChevronRight size={16} />
                                        </Link>
                                    </div>
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
