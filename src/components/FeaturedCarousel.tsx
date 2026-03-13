'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
    {
        journal: 'Pharmaceuticals',
        title: 'Benzimidazole-Quinoline Hybrids: Synthesis and Antimicrobial Properties',
        color: '#9c27b0',
        bgGradient: 'linear-gradient(135deg, #7b1fa2, #4a148c)',
    },
    {
        journal: 'Sustainability',
        title: 'Urban Green Infrastructure: Planning and Impact Assessment for Sustainable Cities',
        color: '#4caf50',
        bgGradient: 'linear-gradient(135deg, #388e3c, #1b5e20)',
    },
    {
        journal: 'Sensors',
        title: 'Advanced MEMS Sensors for IoT Applications in Smart Manufacturing',
        color: '#ff9800',
        bgGradient: 'linear-gradient(135deg, #f57c00, #e65100)',
    },
]

export default function FeaturedCarousel() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const goTo = (index: number) => setCurrent(index)
    const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
    const next = () => setCurrent((current + 1) % slides.length)

    return (
        <div className="relative rounded overflow-hidden group" style={{ height: '260px' }}>
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                        opacity: i === current ? 1 : 0,
                        background: slide.bgGradient,
                    }}
                >
                    {/* Decorative molecular/scientific pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-10 w-16 h-16 border border-white/30 rounded-full" />
                        <div className="absolute top-20 left-32 w-8 h-8 border border-white/20 rounded-full" />
                        <div className="absolute bottom-14 right-20 w-12 h-12 border border-white/25 rounded-full" />
                        <div className="absolute top-5 right-40 w-6 h-6 bg-white/10 rounded-full" />
                        <div className="absolute bottom-8 left-1/2 w-20 h-20 border border-white/15 rounded-full" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                        <p className="text-white/80 text-[13px] italic mb-1">{slide.journal}</p>
                        <h3 className="text-white text-[17px] font-bold leading-snug max-w-[90%]">
                            {slide.title}
                        </h3>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`carousel-dot ${i === current ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}
