'use client'

import Link from 'next/link'
import { useState } from 'react'

const subjectCategories = [
    'Biology & Life Sciences',
    'Business & Economics',
    'Chemistry & Materials Science',
    'Computer Science & Mathematics',
    'Engineering',
    'Environmental & Earth Sciences',
    'Medicine & Pharmacology',
    'Physical Sciences',
    'Public Health & Healthcare',
    'Social Sciences, Arts and Humanities',
]

const journalsBySubject: Record<string, { name: string; color: string; abbr: string }[]> = {
    'Biology & Life Sciences': [
        { name: 'Agriculture', color: '#689f38', abbr: 'AG' },
        { name: 'Agrochemicals', color: '#558b2f', abbr: 'AC' },
        { name: 'Agronomy', color: '#33691e', abbr: 'AGR' },
        { name: 'Allergies', color: '#7cb342', abbr: 'AL' },
        { name: 'Animals', color: '#8d6e63', abbr: 'AN' },
        { name: 'Antibiotics', color: '#ef5350', abbr: 'AB' },
        { name: 'Antibodies', color: '#e53935', abbr: 'ABD' },
        { name: 'Antioxidants', color: '#c62828', abbr: 'AO' },
        { name: 'Applied Biosciences', color: '#43a047', abbr: 'ABS' },
        { name: 'Applied Microbiology', color: '#2e7d32', abbr: 'AM' },
        { name: 'Aquaculture Journal', color: '#0277bd', abbr: 'AJ' },
        { name: 'Arthropoda', color: '#4e342e', abbr: 'ART' },
        { name: 'Biology', color: '#1b5e20', abbr: 'BIO' },
        { name: 'Biomedicines', color: '#283593', abbr: 'BM' },
        { name: 'BioTech', color: '#00838f', abbr: 'BT' },
        { name: 'Cells', color: '#ad1457', abbr: 'CE' },
    ],
    'Chemistry & Materials Science': [
        { name: 'Catalysts', color: '#ff8f00', abbr: 'CA' },
        { name: 'Chemistry', color: '#5d4037', abbr: 'CH' },
        { name: 'Coatings', color: '#6a1b9a', abbr: 'CO' },
        { name: 'Colloids', color: '#00695c', abbr: 'CL' },
        { name: 'Crystals', color: '#1565c0', abbr: 'CR' },
        { name: 'Gels', color: '#00897b', abbr: 'GE' },
        { name: 'Materials', color: '#3f51b5', abbr: 'MA' },
        { name: 'Metals', color: '#455a64', abbr: 'ME' },
        { name: 'Molecules', color: '#00bcd4', abbr: 'MO' },
        { name: 'Nanomaterials', color: '#0097a7', abbr: 'NM' },
        { name: 'Polymers', color: '#7b1fa2', abbr: 'PO' },
        { name: 'Surfaces', color: '#c0ca33', abbr: 'SU' },
    ],
    'Computer Science & Mathematics': [
        { name: 'Algorithms', color: '#546e7a', abbr: 'ALG' },
        { name: 'Analytics', color: '#1e88e5', abbr: 'ANA' },
        { name: 'Applied Sciences', color: '#e91e63', abbr: 'AS' },
        { name: 'Big Data', color: '#3949ab', abbr: 'BD' },
        { name: 'Computation', color: '#5e35b1', abbr: 'CP' },
        { name: 'Cryptography', color: '#4527a0', abbr: 'CY' },
        { name: 'Data', color: '#1976d2', abbr: 'DA' },
        { name: 'Electronics', color: '#0288d1', abbr: 'EL' },
        { name: 'Entropy', color: '#9e9d24', abbr: 'EN' },
        { name: 'Future Internet', color: '#00acc1', abbr: 'FI' },
        { name: 'Information', color: '#0277bd', abbr: 'IN' },
        { name: 'IoT', color: '#00796b', abbr: 'IOT' },
        { name: 'Mathematics', color: '#607d8b', abbr: 'MTH' },
        { name: 'Machine Learning', color: '#7c4dff', abbr: 'ML' },
        { name: 'Robotics', color: '#ff6f00', abbr: 'RO' },
        { name: 'Symmetry', color: '#8e24aa', abbr: 'SY' },
    ],
    'Engineering': [
        { name: 'Automation', color: '#1565c0', abbr: 'AU' },
        { name: 'Buildings', color: '#6d4c41', abbr: 'BU' },
        { name: 'Civil Engineering', color: '#795548', abbr: 'CIV' },
        { name: 'Designs', color: '#e91e63', abbr: 'DE' },
        { name: 'Energies', color: '#ff5722', abbr: 'ENR' },
        { name: 'Engines', color: '#bf360c', abbr: 'ENG' },
        { name: 'Fluids', color: '#0277bd', abbr: 'FL' },
        { name: 'Infrastructures', color: '#455a64', abbr: 'INF' },
        { name: 'Lubricants', color: '#827717', abbr: 'LU' },
        { name: 'Machines', color: '#37474f', abbr: 'MCH' },
        { name: 'Processes', color: '#4e342e', abbr: 'PR' },
        { name: 'Technologies', color: '#0097a7', abbr: 'TE' },
    ],
}

// Default to first category
const defaultCategory = 'Biology & Life Sciences'

export default function JournalsBySubject() {
    const [activeCategory, setActiveCategory] = useState(defaultCategory)
    const journals = journalsBySubject[activeCategory] || journalsBySubject[defaultCategory]

    return (
        <section className="max-w-[1280px] mx-auto px-4 py-10">
            <h2 className="text-[22px] font-bold text-mdpi-text-dark mb-6">
                Journals by Subject
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Category List (Left) */}
                <div className="lg:w-[240px] flex-shrink-0 space-y-0.5">
                    {subjectCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`subject-link w-full text-left ${activeCategory === cat ? 'active' : ''
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Journal Grid (Right) */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {journals.map((journal) => (
                            <Link
                                key={journal.name}
                                href={`/journal/${journal.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center gap-3 py-2 px-2 hover:bg-white rounded transition-colors no-underline group"
                            >
                                <div
                                    className="journal-icon"
                                    style={{ backgroundColor: journal.color }}
                                >
                                    {journal.abbr}
                                </div>
                                <span className="text-[13px] text-mdpi-text-dark group-hover:text-mdpi-blue transition-colors leading-tight">
                                    {journal.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
