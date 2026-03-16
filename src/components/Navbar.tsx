'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X, User, LogOut, FilePlus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

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
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()

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
                    <div className="hidden lg:flex items-center gap-1 ml-6">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="flex items-center gap-0.5 px-3 py-2 text-[14px] font-medium text-mdpi-text-dark hover:text-mdpi-blue no-underline transition-colors"
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown size={13} className="ml-0.5 opacity-50 group-hover:rotate-180 transition-transform" />}
                                </Link>

                                {link.hasDropdown && (
                                    <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-[100]">
                                        <div className="bg-white border border-mdpi-border shadow-2xl rounded-md py-2 min-w-[240px] overflow-hidden">
                                            {link.dropdownItems?.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={(e) => handleLinkClick(e, item.href)}
                                                    className="block px-4 py-2.5 text-[13px] text-mdpi-text-dark hover:bg-mdpi-blue/5 hover:text-mdpi-blue no-underline transition-colors border-l-[3px] border-transparent hover:border-mdpi-blue"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
