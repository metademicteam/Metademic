import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { PenTool, Languages, Book, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

const services = [
    {
        title: "English Editing",
        icon: Languages,
        description: "Ensure your manuscript is polished and grammatically perfect before submission. Handled by native English-speaking subject matter experts.",
        price: "From $95"
    },
    {
        title: "Plagiarism Check",
        icon: Zap,
        description: "Comprehensive similarity reports using iThenticate software to protect academic integrity.",
        price: "$15 per manuscript"
    },
    {
        title: "Formatting Service",
        icon: Book,
        description: "Receive your manuscript fully formatted to any Metademic journal's specific guidelines.",
        price: "From $50"
    },
    {
        title: "Figure Preparation",
        icon: PenTool,
        description: "High-quality, visually appealing graphs, illustrations, and charts redesigned to meet journal standards.",
        price: "$45 per figure"
    }
];

export default function AuthorServicesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />
            
            <div className="bg-gradient-to-br from-mdpi-blue to-[#001f3f] py-16 text-white overflow-hidden shadow-inner">
                <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white rounded text-[11px] font-extrabold uppercase tracking-widest mb-4 border border-white/30">Premium Services</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Maximize the Impact of Your Research</h1>
                        <p className="text-[16px] text-white/80 leading-relaxed max-w-xl mb-8">
                            Metademic Author Services provides comprehensive professional editing, formatting, and illustration support to prepare your manuscript for submission.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-mdpi-green hover:bg-emerald-600 text-white font-extrabold px-8 py-3.5 rounded shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">Get an Estimate</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-8">
                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map(service => (
                                <div key={service.title} className="bg-white rounded border border-mdpi-border p-8 hover:shadow-xl transition-all group flex flex-col h-full hover:border-mdpi-blue overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-mdpi-gray-bg/50 rounded-bl-full -mr-8 -mt-8 group-hover:bg-mdpi-blue/5 transition-colors"></div>
                                    <div className="text-mdpi-blue mb-6 border border-mdpi-blue/20 bg-mdpi-blue/5 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-mdpi-blue group-hover:text-white transition-all shadow-sm">
                                        <service.icon size={28} />
                                    </div>
                                    <h3 className="text-[18px] font-extrabold text-mdpi-text-dark mb-3">{service.title}</h3>
                                    <p className="text-[14px] text-mdpi-gray-text flex-grow mb-6 leading-relaxed bg-white relative z-10">{service.description}</p>
                                    <div className="mt-auto flex items-center justify-between border-t border-mdpi-border pt-4 bg-white relative z-10">
                                        <span className="font-bold text-mdpi-blue bg-mdpi-blue/10 px-3 py-1 rounded text-[13px]">{service.price}</span>
                                        <a href="#" className="flex items-center gap-1 text-[13px] font-bold text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors">Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-white rounded border border-mdpi-border p-8 shadow-sm">
                            <h2 className="text-2xl font-extrabold text-mdpi-text-dark mb-6 text-center">Why Choose Metademic Author Services?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { title: "Subject Experts", text: "Editors hold advanced degrees in your specific discipline." },
                                    { title: "Fast Turnaround", text: "Multiple delivery speeds available, as fast as 24 hours." },
                                    { title: "Confidentiality", text: "Secure systems prioritizing the privacy of unpublished research." }
                                ].map(perk => (
                                    <div key={perk.title} className="text-center group border border-dashed border-transparent hover:border-mdpi-border p-4 rounded-lg transition-all">
                                        <CheckCircle2 size={36} className="text-mdpi-green mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                        <h4 className="font-bold text-[15px] mb-2">{perk.title}</h4>
                                        <p className="text-[13px] text-mdpi-gray-text">{perk.text}</p>
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
