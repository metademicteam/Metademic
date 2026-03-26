import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ArticleCard from "@/components/ArticleCard";
import FeedbackBanner from "@/components/FeedbackBanner";
import JournalsBySubject from "@/components/JournalsBySubject";
import Footer from "@/components/Footer";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/context/AppContext";

type SupabaseArticle = {
  id: string;
  title: string;
  abstract: string | null;
  doi: string | null;
  published_at: string | null;
  journal: { title: string; slug: string } | null;
  authors: { full_name: string; author_order: number }[];
  issue: { number: number; volume: { number: number } | null } | null;
};

export default async function Home() {
  const supabase = await createClient();

  // Fetch Recent Articles (Specific to Home page)
  const { data: articles } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      abstract,
      doi,
      published_at,
      journal:journals (
        title,
        slug
      ),
      authors:article_authors (
        full_name,
        author_order
      ),
      issue:issues (
        number,
        volume:volumes (
          number
        )
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6) as { data: SupabaseArticle[] | null };

  const mappedArticles: Article[] = (articles || []).map((art) => ({
    id: art.id,
    title: art.title,
    abstract: art.abstract || "",
    doi: art.doi || "",
    published_at: art.published_at || "",
    authors: (art.authors || [])
      .sort((a, b) => a.author_order - b.author_order)
      .map((auth) => auth.full_name),
    journal_title: art.journal?.title || "",
    journal_slug: art.journal?.slug || "",
    volume: art.issue?.volume?.number?.toString(),
    issue: art.issue?.number?.toString(),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-mdpi-gray-bg">
      <Navbar />
      <Hero />

      {/* Main 3-Column Layout */}
      <div className="max-w-[1280px] mx-auto px-4 py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[220px] flex-shrink-0">
            <LeftSidebar />
          </div>

          {/* Center Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Carousel */}
            <FeaturedCarousel />

            {/* Recent Articles */}
            <div className="mt-6">
              <h2 className="text-[18px] font-bold text-mdpi-text-dark mb-4">
                Recent Articles
              </h2>

              <div className="bg-white rounded border border-mdpi-border">
                {mappedArticles.length > 0 ? (
                  mappedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="p-8 text-center text-mdpi-gray-text">
                    No recent articles found.
                  </div>
                )}
              </div>

              {/* More Articles Link */}
              <div className="mt-4 text-center">
                <Link
                  href="/articles"
                  className="text-[14px] text-mdpi-link-blue font-medium hover:underline no-underline"
                >
                  More Articles...
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[260px] flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      <FeedbackBanner />

      {/* Journals by Subject */}
      <JournalsBySubject />

      {/* Footer */}
      <Footer />
    </div>
  );
}
