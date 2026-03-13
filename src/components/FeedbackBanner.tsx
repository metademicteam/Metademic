'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const banners = [
    {
        title: 'Feedback',
        subtitle: 'We are keen to hear what you think about Metademic.',
        cta: 'Feedback, suggestions, questions?',
        ctaLink: '/feedback',
        bgGradient: 'linear-gradient(135deg, rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.85))',
    },
    {
        title: 'Call for Papers',
        subtitle: 'Submit your research to our high-impact journals.',
        cta: 'View open calls →',
        ctaLink: '/call-for-papers',
        bgGradient: 'linear-gradient(135deg, rgba(0, 74, 135, 0.8), rgba(26, 82, 118, 0.85))',
    },
]

export default function FeedbackBanner() {
    const [current, setCurrent] = useState(0)

    return (
        <div className="relative overflow-hidden group" style={{ height: '200px' }}>
            {banners.map((banner, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700 flex items-center"
                    style={{
                        opacity: i === current ? 1 : 0,
                        background: banner.bgGradient,
                    }}
                >
                    {/* Decorative library/building overlay pattern */}
                    <div className="absolute inset-0 opacity-[0.15]" style={{
                        backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.1) 40px,
              rgba(255,255,255,0.1) 42px
            )`,
                    }} />

                    <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
                        <h2 className="text-white text-[28px] font-bold mb-2">{banner.title}</h2>
                        <p className="text-white/80 text-[15px] mb-4">{banner.subtitle}</p>
                        <Link
                            href={banner.ctaLink}
                            className="inline-block border border-white/70 text-white text-[13px] font-medium px-5 py-2 rounded hover:bg-white/20 transition-colors no-underline"
                        >
                            {banner.cta}
                        </Link>
                    </div>
                </div>
            ))}

            {/* Arrows */}
            <button
                onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={() => setCurrent((current + 1) % banners.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`carousel-dot ${i === current ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}
