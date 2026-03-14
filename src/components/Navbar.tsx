'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X, User, LogOut, FilePlus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

import { User as SupabaseUser } from '@supabase/supabase-js'

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
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const supabase = createClient()
    const router = useRouter()

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
                        <Link
                            key={link.label}
                            href={link.href}
                            className="block py-2 px-3 text-[14px] font-medium text-mdpi-text-dark hover:bg-mdpi-gray-bg rounded no-underline"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
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
