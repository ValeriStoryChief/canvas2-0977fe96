import { useEffect, useState, useRef } from "react";
import {
  FileText, Calendar, Image, Search, Video, Layout, PenTool, Play,
  BarChart3, ExternalLink, Clock, Zap, CheckCircle2, TrendingUp, ListTodo,
  Code, Download, Globe
} from "lucide-react";
import { MobileCanvasToolbar } from "./MobileCanvasToolbar";
import { MobileSectionNav } from "./MobileSectionNav";
import { MobileChatSheet } from "./MobileChatSheet";

// Import assets
import storychiefLogo from "@/assets/storychief-logo.png";
import blogCover from "@/assets/blog-cover.jpg";
import landingPage from "@/assets/landing-page.jpg";
import videoThumbnail from "@/assets/video-thumbnail.jpg";
import promoImage1 from "@/assets/promo-image-1.jpg";
import promoImage2 from "@/assets/promo-image-2.jpg";
import promoImage3 from "@/assets/promo-image-3.jpg";
import promoImage4 from "@/assets/promo-image-4.jpg";

// Mobile Card Wrapper
const MobileCard = ({
  children,
  scrollProgress,
  revealAt,
}: {
  children: React.ReactNode;
  scrollProgress: number;
  revealAt: number;
}) => {
  const isVisible = scrollProgress >= revealAt;

  return (
    <div
      className="transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const MobileCanvasContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const chatMessages = [
    { role: "user" as const, text: "Build a marketing campaign for our product. We need full strategy, competitor research and all the assets.", revealAt: 3 },
    { role: "ai" as const, text: "I'll help you with keyword research, blog posts, social content, and visuals.", revealAt: 6 },
    { role: "user" as const, text: "Focus on SEO-optimized articles", revealAt: 12 },
    { role: "ai" as const, text: "Got it! Prioritizing high-volume, low-difficulty keywords for organic reach.", revealAt: 16 },
    { role: "user" as const, text: "Add a landing page and explainer video too", revealAt: 28 },
    { role: "ai" as const, text: "Done! I've added a landing page mockup and video script.", revealAt: 35 },
    { role: "user" as const, text: "Generate images of teams working together", revealAt: 50 },
    { role: "ai" as const, text: "I've generated 4 team collaboration images!", revealAt: 55 },
    { role: "user" as const, text: "Create LinkedIn and Twitter posts", revealAt: 62 },
    { role: "ai" as const, text: "Social posts created with hashtags and optimal timing suggestions!", revealAt: 66 },
    { role: "user" as const, text: "Schedule everything and export the code", revealAt: 72 },
    { role: "ai" as const, text: "Campaign scheduled! Blog Monday 9AM, social at 11AM. Ready to publish!", revealAt: 78 },
  ];

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Mobile Toolbar */}
      <MobileCanvasToolbar />

      {/* Section Navigation */}
      <MobileSectionNav scrollProgress={scrollProgress} />

      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="absolute inset-0 pt-[5.5rem] overflow-y-auto scroll-smooth"
      >
        {/* Grid Background */}
        <div
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 px-4 pb-24 space-y-4">
          {/* ========== SECTION 1: Research & Brainstorm ========== */}

          {/* Keyword Research */}
          <MobileCard scrollProgress={scrollProgress} revealAt={0}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Search className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Keyword Research</span>
                <BarChart3 className="w-4 h-4 text-emerald-600 ml-auto" />
              </div>
              <div className="p-3 overflow-x-auto">
                <table className="w-full text-xs min-w-[280px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="text-left pb-2 font-medium">Keyword</th>
                      <th className="text-right pb-2 font-medium">Vol</th>
                      <th className="text-right pb-2 font-medium">Diff</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    {[
                      { kw: "AI marketing collaboration", vol: "9.1K", diff: "Med", color: "text-yellow-500" },
                      { kw: "AI content creation tools", vol: "15.2K", diff: "High", color: "text-red-500" },
                      { kw: "AI assisted campaigns", vol: "4.8K", diff: "Low", color: "text-green-500" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2 pr-2">{row.kw}</td>
                        <td className="text-right text-muted-foreground">{row.vol}</td>
                        <td className={`text-right font-medium ${row.color}`}>{row.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </MobileCard>

          {/* Longtail Opportunities */}
          <MobileCard scrollProgress={scrollProgress} revealAt={3}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-teal-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Longtail Opportunities</span>
              </div>
              <div className="p-3 space-y-2">
                {[
                  "how to use AI for marketing teams",
                  "best AI tools for content creation",
                  "AI collaboration workflow tips",
                ].map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="text-xs text-foreground">{kw}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-green-100 text-green-700">High</span>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>

          {/* Go-to-Market */}
          <MobileCard scrollProgress={scrollProgress} revealAt={8}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-indigo-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Go-to-Market</span>
              </div>
              <div className="p-3 space-y-2.5">
                {[
                  { label: "Value Proposition", value: "AI-powered content collaboration that saves teams 10+ hrs/week", color: "bg-primary/10 text-primary" },
                  { label: "ICP", value: "Mid-market marketing teams (20-200 employees)", color: "bg-emerald-500/10 text-emerald-700" },
                  { label: "Marketing Mix", value: "Content-led growth, SEO, paid social, webinars", color: "bg-amber-500/10 text-amber-700" },
                  { label: "Positioning", value: "The only AI copilot built for marketing teams", color: "bg-violet-500/10 text-violet-700" },
                  { label: "Key Channels", value: "LinkedIn, Google Ads, Product Hunt, newsletters", color: "bg-cyan-500/10 text-cyan-700" },
                ].map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.color}`}>{item.label}</span>
                    <p className="text-xs text-foreground leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>

          {/* ========== SECTION 2: Create & Repurpose ========== */}

          {/* Landing Page */}
          <MobileCard scrollProgress={scrollProgress} revealAt={18}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-violet-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Layout className="w-3.5 h-3.5 text-violet-500" />
                </div>
                <span className="font-medium text-foreground text-sm">Landing Page</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
              <div className="p-3">
                <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-border">
                  <img src={landingPage} alt="Landing page" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Blog Article */}
          <MobileCard scrollProgress={scrollProgress} revealAt={25}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-primary/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-medium text-foreground text-sm">Blog Article</span>
                <span className="ml-auto px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full font-medium">Draft</span>
              </div>
              <div className="p-3">
                <div className="w-full h-20 rounded-lg mb-2 overflow-hidden">
                  <img src={blogCover} alt="Blog cover" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-foreground mb-1 text-xs">
                  How AI and Teams Create Better Campaigns Together
                </h4>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    10 min
                  </span>
                  <span>2,341 words</span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* LinkedIn Post */}
          <MobileCard scrollProgress={scrollProgress} revealAt={32}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-blue-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span className="font-medium text-foreground text-sm">LinkedIn Post</span>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img src={storychiefLogo} alt="StoryChief" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">StoryChief</p>
                    <p className="text-[10px] text-muted-foreground">15,423 followers</p>
                  </div>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  🤝 Discover how AI collaboration transforms your marketing workflow. Work smarter, create faster.
                </p>
                <div className="mt-2 pt-2 border-t border-border flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>👍 24</span>
                  <span>💬 8</span>
                  <span>🔄 12</span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Video Script */}
          <MobileCard scrollProgress={scrollProgress} revealAt={40}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <PenTool className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="font-medium text-foreground text-sm">Video Script</span>
              </div>
              <div className="p-3 space-y-2">
                {[
                  { time: "00:00", text: "Hook: \"What if AI could supercharge your team?\"" },
                  { time: "00:08", text: "Introducing AI-assisted campaigns" },
                  { time: "00:25", text: "Teams share their workflows" },
                  { time: "00:45", text: "CTA: Start collaborating today!" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[10px] font-mono text-primary font-medium w-8 flex-shrink-0">{item.time}</span>
                    <p className="text-xs text-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>

          {/* Promo Video */}
          <MobileCard scrollProgress={scrollProgress} revealAt={48}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-pink-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Video className="w-3.5 h-3.5 text-pink-500" />
                </div>
                <span className="font-medium text-foreground text-sm">Promo Video</span>
                <span className="ml-auto px-1.5 py-0.5 bg-pink-100 text-pink-700 text-[10px] rounded-full font-medium">Rendering</span>
              </div>
              <div className="p-3">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <img src={videoThumbnail} alt="Video" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white">0:45</span>
                    <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white">1080p</span>
                  </div>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Generated Images */}
          <MobileCard scrollProgress={scrollProgress} revealAt={55}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-rose-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <Image className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <span className="font-medium text-foreground text-sm">Generated Images</span>
                <Zap className="w-4 h-4 text-rose-500 ml-auto" />
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { image: promoImage1, label: "Hero" },
                    { image: promoImage2, label: "Social" },
                    { image: promoImage3, label: "Blog" },
                    { image: promoImage4, label: "Ad" },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileCard>

          {/* ========== SECTION 3: Export & Publish ========== */}

          {/* Schedule */}
          <MobileCard scrollProgress={scrollProgress} revealAt={65}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-cyan-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Schedule</span>
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  { label: "Blog Launch", time: "Mon, 9:00 AM", color: "bg-primary", status: "scheduled" },
                  { label: "LinkedIn Post", time: "Mon, 11:00 AM", color: "bg-blue-500", status: "scheduled" },
                  { label: "Newsletter", time: "Tue, 8:00 AM", color: "bg-green-500", status: "draft" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <div className={`w-1.5 h-5 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      item.status === "scheduled" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>

          {/* Export Code */}
          <MobileCard scrollProgress={scrollProgress} revealAt={75}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-slate-500/10 flex items-center justify-center">
                  <Code className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Export Code</span>
                <Download className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
              <div className="p-3">
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300 overflow-x-auto">
                  <div className="text-slate-500">{"<!-- Landing Page -->"}</div>
                  <div><span className="text-pink-400">{"<section"}</span> <span className="text-sky-300">class=</span><span className="text-amber-300">"hero"</span><span className="text-pink-400">{">"}</span></div>
                  <div className="pl-3"><span className="text-pink-400">{"<h1>"}</span>AI Campaigns<span className="text-pink-400">{"</h1>"}</span></div>
                  <div><span className="text-pink-400">{"</section>"}</span></div>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Distribution Channels */}
          <MobileCard scrollProgress={scrollProgress} revealAt={85}>
            <div className="mobile-canvas-card">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-purple-500/5 border-b border-border">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span className="font-medium text-foreground text-sm">Distribution</span>
              </div>
              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  {["WordPress", "LinkedIn", "Instagram", "Facebook", "TikTok", "X"].map((ch, i) => (
                    <div key={i} className="px-2.5 py-1.5 bg-muted/50 rounded-lg border border-border text-xs text-foreground">
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Bottom padding for chat sheet */}
          <div className="h-16" />
        </div>
      </div>

      {/* Mobile Chat Sheet */}
      <MobileChatSheet scrollProgress={scrollProgress} messages={chatMessages} />
    </div>
  );
};
