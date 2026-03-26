import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Info, BookOpen, Users, DollarSign, Award, ShieldCheck } from 'lucide-react';
import { createClient, createAdminClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 86400; // ISR validation every 24 hours

const iconMap: Record<string, React.ElementType> = {
    'users': Users,
    'shield-check': ShieldCheck,
    'book-open': BookOpen,
    'dollar-sign': DollarSign,
    'award': Award,
    'info': Info
};

export async function generateStaticParams() {
    const supabase = createAdminClient();
    const { data } = await supabase
        .from("site_content")
        .select("slug")
        .eq("category", "information");
    
    return (data || []).map(item => ({
        slug: item.slug
    }));
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const supabase = await createClient();

    const { data: pageInfo } = await supabase
        .from("site_content")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!pageInfo) {
        notFound();
    }

    const Icon = iconMap[pageInfo.icon_name || 'info'] || Info;

    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg text-[14px]">
            <Navbar />

            <div className="bg-gradient-to-r from-[#1a252f] to-mdpi-blue-dark py-12 text-white border-b-4 border-mdpi-blue">
                <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                        <Icon size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold capitalize">{pageInfo.title}</h1>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="bg-white p-8 rounded border border-mdpi-border shadow-sm">
                            <div className="prose prose-sm max-w-none prose-headings:text-mdpi-text-dark prose-p:text-mdpi-gray-text prose-a:text-mdpi-link-blue hover:prose-a:underline" dangerouslySetInnerHTML={{ __html: pageInfo.content_html }}>
                            </div>

                            <div className="mt-8 pt-6 border-t border-mdpi-border bg-mdpi-gray-bg/50 p-4 rounded text-[13px] text-mdpi-gray-text">
                                <strong>Need further assistance?</strong> Contact our support team at <a href="mailto:support@metademic.com" className="text-mdpi-link-blue hover:underline">support@metademic.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[260px] flex-shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
