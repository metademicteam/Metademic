'use client'

import React from 'react'

import Link from 'next/link'
import { ChevronDown, Menu, X, User, LogOut, FilePlus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
    {
        label: 'Journals',
        href: '/journals',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Active Journals', href: '/journals/active' },
            { label: 'Find a Journal', href: '/journals/find' },
            { label: 'Journal Proposal', href: '/journals/proposal' },
            { label: 'Proceedings Series', href: '/journals/proceedings' },
        ]
    },
    { label: 'Topics', href: '/topics', hasDropdown: false },
    {
        label: 'Information',
        href: '/information',
        hasDropdown: true,
        dropdownItems: [
            { label: 'For Authors', href: '/information/authors' },
            { label: 'For Reviewers', href: '/information/reviewers' },
            { label: 'For Editors', href: '/information/editors' },
            { label: 'For Librarians', href: '/information/librarians' },
            { label: 'For Publishers', href: '/information/publishers' },
            { label: 'For Societies', href: '/information/societies' },
            { label: 'For Conference Organizers', href: '/information/conference-organizers' },
            { label: 'Open Access Policy', href: '/information/open-access-policy' },
            { label: 'Institutional Open Access Program', href: '/information/institutional-open-access-program' },
            { label: 'Special Issues Guidelines', href: '/information/special-issues-guidelines' },
            { label: 'Editorial Process', href: '/information/editorial-process' },
            { label: 'Research and Publication Ethics', href: '/information/research-and-publication-ethics' },
            { label: 'Article Processing Charges', href: '/information/article-processing-charges' },
            { label: 'Awards', href: '/information/awards' },
            { label: 'Testimonials', href: '/information/testimonials' },
        ]
    },
    { label: 'Author Services', href: '/author-services', hasDropdown: false },
    { label: 'Initiatives', href: '/initiatives', hasDropdown: false },
    {
        label: 'About',
        href: '/about',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Overview', href: '/about/overview' },
            { label: 'Contact', href: '/about/contact' },
            { label: 'Careers', href: '/about/careers' },
            { label: 'News', href: '/about/news' },
            { label: 'Press', href: '/about/press' },
            { label: 'Blog', href: '/about/blog' },
        ]
    },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({})
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()

    const handleDropdownEnter = (label: string) => {
        setActiveDropdown(label)
    }

    const handleDropdownLeave = () => {
        setActiveDropdown(null)
    }

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If the link points to the current page, scroll to top
        if (pathname === href) {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    return (
        <nav className="bg-white border-b border-mdpi-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="flex items-center justify-between h-[56px]">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        onClick={(e) => handleLinkClick(e, '/')}
                        className="flex items-center gap-1 no-underline flex-shrink-0"
                    >
                        <div className="w-[42px] h-[36px] bg-mdpi-blue rounded-[3px] flex items-center justify-center text-white font-extrabold text-[25px] tracking-wide border-2 border-mdpi-blue-dark">
                            M
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 ml-6 h-full">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="dropdown-wrapper relative h-full flex items-center"
                                onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <Link
                                    href={link.href}
                                    ref={(el) => { linkRefs.current[link.label] = el }}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="flex items-center gap-0.5 px-3 py-2 text-[14px] font-semibold text-[#000000] hover:text-mdpi-blue no-underline transition-colors relative"
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <ChevronDown
                                            size={13}
                                            className={`ml-0.5 opacity-50 transition-transform duration-300 ${
                                                activeDropdown === link.label ? 'rotate-180' : ''
                                            }`}
                                        />
                                    )}
                                    {/* Hover underline effect */}
                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-mdpi-blue transition-transform origin-left duration-300 ${
                                        activeDropdown === link.label ? 'scale-x-100' : 'scale-x-0'
                                    }`}></span>
                                </Link>

                                 <AnimatePresence>
                                    {link.hasDropdown && activeDropdown === link.label && (
                                        <motion.div
                                            key={link.label}
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                            className={`
                                                absolute top-full pt-3 z-[100]
                                                ${link.label === 'Information'
                                                    ? 'left-1/2 -translate-x-1/2'
                                                    : 'left-1/2 -translate-x-1/2'
                                                }
                                            `}
                                        >
                                            {/* Arrow centered under the link text */}
                                            <div className="flex justify-center">
                                                <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[9px] border-b-[#32394d]"></div>
                                            </div>

                                            <div className={`
                                                bg-[#32394d] text-white
                                                shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden
                                                ${link.label === 'Information' ? 'w-[700px]' : 'min-w-[260px]'}
                                            `}>
                                                {link.label === 'Information' ? (
                                                    <div className="px-6 pt-5 pb-4">
                                                        {/* Header */}
                                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                                                            <div className="w-2 h-2 rounded-full bg-mdpi-blue"></div>
                                                            <span className="text-[11px] font-extrabold text-white/50 uppercase tracking-[2px]">Information & Resources</span>
                                                        </div>
                                                        {/* 3 columns */}
                                                        <div className="grid grid-cols-3 gap-x-4">
                                                            {/* Col 1: For Authors → For Publishers */}
                                                            <div>
                                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">For Stakeholders</p>
                                                                {link.dropdownItems?.slice(0, 5).map((item) => (
                                                                    <Link
                                                                        key={item.label}
                                                                        href={item.href}
                                                                        onClick={(e) => { handleLinkClick(e, item.href); setActiveDropdown(null) }}
                                                                        className="group/item flex items-center gap-2 px-2 py-1.5 text-[13px] font-medium text-white/80 hover:bg-white/10 hover:text-white no-underline transition-all rounded-md"
                                                                    >
                                                                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover/item:bg-mdpi-blue-light flex-shrink-0 transition-colors"></span>
                                                                        {item.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                            {/* Col 2: For Societies → Institutional Open Access */}
                                                            <div>
                                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Community & Access</p>
                                                                {link.dropdownItems?.slice(5, 10).map((item) => (
                                                                    <Link
                                                                        key={item.label}
                                                                        href={item.href}
                                                                        onClick={(e) => { handleLinkClick(e, item.href); setActiveDropdown(null) }}
                                                                        className="group/item flex items-center gap-2 px-2 py-1.5 text-[13px] font-medium text-white/80 hover:bg-white/10 hover:text-white no-underline transition-all rounded-md"
                                                                    >
                                                                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover/item:bg-mdpi-blue-light flex-shrink-0 transition-colors"></span>
                                                                        {item.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                            {/* Col 3: Special Issues → Testimonials */}
                                                            <div>
                                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Policies & More</p>
                                                                {link.dropdownItems?.slice(10).map((item) => (
                                                                    <Link
                                                                        key={item.label}
                                                                        href={item.href}
                                                                        onClick={(e) => { handleLinkClick(e, item.href); setActiveDropdown(null) }}
                                                                        className="group/item flex items-center gap-2 px-2 py-1.5 text-[13px] font-medium text-white/80 hover:bg-white/10 hover:text-white no-underline transition-all rounded-md"
                                                                    >
                                                                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover/item:bg-mdpi-blue-light flex-shrink-0 transition-colors"></span>
                                                                        {item.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col px-3 py-4 gap-0.5">
                                                        <h4 className="text-[11px] font-extrabold text-white/40 uppercase tracking-[2px] mb-3 px-3 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-mdpi-blue"></div>
                                                            {link.label}
                                                        </h4>
                                                        {link.dropdownItems?.map((item) => (
                                                            <Link
                                                                key={item.label}
                                                                href={item.href}
                                                                onClick={(e) => { handleLinkClick(e, item.href); setActiveDropdown(null) }}
                                                                className="group/item flex items-center justify-between px-3 py-2.5 text-[14px] font-medium text-white/85 hover:bg-white/10 hover:text-white no-underline transition-all rounded-lg"
                                                            >
                                                                {item.label}
                                                                <span className="opacity-0 group-hover/item:opacity-100 transition-all translate-x-[-6px] group-hover/item:translate-x-0">→</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 ml-auto">
                        {user ? (
                            <>
                                <Link
                                    href="/user/edit"
                                    className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-mdpi-text-dark hover:text-mdpi-blue transition-all no-underline"
                                >
                                    <User size={16} />
                                    Profile
                                </Link>
                                <Link
                                    href="/user/submit"
                                    className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-bold text-white bg-mdpi-blue rounded hover:bg-mdpi-blue-dark transition-colors no-underline"
                                >
                                    <FilePlus size={16} />
                                    Submit
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-red-600 hover:bg-red-50 rounded transition-all"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
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
                            </>
                        )}
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
                        <div key={link.label}>
                            <div className="flex items-center justify-between">
                                <Link
                                    href={link.href}
                                    className="grow py-2 px-3 text-[14px] font-medium text-mdpi-text-dark hover:bg-mdpi-gray-bg rounded no-underline"
                                    onClick={(e) => {
                                        setMobileOpen(false)
                                        handleLinkClick(e, link.href)
                                    }}
                                >
                                    {link.label}
                                </Link>
                                {link.hasDropdown && (
                                    <button 
                                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.label ? null : link.label)}
                                        className="p-2 text-mdpi-gray-text hover:text-mdpi-blue"
                                    >
                                        <ChevronDown size={18} className={`transition-transform duration-200 ${activeMobileDropdown === link.label ? 'rotate-180' : ''}`} />
                                    </button>
                                )}
                            </div>
                            
                            {link.hasDropdown && activeMobileDropdown === link.label && (
                                <div className="ml-4 pl-3 border-l-2 border-mdpi-blue/20 flex flex-col gap-1 mt-1 mb-2">
                                    {link.dropdownItems?.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="py-2 text-[13px] text-mdpi-gray-text hover:text-mdpi-blue no-underline"
                                            onClick={(e) => {
                                                setMobileOpen(false)
                                                handleLinkClick(e, item.href)
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-mdpi-border flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link
                                    href="/user/edit"
                                    className="text-center py-2 text-[13px] font-medium text-mdpi-text-dark border border-mdpi-border rounded no-underline"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/user/submit"
                                    className="text-center py-2 text-[13px] font-bold text-white bg-mdpi-blue rounded no-underline"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Submit
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="text-center py-2 text-[13px] font-medium text-red-600 border border-red-100 rounded no-underline"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-center py-2 text-[13px] font-medium text-mdpi-blue border border-mdpi-blue rounded no-underline"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Sign In / Sign Up
                                </Link>
                                <Link
                                    href="/submit"
                                    className="text-center py-2 text-[13px] font-bold text-white bg-mdpi-blue rounded no-underline"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Submit
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
