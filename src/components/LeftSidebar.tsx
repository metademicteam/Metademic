'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const journalColors: Record<string, string> = {
    'Sustainability': '#4caf50',
    'Applied Sciences': '#e91e63',
    'IJMS': '#9c27b0',
    'JCM': '#2196f3',
    'Sensors': '#ff9800',
    'Molecules': '#00bcd4',
    'Energies': '#ff5722',
    'Mathematics': '#607d8b',
    'Nutrients': '#8bc34a',
    'Materials': '#3f51b5',
    'Cells': '#e91e63',
    'Remote Sensing': '#009688',
    'Water': '#03a9f4',
    'Cancers': '#f44336',
    'Agriculture': '#689f38',
    'Foods': '#ff6f00',
    'Plants': '#2e7d32',
    'Forests': '#1b5e20',
    'Life': '#26a69a',
    'Healthcare': '#5c6bc0',
}

const journals = Object.keys(journalColors)

export default function LeftSidebar() {
    return (
        <aside className="space-y-4">
            {/* Open Access Journals Header */}
            <h2 className="text-[18px] font-bold text-mdpi-text-dark">
                Open Access Journals
            </h2>

            {/* Journal search */}
            <div className="relative">
                <select className="w-full border border-mdpi-border rounded px-3 py-2 text-[13px] text-mdpi-gray-text bg-white focus:outline-none focus:border-mdpi-blue appearance-none pr-8">
                    <option>Find Journal...</option>
                    {journals.map(j => (
                        <option key={j}>{j}</option>
                    ))}
                </select>
                <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-mdpi-gray-text rotate-90" />
            </div>

            {/* Browse Links */}
            <div className="space-y-1 text-[13px]">
                <Link href="/journals/indexing" className="flex items-center gap-1 text-mdpi-link-blue hover:text-mdpi-blue no-underline hover:underline py-0.5">
                    <ChevronRight size={12} className="text-mdpi-gray-text" />
                    Browse by Indexing
                </Link>
                <Link href="/journals/subject" className="flex items-center gap-1 text-mdpi-link-blue hover:text-mdpi-blue no-underline hover:underline py-0.5">
                    <ChevronRight size={12} className="text-mdpi-gray-text" />
                    Browse by Subject
                </Link>
            </div>

            {/* Journal List */}
            <div className="space-y-0 border-t border-mdpi-border pt-2">
                {journals.map((journal) => (
                    <Link
                        key={journal}
                        href={`/journal/${journal.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 py-2 px-1 hover:bg-mdpi-gray-bg rounded transition-colors no-underline group border-b border-mdpi-gray-light/50"
                    >
                        <div
                            className="journal-icon text-[9px] leading-tight text-center"
                            style={{ backgroundColor: journalColors[journal] || '#666' }}
                        >
                            {journal.split(' ').map(w => w[0]).join('').slice(0, 3)}
                        </div>
                        <span className="text-[13px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors">
                            {journal}
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    )
}
