'use client'

import Link from 'next/link'
import { useAppData } from '@/context/AppContext'

const blogPosts = [
    {
        date: '3 March 2026',
        title: 'How AI Is Revolutionizing Peer Review in Academic Publishing',
        href: '#',
    },
    {
        date: '1 March 2026',
        title: 'Top 10 Open Access Journals in Environmental Science for 2026',
        href: '#',
    },
]

export default function RightSidebar() {
    const appData = useAppData();
    const newsItems = appData?.newsItems || [
        {
            date: '4 March 2026',
            title: "Metademic's 2025 Best Paper Awards — Award-Winning Papers Announced",
            href: '#',
        },
        {
            date: '17 March 2026',
            title: 'International Women\'s Day — "Give to Gain"',
            href: '#',
        },
    ];
    
    const specialIssues = appData?.specialIssues || [
        {
            title: 'New Perspectives in the Management and Monitoring of Mountain Ecosystems',
            journal: 'Sustainability',
            deadline: '30 April 2026',
            href: '#',
        },
    ];

    return (
        <aside className="space-y-6">
            {/* News */}
            <div>
                <h2 className="text-[18px] font-bold text-mdpi-text-dark mb-4">
                    News
                </h2>
                <div className="space-y-4">
                    {newsItems.map((item, i) => (
                        <div key={i} className="border-b border-mdpi-gray-light pb-3">
                            <div className="text-[12px] text-mdpi-blue font-medium mb-1">{item.date}</div>
                            <Link
                                href={item.href}
                                className="text-[13px] text-mdpi-link-blue hover:text-mdpi-blue leading-snug no-underline hover:underline"
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                    <Link
                        href="/news"
                        className="text-[13px] text-mdpi-link-blue font-medium hover:underline no-underline"
                    >
                        More News & Announcements...
                    </Link>
                </div>
            </div>

            {/* Blog Posts */}
            <div>
                <h2 className="text-[18px] font-bold text-mdpi-text-dark mb-4">
                    Blog Posts
                </h2>
                <div className="space-y-4">
                    {blogPosts.map((post, i) => (
                        <div key={i} className="border-b border-mdpi-gray-light pb-3">
                            <div className="text-[12px] text-mdpi-blue font-medium mb-1">{post.date}</div>
                            <Link
                                href={post.href}
                                className="text-[13px] text-mdpi-link-blue hover:text-mdpi-blue leading-snug no-underline hover:underline"
                            >
                                {post.title}
                            </Link>
                        </div>
                    ))}
                    <Link
                        href="/blog"
                        className="text-[13px] text-mdpi-link-blue font-medium hover:underline no-underline"
                    >
                        More Blog Posts...
                    </Link>
                </div>
            </div>

            {/* Selected Special Issues */}
            <div>
                <h2 className="text-[18px] font-bold text-mdpi-text-dark mb-4">
                    Selected Special Issues
                </h2>
                <div className="space-y-4">
                    {specialIssues.map((issue, i) => (
                        <div key={i} className="border-b border-mdpi-gray-light pb-3">
                            <Link
                                href={issue.href}
                                className="text-[13px] text-mdpi-link-blue hover:text-mdpi-blue leading-snug no-underline hover:underline font-medium"
                            >
                                {issue.title}
                            </Link>
                            <div className="text-[11px] text-mdpi-gray-text mt-1">
                                <span className="italic">{issue.journal}</span> · Deadline: {issue.deadline}
                            </div>
                        </div>
                    ))}
                    <Link
                        href="/special-issues"
                        className="text-[13px] text-mdpi-link-blue font-medium hover:underline no-underline"
                    >
                        More Special Issues...
                    </Link>
                </div>
            </div>

            {/* Topical Collections */}
            <div>
                <h2 className="text-[18px] font-bold text-mdpi-text-dark mb-4">
                    Topical Collections
                </h2>
                <div className="space-y-2">
                    {['Sustainable Urban Development', 'Advances in Nanomaterials', 'Climate Change Mitigation'].map((topic, i) => (
                        <Link
                            key={i}
                            href="#"
                            className="block text-[13px] text-mdpi-link-blue hover:text-mdpi-blue no-underline hover:underline py-1"
                        >
                            {topic}
                        </Link>
                    ))}
                    <Link
                        href="/topics"
                        className="text-[13px] text-mdpi-link-blue font-medium hover:underline no-underline"
                    >
                        More Topical Collections...
                    </Link>
                </div>
            </div>
        </aside>
    )
}
