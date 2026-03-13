'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
    const [keyword, setKeyword] = useState('')
    const [author, setAuthor] = useState('')

    return (
        <div className="relative">
            {/* Announcement Banner */}
            <div className="bg-[#e8f0fe] text-[13px] text-mdpi-text-body py-2 px-4 text-center border-b border-[#c5d9f0]">
                <span className="inline-flex items-center gap-1">
                    <span className="text-mdpi-blue font-medium">ⓘ</span>
                    Welcome to the Metademic platform.{' '}
                    <a href="#" className="text-mdpi-link-blue font-medium hover:underline">
                        Explore and share your feedback with us
                    </a>.
                </span>
            </div>

            {/* Hero Banner */}
            <div
                className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #5b9bd5 0%, #2a7ab8 40%, #1a5276 100%)',
                }}
            >
                {/* Decorative circles/shapes */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-50px] right-[-80px] w-[400px] h-[400px] border border-white/10 rounded-full" />
                    <div className="absolute top-[20px] right-[60px] w-[250px] h-[250px] border border-white/8 rounded-full" />
                    <div className="absolute bottom-[-30px] left-[-40px] w-[200px] h-[200px] border border-white/5 rounded-full" />
                    {/* Subtle grid lines */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(0deg, white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-14 lg:py-20">
                    <h1 className="text-white text-[32px] lg:text-[42px] font-bold leading-tight mb-3">
                        Advancing Open Science
                    </h1>
                    <p className="text-white/90 text-[16px] lg:text-[18px] font-semibold">
                        Supporting academic communities
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white border-b border-mdpi-border py-4">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                        <span className="text-[15px] font-bold text-mdpi-text-dark whitespace-nowrap">
                            Search for Articles:
                        </span>
                        <div className="flex flex-col md:flex-row flex-1 gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Title / Keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="flex-1 border border-mdpi-border rounded px-3 py-2 text-[13px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue/20"
                            />
                            <input
                                type="text"
                                placeholder="Author / Affiliation / Email"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="flex-1 border border-mdpi-border rounded px-3 py-2 text-[13px] focus:outline-none focus:border-mdpi-blue focus:ring-1 focus:ring-mdpi-blue/20"
                            />
                            <select className="border border-mdpi-border rounded px-3 py-2 text-[13px] text-mdpi-gray-text bg-white focus:outline-none focus:border-mdpi-blue min-w-[140px]">
                                <option>All Journals</option>
                                <option>IJMS</option>
                                <option>JCM</option>
                                <option>Sustainability</option>
                                <option>Applied Sciences</option>
                                <option>Sensors</option>
                            </select>
                            <select className="border border-mdpi-border rounded px-3 py-2 text-[13px] text-mdpi-gray-text bg-white focus:outline-none focus:border-mdpi-blue min-w-[140px]">
                                <option>All Article Types</option>
                                <option>Article</option>
                                <option>Review</option>
                                <option>Communication</option>
                                <option>Editorial</option>
                            </select>
                            <button className="bg-mdpi-blue text-white px-6 py-2 rounded text-[13px] font-bold hover:bg-mdpi-blue-dark transition-colors flex items-center gap-2 whitespace-nowrap">
                                <Search size={14} />
                                Search
                            </button>
                            <a href="#" className="text-[13px] text-mdpi-link-blue font-medium self-center hover:underline whitespace-nowrap">
                                Advanced
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
