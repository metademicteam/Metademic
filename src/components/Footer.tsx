import Link from 'next/link'
import { Linkedin, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-mdpi-footer-bg text-[13px]">
            <div className="max-w-[1280px] mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Further Information */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-[14px] mb-3">Further Information</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Article Processing Charges</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Pay an Invoice</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Open Access Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Contact Metademic</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Jobs at Metademic</Link></li>
                        </ul>
                    </div>

                    {/* Guidelines */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-[14px] mb-3">Guidelines</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Authors</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Reviewers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Editors</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Librarians</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Publishers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Societies</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">For Conference Organizers</Link></li>
                        </ul>
                    </div>

                    {/* Initiatives */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-[14px] mb-3">Metademic Initiatives</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Sciforum</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">MTDM Books</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Preprints.org</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Scilit</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">SciProfiles</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">Encyclopedia</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors no-underline text-slate-400 hover:underline">JAMS</Link></li>
                        </ul>
                    </div>

                    {/* Follow */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-[14px] mb-3">Follow Metademic</h4>
                        <div className="flex gap-3">
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors no-underline">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors no-underline">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors no-underline">
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Subscribe */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-[14px] mb-3">Subscribe</h4>
                        <p className="text-slate-400 text-[12px] leading-relaxed">
                            Subscribe to receive issue release notifications and newsletters from Metademic journals.
                        </p>
                        <div className="flex gap-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-[#1a252f] border border-slate-600 rounded px-3 py-2 text-[12px] text-white placeholder-slate-500 focus:outline-none focus:border-mdpi-blue"
                            />
                            <button className="bg-mdpi-blue text-white px-4 py-2 rounded text-[12px] font-bold hover:bg-mdpi-blue-dark transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-mdpi-footer-dark border-t border-slate-700">
                <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-slate-500 text-[12px]">
                        © {new Date().getFullYear()} Metademic (Dhaka, Bangladesh)
                    </p>
                    <div className="flex gap-4 text-[12px]">
                        <Link href="#" className="text-slate-500 hover:text-slate-300 no-underline hover:underline">Disclaimer</Link>
                        <Link href="#" className="text-slate-500 hover:text-slate-300 no-underline hover:underline">Terms and Conditions</Link>
                        <Link href="#" className="text-slate-500 hover:text-slate-300 no-underline hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
