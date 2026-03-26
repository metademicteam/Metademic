import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { AppProvider, NewsItem, SpecialIssue, Subject, Journal } from "@/context/AppContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Metademic — Open Access Publishing Platform",
  description:
    "Metademic is a pioneer in scholarly open access publishing. Browse journals, articles, and topics across all scientific disciplines.",
};

type SupabaseSpecialIssue = {
  title: string;
  slug: string;
  deadline: string | null;
  journal: { title: string } | null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  // Fetch all journals
  const { data: journalsData } = await supabase
    .from("journals")
    .select("id, title, slug, impact_factor")
    .eq("is_active", true);

  // Fetch News/Announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  // Fetch Special Issues
  const { data: specialIssuesData } = await supabase
    .from("special_issues")
    .select(`
      title,
      slug,
      deadline,
      journal:journals (
        title
      )
    `)
    .eq("is_open", true)
    .limit(3) as { data: SupabaseSpecialIssue[] | null };

  // Fetch Subjects
  const { data: subjectsData } = await supabase
    .from("subjects")
    .select("id, name, slug, icon_url")
    .limit(12);

  const mappedNews: NewsItem[] = (announcements || []).map((news) => ({
    date: news.published_at 
      ? new Date(news.published_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Unknown",
    title: news.title,
    href: `/news/${news.id}`,
  }));

  const mappedSpecialIssues: SpecialIssue[] = (specialIssuesData || []).map((issue) => ({
    title: issue.title,
    journal: issue.journal?.title || "",
    deadline: issue.deadline || "",
    href: `/special-issues/${issue.slug}`,
  }));

  const mappedSubjects: Subject[] = (subjectsData || []).map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    icon_url: s.icon_url || undefined,
  }));

  const mappedJournals: Journal[] = (journalsData || []).map(j => ({
    id: j.id,
    title: j.title,
    slug: j.slug,
    impact_factor: j.impact_factor || undefined,
  }));

  const appData = {
    recentArticles: [], // Page specific articles will be fetched by the page component
    newsItems: mappedNews,
    specialIssues: mappedSpecialIssues,
    subjects: mappedSubjects,
    journals: mappedJournals,
  };

  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased font-sans`}>
        <AppProvider data={appData}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
