import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import {
    Check, ArrowRight, BookOpen, ImageIcon, Zap, ShieldCheck, ChevronDown, CheckCircle2
} from 'lucide-react';

export const revalidate = 86400; // ISR validation every 24 hours

export const metadata = {
    title: "Author Services | Metademic",
    description: "Professional English editing, layour formatting, and illustration services for your manuscript before submission.",
};

export default function AuthorServicesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />

            {/* Hero Section - Matching screenshot style "Fast. Accurate. Simple" */}
            <div className="bg-[#1a252f] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/80 to-mdpi-blue-dark opacity-90 z-0"></div>
                {/* Visual geometric overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] z-[1]"></div>

                <div className="max-w-[1280px] mx-auto px-4 py-16 relative z-10 text-center flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Fast. Accurate. Simple.</h1>
                    <p className="text-xl md:text-2xl text-white/95 mb-6 font-bold">Professional English editing, layout formatting, and illustration services for your manuscript before submission.</p>
                    <div className="flex gap-4">
                        <Link href="/author-services/pricing" className="bg-mdpi-blue text-white px-6 py-3 rounded font-bold hover:bg-mdpi-blue-dark transition-colors">Get Started</Link>
                        <Link href="/author-services/pricing" className="bg-white text-mdpi-blue px-6 py-3 rounded font-bold hover:bg-mdpi-blue-dark hover:text-white transition-colors">View Pricing</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Custom Left Sidebar for Author Services matching screenshot vertical nav */}
                    <div className="w-full lg:w-[220px] flex-shrink-0 space-y-6">
                        {/* Metademic Author Services Menu */}
                        <div className="bg-white rounded border border-mdpi-border shadow-sm overflow-hidden">
                            <div className="bg-mdpi-gray-bg px-4 py-3 border-b border-mdpi-border flex items-center gap-2">
                                <div className="w-6 h-6 bg-mdpi-blue text-white rounded flex items-center justify-center font-extrabold text-[12px]">M</div>
                                <span className="font-extrabold text-[14px] text-mdpi-text-dark tracking-wide">Author Services</span>
                            </div>
                            <ul className="divide-y divide-mdpi-border text-[13px] font-bold text-mdpi-text-dark">
                                <li><Link href="#english" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors text-mdpi-blue border-l-2 border-mdpi-blue">English Editing</Link></li>
                                <li><Link href="#layout" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">Layout Editing</Link></li>
                                <li><Link href="#plagiarism" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">Plagiarism Check</Link></li>
                                <li><Link href="#figure" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">Figure & Table Editing</Link></li>
                                <li><Link href="#abstract" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">Graphical Abstract</Link></li>
                                <li><Link href="#faq" className="block px-4 py-3 hover:bg-mdpi-blue/[0.03] hover:text-mdpi-blue transition-colors border-l-2 border-transparent">FAQs</Link></li>
                            </ul>
                        </div>
                        {/* Testimonials Sidebar Box */}
                        <div className="bg-white rounded border border-mdpi-border shadow-sm overflow-hidden p-5">
                            <h3 className="font-extrabold text-mdpi-text-dark mb-3 border-b border-mdpi-border pb-2 text-[15px]">Testimonials</h3>
                            <p className="text-[12px] text-mdpi-gray-text italic mb-3 leading-relaxed">
                                &quot;The editing was superb, fast, and enhanced the readability of our manuscript significantly. Highly recommended!&quot;
                            </p>
                            <span className="text-[12px] font-bold text-mdpi-blue block text-right">— Dr. K. Hasan, Dhaka</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 space-y-10">
                        {/* English Language Editing Services */}
                        <div id="english" className="scroll-mt-24">
                            <h2 className="text-[24px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">
                                English Language Editing Services
                            </h2>
                            <p className="text-mdpi-gray-text mb-6">
                                Fast, accurate, and perfectly tailored to academic publishing. We polish your manuscript to native English standards to ensure that reviewers focus on your science, not your grammar.
                            </p>

                            {/* Pricing Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-4">
                                {/* Standard */}
                                <div className="bg-white rounded border border-mdpi-border shadow-sm p-6 relative flex flex-col">
                                    <h3 className="text-[18px] font-extrabold text-mdpi-text-dark mb-2">Standard</h3>
                                    <p className="text-[13px] text-mdpi-gray-text mb-4 min-h-[40px]">Perfect for authors who need a fundamental language check.</p>
                                    <ul className="space-y-2.5 text-[13px] text-mdpi-text-dark mb-8">
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Native speaker editing</li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Grammar & spelling</li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Punctuation check</li>
                                    </ul>
                                    <div className="mt-auto border-t border-mdpi-border pt-4 text-center bg-gray-50 -mx-6 -mb-6 p-4 rounded-b">
                                        <div className="font-bold text-mdpi-blue mb-1 text-[13px]">Delivered in 5 days</div>
                                        <div className="text-[16px] font-extrabold text-mdpi-text-dark">From $0.05 / word</div>
                                    </div>
                                </div>
                                {/* Rapid */}
                                <div className="bg-white rounded border-2 border-mdpi-blue shadow-md p-6 relative transform md:-translate-y-4 flex flex-col z-10">
                                    <div className="absolute top-0 right-0 bg-mdpi-blue text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl rounded-tr-sm shadow">Most Popular</div>
                                    <h3 className="text-[18px] font-extrabold text-mdpi-blue mb-2">Rapid</h3>
                                    <p className="text-[13px] text-mdpi-gray-text mb-4 min-h-[40px]">For tight deadlines requiring urgent priority turnaround.</p>
                                    <ul className="space-y-2.5 text-[13px] text-mdpi-text-dark mb-8">
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> <span className="font-bold">All Standard features</span></li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Cover letter editing</li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> 1-year free re-editing</li>
                                    </ul>
                                    <div className="mt-auto border-t border-mdpi-blue/30 pt-4 text-center bg-mdpi-blue/5 -mx-6 -mb-6 p-4 rounded-b">
                                        <div className="font-bold text-mdpi-blue mb-1 text-[13px]">Delivered in 2 days</div>
                                        <div className="text-[16px] font-extrabold text-mdpi-blue">From $0.07 / word</div>
                                    </div>
                                </div>
                                {/* Academic */}
                                <div className="bg-white rounded border border-mdpi-border shadow-sm p-6 relative flex flex-col">
                                    <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl rounded-tr-sm shadow">Best Value</div>
                                    <h3 className="text-[18px] font-extrabold text-mdpi-text-dark mb-2">Academic</h3>
                                    <p className="text-[13px] text-mdpi-gray-text mb-4 min-h-[40px]">Comprehensive support including formatting & checks.</p>
                                    <ul className="space-y-2.5 text-[13px] text-mdpi-text-dark mb-8">
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> <span className="font-bold">All Rapid features</span></li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Layout Formatting</li>
                                        <li className="flex gap-2"><Check size={16} className="text-mdpi-blue flex-shrink-0" /> Plagiarism Check</li>
                                    </ul>
                                    <div className="mt-auto border-t border-mdpi-border pt-4 text-center bg-gray-50 -mx-6 -mb-6 p-4 rounded-b">
                                        <div className="font-bold text-mdpi-blue mb-1 text-[13px]">Delivered in 1 day</div>
                                        <div className="text-[16px] font-extrabold text-mdpi-text-dark">From $0.09 / word</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quote Form */}
                        <div className="bg-mdpi-gray-bg border border-mdpi-border rounded p-6 shadow-sm">
                            <h3 className="text-[16px] font-extrabold text-mdpi-text-dark mb-4">Select Service and Get a Quote</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-[12px] font-bold text-mdpi-text-dark mb-1.5">Word Count</label>
                                    <input type="number" placeholder="e.g. 5000" className="w-full border border-mdpi-border rounded px-3 py-2 text-[13px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue" />
                                </div>
                                <div>
                                    <label className="block text-[12px] font-bold text-mdpi-text-dark mb-1.5">Service Level</label>
                                    <select className="w-full border border-mdpi-border rounded px-3 py-2 text-[13px] focus:outline-none focus:border-mdpi-blue bg-white focus:ring-1 focus:ring-mdpi-blue">
                                        <option>Standard Editing</option>
                                        <option>Rapid Editing</option>
                                        <option>Academic Editing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[12px] font-bold text-mdpi-text-dark mb-1.5">Currency</label>
                                    <select className="w-full border border-mdpi-border rounded px-3 py-2 text-[13px] focus:outline-none focus:border-mdpi-blue bg-white focus:ring-1 focus:ring-mdpi-blue">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>BDT (৳)</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="w-full bg-mdpi-blue hover:bg-mdpi-blue-dark text-white font-extrabold py-2 px-4 rounded transition-colors text-[13px]">
                                        Calculate Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Figure and Table Editing */}
                        <div id="figure" className="scroll-mt-24">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">
                                Figure and Table Editing
                            </h2>
                            <p className="text-mdpi-gray-text mb-6">
                                We adjust the size, layout, resolution, formatting, and colors of your figures and tables to perfectly match journal guidelines. Minimum 300 DPI preservation guaranteed.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded border border-mdpi-border shadow-sm">
                                <div className="space-y-3">
                                    <div className="bg-rose-50 border border-rose-100 text-rose-600 font-extrabold px-3 py-1 rounded text-[12px] inline-block mb-1">Before</div>
                                    <div className="h-56 border border-dashed border-mdpi-border rounded flex flex-col items-center justify-center bg-gray-50 overflow-hidden relative">
                                        <div className="w-full h-full flex items-center justify-center p-4">
                                            <div className="w-full h-full border-4 border-gray-200/50 bg-gray-200/30 rounded flex items-end p-2 gap-2 opacity-70 blur-[1px]">
                                                <div className="w-1/4 bg-gray-300 h-1/2 rounded"></div>
                                                <div className="w-1/4 bg-gray-300 h-3/4 rounded"></div>
                                                <div className="w-1/4 bg-gray-300 h-1/4 rounded"></div>
                                                <div className="w-1/4 bg-gray-300 h-full rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 font-extrabold px-3 py-1 rounded text-[12px] inline-block mb-1">After</div>
                                    <div className="h-56 border border-mdpi-border shadow-inner rounded flex flex-col items-center justify-center bg-white overflow-hidden relative">
                                        <div className="absolute top-2 right-2 bg-white text-mdpi-blue font-bold px-2 py-0.5 border border-mdpi-blue rounded text-[10px] shadow-sm flex items-center gap-1"><Check size={10} /> 300 DPI</div>
                                        <div className="w-full h-full flex items-center justify-center p-4">
                                            <div className="w-full h-full rounded flex items-end p-2 gap-2">
                                                <div className="w-1/4 bg-mdpi-blue h-1/2 rounded-sm shadow-sm"></div>
                                                <div className="w-1/4 bg-mdpi-green h-3/4 rounded-sm shadow-sm"></div>
                                                <div className="w-1/4 bg-amber-400 h-1/4 rounded-sm shadow-sm"></div>
                                                <div className="w-1/4 bg-rose-500 h-full rounded-sm shadow-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graphical Abstract */}
                        <div id="abstract" className="bg-white p-8 rounded border border-mdpi-border shadow-sm flex flex-col md:flex-row gap-8 items-center scroll-mt-24">
                            <div className="flex-1">
                                <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-3">Graphical Abstract</h2>
                                <p className="text-mdpi-gray-text mb-4 text-[13px] leading-relaxed">
                                    A visually appealing graphical abstract draws more readers and citations to your work. Send us your rough sketches or concepts, and our professional illustrators will convert them into striking vector diagrams suitable for high-impact journals.
                                </p>
                                <ul className="text-[13px] font-bold text-mdpi-text-dark space-y-2 mb-4">
                                    <li className="flex items-center gap-2"><Check size={16} className="text-mdpi-green" /> Mechanism of action diagrams</li>
                                    <li className="flex items-center gap-2"><Check size={16} className="text-mdpi-green" /> Flowcharts and statistical visualizations</li>
                                    <li className="flex items-center gap-2"><Check size={16} className="text-mdpi-green" /> Scientific 3D structural models</li>
                                </ul>
                            </div>
                            <div className="w-full md:w-[280px] h-[180px] bg-gradient-to-tr from-[#1a252f] to-mdpi-blue overflow-hidden rounded-lg flex items-center justify-center border border-mdpi-border shadow-inner relative group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                <div className="text-center relative z-10 text-white flex flex-col items-center">
                                    <ImageIcon size={48} className="mb-2 opacity-80" />
                                    <span className="font-bold text-[13px] uppercase tracking-wider opacity-90">Vector Output</span>
                                </div>
                            </div>
                        </div>

                        {/* Layout Editing & Banner */}
                        <div id="layout" className="space-y-6 scroll-mt-24">
                            <div>
                                <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-3">Layout Editing</h2>
                                <p className="text-mdpi-gray-text text-[13px] leading-relaxed">
                                    Save hours of frustrating formatting. Our layout specialists will meticulously format your text, equations, tables, and references perfectly according to the intricate template guidelines of any targeted destination journal. Included standard with our Academic priority package.
                                </p>
                            </div>

                            <div className="bg-[#1a5b4f] text-white p-8 rounded shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute -right-12 -top-12 opacity-10 blur-xl">
                                    <BookOpen size={200} />
                                </div>
                                <div className="relative z-10">
                                    <div className="bg-emerald-400 text-[#0f3830] font-extrabold text-[10px] uppercase px-2 py-1 inline-flex items-center gap-1 rounded mb-3 shadow-sm"><Zap size={10} /> Specialized Service</div>
                                    <h3 className="text-2xl font-extrabold mb-3">Thesis and Dissertation Editing</h3>
                                    <p className="text-white/80 text-[14px] max-w-2xl leading-relaxed">Comprehensive support for graduate students. Proofreading, structural formatting, and bibliography checks conforming to rigorous university standards globally, ensuring your defense is flawless.</p>
                                </div>
                                <button className="relative z-10 bg-white text-[#1a5b4f] font-extrabold px-6 py-3 rounded shadow hover:bg-gray-50 hover:shadow-md transition-all whitespace-nowrap">
                                    Learn More <ArrowRight size={16} className="inline-block ml-1 -mt-0.5" />
                                </button>
                            </div>
                        </div>

                        {/* Our Guarantees */}
                        <div id="guarantees" className="scroll-mt-24">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">Our Guarantees</h2>
                            <p className="text-mdpi-gray-text mb-5 text-[13px] leading-relaxed max-w-4xl">
                                Your satisfaction is our priority. If your manuscript is rejected solely due to English language issues after using our Rapid or Academic service, we will re-edit it entirely free of charge. We guarantee complete confidentiality and adherence to COPE ethical standards.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="flex items-center gap-2 text-[13px] font-bold text-mdpi-blue bg-mdpi-blue/5 border border-mdpi-blue/20 px-4 py-2 rounded-full"><ShieldCheck size={16} className="text-mdpi-blue" /> NDAs Available on Request</span>
                                <span className="flex items-center gap-2 text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full"><CheckCircle2 size={16} className="text-emerald-500" /> Retraction Protection Guarantee</span>
                            </div>
                        </div>

                        {/* IOAP */}
                        <div className="bg-gradient-to-r from-mdpi-gray-bg/80 to-mdpi-gray-bg/40 border-l-4 border-mdpi-blue p-6 rounded-r">
                            <h3 className="text-[16px] font-extrabold text-mdpi-text-dark mb-2">Institutional Open Access Program (IOAP) 10% Discount</h3>
                            <p className="text-[13px] text-mdpi-gray-text leading-relaxed">
                                Authors affiliated with IOAP participant institutions across Dhaka, Bangladesh and globally are entitled to an automatic 10% discount on all author services processing charges. <Link href="/information/institutional-open-access-program" className="text-mdpi-link-blue hover:underline font-bold">Check if your institution is participating &raquo;</Link>
                            </p>
                        </div>

                        {/* FAQs */}
                        <div id="faq" className="scroll-mt-24">
                            <h2 className="text-[20px] font-extrabold text-mdpi-text-dark mb-4 border-b border-mdpi-border pb-2">Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                {[
                                    { q: "What formats do you accept for English editing?", a: "We accept Microsoft Word (.doc, .docx), LaTeX (.tex files bundled as ZIP), and PDF for preliminary checks." },
                                    { q: "Is English editing completely automated?", a: "No. All manuscripts are meticulously edited by human native English-speaking subject experts holding advanced degrees in your respective field." },
                                    { q: "Will I receive a certificate of editing?", a: "Yes. All our editing services come with a freely downloadable certificate. You can submit this official document to the journal editor alongside your manuscript." },
                                    { q: "Is the payment secure?", a: "Yes. Our payment gateways use industry-standard encryption, and we accept major credit cards, PayPal, and institutional wire transfers (USD, EUR, BDT)." },
                                    { q: "How does the plagiarism check work?", a: "We utilize official software systems to scan your manuscript against an extensive database of 100M+ published works and provide you with a comprehensive similarity report." }
                                ].map((faq, idx) => (
                                    <details key={idx} className="group bg-white border border-mdpi-border rounded hover:border-mdpi-blue overflow-hidden shadow-sm transition-colors">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-extrabold text-[14px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors outline-none select-none">
                                            {faq.q}
                                            <ChevronDown size={18} className="text-mdpi-gray-text group-hover:text-mdpi-blue group-open:rotate-180 transition-transform flex-shrink-0" />
                                        </summary>
                                        <div className="px-5 pb-5 pt-2 text-[13px] text-mdpi-gray-text leading-relaxed border-t border-mdpi-border/50 bg-mdpi-gray-bg/10">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar - matches the screenshot which implies standard right matter */}
                    <div className="w-full lg:w-[260px] flex-shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
