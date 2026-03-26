import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Info, Mail, Briefcase, Newspaper, Camera, Edit3 } from 'lucide-react';
import { createClient, createAdminClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 86400; // ISR validation every 24 hours

const iconMap: Record<string, React.ElementType> = {
    'info': Info,
    'mail': Mail,
    'briefcase': Briefcase,
    'newspaper': Newspaper,
    'camera': Camera,
    'edit3': Edit3
};

export async function generateStaticParams() {
    const supabase = createAdminClient();
    const { data } = await supabase
        .from("site_content")
        .select("slug")
        .eq("category", "about");
    
    return (data || []).map(item => ({
        slug: item.slug
    }));
}

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
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
            
            <div className="bg-[#1a252f] py-16 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mdpi-blue opacity-5 -mr-32 -mt-32 rounded-full"></div>
                <div className="max-w-[800px] mx-auto px-4 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-mdpi-blue/20 rounded-full">
                            <Icon size={48} className="text-mdpi-blue-light" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4 tracking-tight">{pageInfo.title}</h1>
                    <p className="text-[16px] text-white/70">
                        Learn more about Metademic&apos;s heritage, services, and commitment to the academic community.
                    </p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-8 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white p-8 md:p-10 rounded shadow-sm border border-mdpi-border">
                            <div className="prose prose-sm max-w-none prose-headings:text-mdpi-text-dark prose-p:text-mdpi-gray-text prose-a:text-mdpi-link-blue hover:prose-a:underline" dangerouslySetInnerHTML={{ __html: pageInfo.content_html }}>
                            </div>
                            
                            <div className="mt-10 pt-6 border-t border-mdpi-border flex items-center justify-between text-[13px] text-mdpi-gray-text">
                                <span>Stay connected with Metademic</span>
                                <div className="flex gap-4">
                                    <a href="#" className="hover:text-mdpi-blue transition-colors">Twitter</a>
                                    <a href="#" className="hover:text-mdpi-blue transition-colors">LinkedIn</a>
                                </div>
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
