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

const recentArticles = [
  {
    id: "1",
    title:
      "Engines of Memory: A Model of Mobilized Nostalgia Tourism Through Alternative Transportation Networks",
    abstract:
      "This study proposes a comprehensive framework for understanding how heritage rail networks and vintage transportation systems create nostalgia-driven tourism experiences. Through analysis of 40 case studies across Europe and North America, we identify key factors that contribute to successful heritage transportation tourism, including authenticity of experience, community engagement, and sustainable preservation practices. The findings suggest that these transportation networks serve as powerful catalysts for regional economic development while preserving cultural heritage.",
    doi: "10.3390/sustainability16050512",
    published_at: "4 Mar 2026",
    authors: ["Maria C. Rodriguez", "Thomas H. Weber", "Yuki Nakamura"],
    journal_title: "Sustainability",
    journal_slug: "sustainability",
    volume: "18",
    issue: "5",
    pages: "43 pages",
    fileSize: "817 KB",
    specialIssue:
      "New Perspectives in the Management and Monitoring of Mountain Ecosystems",
  },
  {
    id: "2",
    title:
      "Sandwich Results for Holomorphic Functions Related to an Integral Operator",
    abstract:
      "In this paper, we introduce a new logarithmic integral operator that unifies differentiation and fractional integration within the complex domain. The present work addresses this gap by applying the proposed operator to analytic functions represented by alternating power series. The method demonstrates that the results extend classical subordination theorems and provide new coefficient bounds for starlike and convex functions of complex order.",
    doi: "10.3390/fractalfract10030171",
    published_at: "4 Mar 2026",
    authors: [
      "Amal Mohammed Darweesh",
      "Adel Salim Tayyah",
      "Sarem H. Hadi",
      "Alina Alb Lupaș",
    ],
    journal_title: "Fractal Fract.",
    journal_slug: "fractalfract",
    volume: "10",
    issue: "3",
    pages: "21 pages",
    fileSize: "348 KB",
    specialIssue:
      "Fractional Calculus, Quantum Calculus and Special Functions in Complex Analysis",
  },
  {
    id: "3",
    title:
      "Multi-Scale Feature Extraction Network for Semantic Segmentation of Remote Sensing Images Using Attention Mechanisms",
    abstract:
      "Remote sensing image semantic segmentation faces significant challenges due to the complexity and variability of ground objects. This paper proposes a novel multi-scale feature extraction network that incorporates channel and spatial attention mechanisms for improved segmentation accuracy. Experimental results on the Potsdam and Vaihingen datasets demonstrate that our method achieves state-of-the-art performance, with overall accuracy improvements of 2.3% and 1.8% respectively compared to existing approaches.",
    doi: "10.3390/rs18050234",
    published_at: "3 Mar 2026",
    authors: ["Wei Zhang", "Li Chen", "Marco Benedetti"],
    journal_title: "Remote Sensing",
    journal_slug: "remote-sensing",
    volume: "18",
    issue: "5",
    pages: "18 pages",
    fileSize: "5.2 MB",
  },
  {
    id: "4",
    title:
      "Impact of Gut Microbiota Composition on Metabolic Syndrome: A Systematic Review and Meta-Analysis",
    abstract:
      "This systematic review and meta-analysis examines the relationship between gut microbiota composition and metabolic syndrome across 85 clinical studies involving over 12,000 participants. Our analysis reveals consistent associations between reduced microbial diversity and increased prevalence of metabolic syndrome components, including insulin resistance, dyslipidemia, and central obesity. We identify specific bacterial taxa that show protective or detrimental associations and discuss potential therapeutic implications.",
    doi: "10.3390/nutrients18030089",
    published_at: "3 Mar 2026",
    authors: [
      "Priya Sharma",
      "Robert J. Williams",
      "Fatima Al-Hassan",
      "Jun Takeda",
    ],
    journal_title: "Nutrients",
    journal_slug: "nutrients",
    volume: "18",
    issue: "3",
    pages: "32 pages",
    fileSize: "1.1 MB",
    specialIssue:
      "Gut-Brain Axis and Metabolic Health: Emerging Insights",
  },
  {
    id: "5",
    title:
      "Adaptive Control Strategies for Hybrid Energy Storage Systems in Electric Vehicle Applications",
    abstract:
      "This paper presents a novel adaptive control strategy for hybrid energy storage systems combining lithium-ion batteries and supercapacitors in electric vehicles. The proposed fuzzy logic-based energy management system dynamically allocates power between storage components to optimize efficiency, extend battery life, and improve vehicle performance. Hardware-in-the-loop testing validates the approach, demonstrating a 15% improvement in overall energy efficiency compared to conventional rule-based strategies.",
    doi: "10.3390/en19020156",
    published_at: "2 Mar 2026",
    authors: ["Klaus Fischer", "Sofia Petrova", "Ahmed Hassan"],
    journal_title: "Energies",
    journal_slug: "energies",
    volume: "19",
    issue: "2",
    pages: "24 pages",
    fileSize: "2.3 MB",
  },
  {
    id: "6",
    title:
      "Psychosocial Factors Influencing Vaccine Hesitancy Among Healthcare Workers: A Cross-Sectional Study",
    abstract:
      "Vaccine hesitancy among healthcare workers poses a significant challenge to public health. This cross-sectional study surveyed 3,200 healthcare professionals across 15 hospitals to identify key psychosocial predictors of vaccine hesitancy. Using structural equation modeling, we found that perceived risk, trust in health authorities, and peer influence were the strongest predictors, while institutional support and targeted education programs showed the greatest potential for intervention.",
    doi: "10.3390/vaccines14020078",
    published_at: "2 Mar 2026",
    authors: ["Elena Kowalski", "David Osei-Bonsu", "Lucia Fernández"],
    journal_title: "Vaccines",
    journal_slug: "vaccines",
    volume: "14",
    issue: "2",
    pages: "16 pages",
    fileSize: "890 KB",
  },
];

export default function Home() {
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
                {recentArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
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
