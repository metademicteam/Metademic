'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'
import { useState } from 'react'

interface ArticleProps {
    id: string
    title: string
    abstract: string
    doi: string
    published_at: string
    authors: string[]
    journal_title: string
    journal_slug: string
    volume?: string
    issue?: string
    pages?: string
    fileSize?: string
    specialIssue?: string
}

export default function ArticleCard({ article }: { article: ArticleProps }) {
    const [showAbstract, setShowAbstract] = useState(false)

    return (
        <div className="bg-white border-b border-mdpi-border py-5 px-1">
            {/* Top Row: Badges + File Info */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="badge-open-access">Open Access</span>
                    <span className="badge-article">Article</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-mdpi-gray-text">
                    <span>{article.pages || '15 pages'}, {article.fileSize || '420 KB'}</span>
                    <FileText size={14} className="text-mdpi-gray-text" />
                </div>
            </div>

            {/* Title */}
            <h3 className="text-[16px] font-bold text-mdpi-blue leading-snug mb-2 hover:underline">
                <Link href={`/article/${article.doi || article.id}`} className="no-underline text-mdpi-blue hover:underline">
                    {article.title}
                </Link>
            </h3>

            {/* Authors */}
            <div className="text-[13px] text-mdpi-text-body mb-2">
                <span>by </span>
                {article.authors.map((author, i) => (
                    <span key={i}>
                        <Link href="#" className="text-mdpi-text-dark hover:text-mdpi-blue no-underline hover:underline">
                            {author}
                        </Link>
                        {i < article.authors.length - 1 && (i === article.authors.length - 2 ? ' and ' : ', ')}
                    </span>
                ))}
            </div>

            {/* Journal Info */}
            <div className="text-[13px] text-mdpi-text-body mb-2">
                <span className="italic text-mdpi-gray-text">{article.journal_title}</span>
                {article.volume && <span> {new Date().getFullYear()}, {article.volume}</span>}
                {article.issue && <span>({article.issue})</span>}
                {', '}
                <Link href={`https://doi.org/${article.doi}`} className="text-mdpi-link-blue hover:underline no-underline text-[12px]">
                    https://doi.org/{article.doi}
                </Link>
                {' - '}
                <span className="text-[12px] text-mdpi-gray-text">{article.published_at}</span>
            </div>

            {/* Abstract Toggle */}
            <div className="mb-2">
                {showAbstract ? (
                    <div className="text-[13px] text-mdpi-text-body leading-relaxed">
                        <span className="font-bold">Abstract </span>
                        {article.abstract}
                        <button
                            onClick={() => setShowAbstract(false)}
                            className="text-mdpi-link-blue hover:underline ml-1 font-medium"
                        >
                            Show less
                        </button>
                    </div>
                ) : (
                    <div className="text-[13px] text-mdpi-text-body">
                        <span className="font-bold">Abstract </span>
                        {article.abstract.substring(0, 150)}...{' '}
                        <button
                            onClick={() => setShowAbstract(true)}
                            className="text-mdpi-link-blue hover:underline font-medium"
                        >
                            Read more.
                        </button>
                    </div>
                )}
            </div>

            {/* Special Issue Link */}
            {article.specialIssue && (
                <div className="text-[12px] text-mdpi-green mb-2">
                    (This article belongs to the Special Issue{' '}
                    <Link href="#" className="text-mdpi-green hover:underline no-underline font-medium">
                        {article.specialIssue}
                    </Link>
                    )
                </div>
            )}

            {/* Show Figures Toggle */}
            <button className="flex items-center gap-1 text-[12px] text-mdpi-gray-text hover:text-mdpi-blue transition-colors">
                <ChevronRight size={12} />
                <span>Show Figures</span>
            </button>
        </div>
    )
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="9 18 15 12 9 6" />
        </svg>
    )
}
