import { useEffect, useRef, useState } from "react";
import { 
  FileText, Calendar, Share2, Image, 
  Search, Video, Layout, PenTool, Send, Play,
  BarChart3, Globe, ExternalLink, Clock, Users, Zap,
  ChevronRight, ArrowRight, CheckCircle2, MessageCircle, Mail,
  TrendingUp, ListTodo, Code, Download
} from "lucide-react";

// Import assets
import storychiefLogo from "@/assets/storychief-logo.png";
import userAvatar from "@/assets/user-avatar-new.jpg";
import aiAvatar from "@/assets/ai-avatar.jpg";
import blogCover from "@/assets/blog-cover.jpg";
import landingPage from "@/assets/landing-page.jpg";
import videoThumbnail from "@/assets/video-thumbnail.jpg";
import promoImage1 from "@/assets/promo-image-1.jpg";
import promoImage2 from "@/assets/promo-image-2.jpg";
import promoImage3 from "@/assets/promo-image-3.jpg";
import promoImage4 from "@/assets/promo-image-4.jpg";

// Section Progress Indicator
const SectionProgress = ({ scrollProgress }: { scrollProgress: number }) => {
  const sections = [
    { name: "Research & Brainstorm", range: [0, 33] },
    { name: "Create & Repurpose", range: [33, 70] },
    { name: "Export & Publish", range: [70, 100] },
  ];

  const getCurrentSection = () => {
    if (scrollProgress < 33) return 0;
    if (scrollProgress < 70) return 1;
    return 2;
  };

  const currentSection = getCurrentSection();

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 bg-card/95 backdrop-blur-md rounded-full border border-border shadow-lg">
      {sections.map((section, i) => {
        const isActive = i === currentSection;
        const isPast = i < currentSection;
        const sectionProgress = scrollProgress >= section.range[0] && scrollProgress < section.range[1]
          ? ((scrollProgress - section.range[0]) / (section.range[1] - section.range[0])) * 100
          : scrollProgress >= section.range[1] ? 100 : 0;

        return (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && (
              <div className={`w-8 h-0.5 rounded-full transition-colors ${isPast || isActive ? 'bg-primary' : 'bg-muted'}`} />
            )}
            <div className="flex items-center gap-2">
              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                isActive ? 'bg-primary text-primary-foreground' : isPast ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {isPast ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                {isActive && (
                  <svg className="absolute inset-0 w-7 h-7 -rotate-90">
                    <circle
                      cx="14"
                      cy="14"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${sectionProgress * 0.75} 100`}
                      className="text-primary-foreground/30"
                    />
                  </svg>
                )}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-foreground' : isPast ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {section.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Miro-like cursor component
const MiroCursor = ({ 
  name, 
  color, 
  scrollProgress,
  startX,
  startY,
  endX,
  endY,
  avatar
}: { 
  name: string; 
  color: string;
  scrollProgress: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  avatar?: string;
}) => {
  const progress = scrollProgress / 100;
  const x = startX + (endX - startX) * progress;
  const y = startY + (endY - startY) * Math.sin(progress * Math.PI);
  
  return (
    <div 
      className="absolute z-50 pointer-events-none transition-all duration-300 ease-out flex items-start gap-1"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        opacity: scrollProgress > 5 ? 1 : 0
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg flex-shrink-0">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.79a.5.5 0 0 0-.85.42Z" fill={color}/>
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.79a.5.5 0 0 0-.85.42Z" stroke="white" strokeWidth="1.5"/>
      </svg>
      <div 
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium whitespace-nowrap shadow-lg mt-2"
        style={{ backgroundColor: color }}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="w-4 h-4 rounded-full object-cover flex-shrink-0" />
        ) : null}
        <span>{name}</span>
      </div>
    </div>
  );
};

// Progress indicator for scroll
const ScrollProgress = ({ progress }: { progress: number }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 bg-card/90 backdrop-blur-md rounded-full border border-border shadow-lg">
    <span className="text-xs text-muted-foreground">Scroll to explore</span>
    <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary rounded-full transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
    <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
  </div>
);

// Canvas card wrapper with reveal animation
const CanvasCard = ({ 
  children, 
  className = "",
  scrollProgress,
  revealAt,
}: { 
  children: React.ReactNode; 
  className?: string;
  scrollProgress: number;
  revealAt: number;
}) => {
  const isVisible = scrollProgress >= revealAt;
  
  return (
    <div 
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 30}px) scale(${isVisible ? 1 : 0.95})`,
      }}
    >
      {children}
    </div>
  );
};

// Chat Message
const ChatBubble = ({ role, text, visible }: { role: "user" | "ai"; text: string; visible: boolean }) => {
  if (!visible) return null;
  
  return (
    <div className={`flex gap-2.5 ${role === "user" ? "flex-row-reverse" : ""} animate-fade-in`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
        role === "user" 
          ? "bg-muted" 
          : "bg-gradient-to-br from-primary to-orange-400"
      }`}>
        {role === "user" ? (
          <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
        ) : (
          <img src={aiAvatar} alt="AI Assistant" className="w-full h-full object-cover" />
        )}
      </div>
      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[240px] ${
        role === "user" 
          ? "bg-muted text-foreground rounded-tr-md" 
          : "bg-primary/10 text-foreground rounded-tl-md border border-primary/20"
      }`}>
        {text}
      </div>
    </div>
  );
};

// Section Divider
const SectionDivider = ({ title, scrollProgress, revealAt }: { title: string; scrollProgress: number; revealAt: number }) => {
  const isVisible = scrollProgress >= revealAt;
  
  return (
    <div 
      className="flex flex-col items-center justify-center w-[100px] flex-shrink-0 transition-all duration-500"
      style={{ opacity: isVisible ? 1 : 0.3 }}
    >
      <div className="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
    </div>
  );
};

export const FullScreenCanvas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -sectionTop;
      
      if (scrolled < 0) {
        setScrollProgress(0);
        content.style.transform = 'translateX(0)';
        return;
      }
      
      if (scrolled > scrollableDistance) {
        setScrollProgress(100);
        const maxTranslate = content.scrollWidth - (window.innerWidth - 320);
        content.style.transform = `translateX(-${maxTranslate}px)`;
        return;
      }
      
      const progress = (scrolled / scrollableDistance) * 100;
      setScrollProgress(progress);
      
      const maxTranslate = content.scrollWidth - (window.innerWidth - 320);
      const translateX = (scrolled / scrollableDistance) * maxTranslate;
      content.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-background overflow-visible"
      style={{ height: '220vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-16 w-full h-[calc(100vh-4rem)] overflow-visible clip-none">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Miro-like cursors */}
        <MiroCursor 
          name="Sarah" 
          color="#8B5CF6" 
          scrollProgress={scrollProgress}
          startX={35}
          startY={35}
          endX={65}
          endY={45}
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        />
        <MiroCursor 
          name="Mike" 
          color="#10B981" 
          scrollProgress={scrollProgress}
          startX={50}
          startY={55}
          endX={75}
          endY={30}
          avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        />
        <MiroCursor 
          name="Emma" 
          color="#F59E0B" 
          scrollProgress={scrollProgress}
          startX={55}
          startY={25}
          endX={45}
          endY={65}
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        />

        {/* Canvas toolbar - positioned at top */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-card/95 backdrop-blur-md border-b border-border flex items-center px-6 z-40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
              <img src={storychiefLogo} alt="StoryChief" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">StoryChief AI</h3>
              <p className="text-xs text-muted-foreground">Campaign Assistant</p>
            </div>
          </div>
          <div className="h-6 w-px bg-border mx-6" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="h-6 w-px bg-border mx-4" />
          <span className="font-medium text-foreground">Yearly Marketing Awards Campaign</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>3 collaborators</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Comments</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-600">Auto-saved</span>
            </div>
          </div>
        </div>

        {/* Section Progress Indicator */}
        <SectionProgress scrollProgress={scrollProgress} />

        {/* Main Layout - starts below toolbar */}
        <div className="relative w-full h-full pt-14 flex overflow-visible">
          
          {/* Conversation Sidebar */}
          <div className="w-[320px] h-full bg-card/95 backdrop-blur-md border-r border-border z-30 flex flex-col flex-shrink-0">
            {/* Messages */}
            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              <ChatBubble 
                role="user" 
                text="Create a launch campaign for our yearly marketing awards event. We need to rank in Google, be mentioned in ChatGPT. Create all the necessary assets." 
                visible={scrollProgress >= 3}
              />
              <ChatBubble 
                role="ai" 
                text="I'll create a comprehensive campaign with keyword research, blog content, social posts, and marketing assets." 
                visible={scrollProgress >= 8}
              />
              <ChatBubble 
                role="user" 
                text="Add a landing page and promo video too" 
                visible={scrollProgress >= 35}
              />
              <ChatBubble 
                role="ai" 
                text="Done! I've added a landing page mockup and video script. All assets are connected in your canvas." 
                visible={scrollProgress >= 45}
              />
              <ChatBubble 
                role="user" 
                text="Generate some promotional images" 
                visible={scrollProgress >= 55}
              />
              <ChatBubble 
                role="ai" 
                text="I've generated 4 promotional images optimized for different channels. Check them on your canvas!" 
                visible={scrollProgress >= 60}
              />
              <ChatBubble 
                role="user" 
                text="Schedule everything and export the code" 
                visible={scrollProgress >= 72}
              />
              <ChatBubble 
                role="ai" 
                text="Campaign scheduled! I've also prepared the export code for your landing page. Ready to publish!" 
                visible={scrollProgress >= 78}
              />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border">
                <input 
                  type="text" 
                  placeholder="Ask AI to create content..." 
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  disabled
                />
                <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 h-full flex flex-col overflow-hidden">
            {/* Horizontally scrolling canvas content */}
            <div className="flex-1 overflow-hidden">
              <div 
                ref={contentRef}
                className="h-full py-8 pr-8 pl-[200px] flex gap-6 transition-transform duration-100 ease-out"
                style={{ width: 'max-content', minWidth: '4200px' }}
              >
                
                {/* Empty spacer column - pushes content to the right */}
                <div className="w-[380px] flex-shrink-0" />

                {/* ==================== SECTION 1: Research & Brainstorm ==================== */}
                
                {/* Column 1a - Keyword Research */}
                <div className="flex flex-col gap-6 w-[380px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={5}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Search className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-foreground">Keyword Research</span>
                        <BarChart3 className="w-4 h-4 text-emerald-600 ml-auto" />
                      </div>
                      <div className="p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-muted-foreground border-b border-border">
                              <th className="text-left pb-3 font-medium">Keyword</th>
                              <th className="text-right pb-3 font-medium">Volume</th>
                              <th className="text-right pb-3 font-medium">Difficulty</th>
                            </tr>
                          </thead>
                          <tbody className="text-foreground">
                            {[
                              { kw: "marketing awards 2024", vol: "8.2K", diff: "Medium", color: "text-yellow-500" },
                              { kw: "best marketing campaigns", vol: "12.1K", diff: "High", color: "text-red-500" },
                              { kw: "content marketing awards", vol: "3.4K", diff: "Low", color: "text-green-500" },
                              { kw: "marketing excellence awards", vol: "1.9K", diff: "Low", color: "text-green-500" },
                              { kw: "digital marketing awards", vol: "6.7K", diff: "Medium", color: "text-yellow-500" },
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                                <td className="py-2.5">{row.kw}</td>
                                <td className="text-right text-muted-foreground">{row.vol}</td>
                                <td className={`text-right font-medium ${row.color}`}>{row.diff}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 1b - Longtail Opportunities (NEW) */}
                <div className="flex flex-col gap-6 w-[340px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={12}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-teal-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="font-medium text-foreground">Longtail Opportunities</span>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { kw: "how to submit for marketing awards", vol: "720", opportunity: "High" },
                          { kw: "best b2b marketing awards 2024", vol: "480", opportunity: "High" },
                          { kw: "marketing award categories explained", vol: "320", opportunity: "Medium" },
                          { kw: "winning marketing award tips", vol: "590", opportunity: "High" },
                          { kw: "free marketing award submissions", vol: "210", opportunity: "Low" },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                            <span className="text-sm text-foreground">{row.kw}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{row.vol}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                row.opportunity === "High" ? "bg-green-100 text-green-700" :
                                row.opportunity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                "bg-gray-100 text-gray-600"
                              }`}>{row.opportunity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 1c - Tasks (NEW) */}
                <div className="flex flex-col gap-6 w-[300px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={20}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-indigo-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                          <ListTodo className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-foreground">Tasks</span>
                        <span className="ml-auto text-xs text-muted-foreground">3/6</span>
                      </div>
                      <div className="p-4 space-y-2">
                        {[
                          { task: "Research competitors", done: true },
                          { task: "Define target keywords", done: true },
                          { task: "Create content brief", done: true },
                          { task: "Draft blog article", done: false },
                          { task: "Design landing page", done: false },
                          { task: "Schedule social posts", done: false },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              item.done ? "bg-green-500 border-green-500" : "border-muted-foreground/30"
                            }`}>
                              {item.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                              {item.task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Section Divider */}
                <SectionDivider title="Create" scrollProgress={scrollProgress} revealAt={30} />

                {/* ==================== SECTION 2: Create & Repurpose ==================== */}

                {/* Column 2a - Landing Page */}
                <div className="flex flex-col gap-6 w-[400px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={35}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-violet-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                          <Layout className="w-4 h-4 text-violet-500" />
                        </div>
                        <span className="font-medium text-foreground">Landing Page</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto cursor-pointer hover:text-foreground transition-colors" />
                      </div>
                      <div className="p-4">
                        <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-border">
                          <img src={landingPage} alt="Landing page" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 2b - Blog Article */}
                <div className="flex flex-col gap-6 w-[340px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={40}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">Blog Article</span>
                        <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Draft</span>
                      </div>
                      <div className="p-4">
                        <div className="w-full h-28 rounded-lg mb-3 overflow-hidden">
                          <img src={blogCover} alt="Blog cover" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1.5">
                          The Ultimate Guide to Winning Marketing Awards in 2024
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          Discover what it takes to stand out and win recognition at the industry's most prestigious marketing awards...
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            10 min read
                          </span>
                          <span>2,341 words</span>
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 2c - LinkedIn Post */}
                <div className="flex flex-col gap-6 w-[340px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={45}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-blue-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Share2 className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-medium text-foreground">LinkedIn Post</span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={storychiefLogo} alt="StoryChief" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">StoryChief</p>
                            <p className="text-xs text-muted-foreground">15,423 followers</p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          🏆 The Yearly Marketing Awards are here! Celebrate excellence in marketing with us.
                          <br /><br />
                          Nominate your best campaigns. Get recognized. Win big.
                        </p>
                        <div className="mt-4 pt-3 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                          <span>👍 24</span>
                          <span>💬 8</span>
                          <span>🔄 12</span>
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 2d - Video Script */}
                <div className="flex flex-col gap-6 w-[340px] flex-shrink-0 h-full">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={50} className="flex-1 flex">
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden flex flex-col flex-1">
                      <div className="flex items-center gap-2 px-4 py-3 bg-amber-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <PenTool className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="font-medium text-foreground">Video Script</span>
                      </div>
                      <div className="p-4 space-y-4 flex-1">
                        {[
                          { time: "00:00", text: "Hook: \"What makes a marketing campaign truly award-worthy?\"", type: "hook" },
                          { time: "00:08", text: "Introducing the Yearly Marketing Awards — celebrating excellence.", type: "intro" },
                          { time: "00:15", text: "[Demo: Award nominees showcase reel]", type: "visual" },
                          { time: "00:25", text: "Past winners share their strategies and success stories.", type: "content" },
                          { time: "00:35", text: "[B-roll: Creative team collaborating]", type: "visual" },
                          { time: "00:45", text: "Nominate. Compete. Win recognition from industry leaders.", type: "outro" },
                          { time: "00:55", text: "CTA: Submit your nomination today!", type: "cta" },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-xs font-mono text-primary font-medium w-12 flex-shrink-0">{item.time}</span>
                            <p className={`text-sm leading-relaxed ${item.type === "visual" ? "text-muted-foreground italic" : "text-foreground"}`}>
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 2e - Promo Video */}
                <div className="flex flex-col gap-6 w-[360px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={55}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-pink-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                          <Video className="w-4 h-4 text-pink-500" />
                        </div>
                        <span className="font-medium text-foreground">Promo Video</span>
                        <span className="ml-auto px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">Rendering</span>
                      </div>
                      <div className="p-4">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all hover:scale-105 border border-white/30">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white font-medium">0:45</span>
                            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">1080p</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 2f - Generated Images */}
                <div className="flex flex-col gap-6 w-[360px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={60}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-rose-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                          <Image className="w-4 h-4 text-rose-500" />
                        </div>
                        <span className="font-medium text-foreground">Generated Images</span>
                        <Zap className="w-4 h-4 text-rose-500 ml-auto" />
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { image: promoImage1, label: "Hero" },
                            { image: promoImage2, label: "Social" },
                            { image: promoImage3, label: "Blog" },
                            { image: promoImage4, label: "Ad" },
                          ].map((item, i) => (
                            <div key={i} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all group-hover:scale-[1.02] group-hover:shadow-lg">
                                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                              </div>
                              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-medium">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Section Divider */}
                <SectionDivider title="Export" scrollProgress={scrollProgress} revealAt={68} />

                {/* ==================== SECTION 3: Export & Publish ==================== */}

                {/* Column 3a - Schedule */}
                <div className="flex flex-col gap-6 w-[320px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={72}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-cyan-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="font-medium text-foreground">Schedule</span>
                      </div>
                      <div className="p-3 space-y-2">
                        {[
                          { label: "Blog Launch", time: "Mon, 9:00 AM", color: "bg-primary", status: "scheduled" },
                          { label: "LinkedIn Post", time: "Mon, 11:00 AM", color: "bg-blue-500", status: "scheduled" },
                          { label: "Newsletter Send", time: "Tue, 8:00 AM", color: "bg-green-500", status: "draft" },
                          { label: "Twitter Thread", time: "Tue, 2:00 PM", color: "bg-sky-500", status: "scheduled" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className={`w-2 h-8 rounded-full ${item.color}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                            {item.status === "scheduled" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 3b - Export Code (NEW) */}
                <div className="flex flex-col gap-6 w-[340px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={78}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                          <Code className="w-4 h-4 text-slate-600" />
                        </div>
                        <span className="font-medium text-foreground">Export Code</span>
                        <Download className="w-4 h-4 text-muted-foreground ml-auto cursor-pointer hover:text-foreground transition-colors" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-slate-900 rounded-lg p-3 overflow-hidden">
                          <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
{`<section class="hero">
  <h1>Marketing Awards</h1>
  <p>Celebrate excellence</p>
  <button>Nominate Now</button>
</section>`}
                          </pre>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 px-3 bg-muted/50 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
                            <Code className="w-4 h-4" />
                            HTML
                          </button>
                          <button className="flex-1 py-2 px-3 bg-muted/50 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                            React
                          </button>
                          <button className="flex-1 py-2 px-3 bg-muted/50 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                            Vue
                          </button>
                        </div>
                      </div>
                    </div>
                  </CanvasCard>
                </div>

                {/* Column 3c - Integrations (NEW) */}
                <div className="flex flex-col gap-6 w-[360px] flex-shrink-0">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={85}>
                    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-purple-500/5 border-b border-border">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-foreground">Publish To</span>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { name: "WordPress", icon: "W", color: "bg-blue-600" },
                            { name: "LinkedIn", icon: "in", color: "bg-blue-700" },
                            { name: "Instagram", icon: "📷", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
                            { name: "Facebook", icon: "f", color: "bg-blue-500" },
                            { name: "TikTok", icon: "♪", color: "bg-black" },
                            { name: "X", icon: "𝕏", color: "bg-black" },
                            { name: "Threads", icon: "@", color: "bg-black" },
                            { name: "Pinterest", icon: "P", color: "bg-red-600" },
                          ].map((platform, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                              <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform`}>
                                {platform.icon}
                              </div>
                              <span className="text-xs text-muted-foreground">{platform.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CanvasCard>

                  <CanvasCard scrollProgress={scrollProgress} revealAt={90} className="self-end">
                    <div className="flex items-center gap-3 px-5 py-3 bg-card/90 backdrop-blur-md rounded-full border border-primary/30 shadow-lg">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={storychiefLogo} alt="StoryChief AI" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-foreground">AI-Generated Campaign</span>
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                  </CanvasCard>
                </div>

                {/* Column - CTA Button */}
                <div className="flex flex-col gap-6 w-[280px] flex-shrink-0 justify-center">
                  <CanvasCard scrollProgress={scrollProgress} revealAt={92}>
                    <button className="w-full py-5 px-8 text-white rounded-xl font-semibold text-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3" style={{ backgroundImage: 'var(--gradient-hero)' }}>
                      <Calendar className="w-5 h-5" />
                      Schedule Campaign
                    </button>
                  </CanvasCard>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress */}
      {scrollProgress < 95 && <ScrollProgress progress={scrollProgress} />}
      
      {/* Gradient glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
        }}
      />
    </section>
  );
};
