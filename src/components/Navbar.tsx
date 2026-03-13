'use client'

import Link from 'next/link'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
    { label: 'Journals', href: '/journals', hasDropdown: true },
    { label: 'Topics', href: '/topics', hasDropdown: true },
    { label: 'Information', href: '/information', hasDropdown: true },
    { label: 'Author Services', href: '/author-services', hasDropdown: true },
    { label: 'Initiatives', href: '/initiatives', hasDropdown: true },
    { label: 'About', href: '/about', hasDropdown: false },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-mdpi-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="flex items-center justify-between h-[56px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 no-underline flex-shrink-0">
                        <div className="w-[42px] h-[36px] bg-mdpi-blue rounded-[3px] flex items-center justify-center text-white font-extrabold text-[25px] tracking-wide border-2 border-mdpi-blue-dark">
                            M
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 ml-6">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-0.5 px-3 py-2 text-[14px] font-medium text-mdpi-text-dark hover:text-mdpi-blue no-underline transition-colors"
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown size={13} className="ml-0.5 opacity-50" />}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 ml-auto">
                        <Link
                            href="/signin"
                            className="hidden md:inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-mdpi-blue border border-mdpi-blue rounded hover:bg-mdpi-blue hover:text-white transition-all no-underline"
                        >
                            Sign In / Sign Up
                        </Link>
                        <Link
                            href="/submit"
                            className="hidden md:inline-flex items-center px-5 py-1.5 text-[13px] font-bold text-white bg-mdpi-blue rounded hover:bg-mdpi-blue-dark transition-colors no-underline"
                        >
                            Submit
                        </Link>
                        <button
                            className="lg:hidden p-2 text-mdpi-gray-text"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-white border-t border-mdpi-border px-4 py-4 space-y-2 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="block py-2 px-3 text-[14px] font-medium text-mdpi-text-dark hover:bg-mdpi-gray-bg rounded no-underline"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 mt-3 border-t border-mdpi-border flex gap-2">
                        <Link href="/signin" className="flex-1 text-center py-2 text-[13px] font-medium text-mdpi-blue border border-mdpi-blue rounded no-underline">
                            Sign In / Sign Up
                        </Link>
                        <Link href="/submit" className="flex-1 text-center py-2 text-[13px] font-bold text-white bg-mdpi-blue rounded no-underline">
                            Submit
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
