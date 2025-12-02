import { useEffect, useRef, useState } from "react";
import { 
  FileText, Sparkles, Calendar, Share2, Image, 
  Search, Video, Layout, PenTool, Send, Bot, User, Play,
  BarChart3, Globe, ExternalLink, Clock, Users, Zap,
  ChevronRight, ArrowRight, CheckCircle2
} from "lucide-react";

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
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        role === "user" 
          ? "bg-muted" 
          : "bg-gradient-to-br from-primary to-orange-400"
      }`}>
        {role === "user" ? (
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white" />
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

export const FullScreenCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll hint
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const timer = setTimeout(() => {
      container.scrollTo({ left: 100, behavior: "smooth" });
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }, 600);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
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

      {/* Main Layout */}
      <div className="relative w-full h-full flex">
        
        {/* Conversation Sidebar - Fixed on left */}
        <div className="w-[320px] h-full bg-card/95 backdrop-blur-md border-r border-border z-30 flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">StoryChief AI</h3>
                <p className="text-xs text-muted-foreground">Campaign Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <ChatBubble 
              role="user" 
              text="Create a launch campaign for our Canvas feature" 
              visible={scrollProgress >= 0}
            />
            <ChatBubble 
              role="ai" 
              text="I'll create a comprehensive campaign with keyword research, blog content, social posts, and marketing assets." 
              visible={scrollProgress >= 5}
            />
            <ChatBubble 
              role="user" 
              text="Add a landing page and promo video too" 
              visible={scrollProgress >= 25}
            />
            <ChatBubble 
              role="ai" 
              text="Done! I've added a landing page mockup and video script. All assets are connected in your canvas." 
              visible={scrollProgress >= 35}
            />
            <ChatBubble 
              role="user" 
              text="Generate some promotional images" 
              visible={scrollProgress >= 55}
            />
            <ChatBubble 
              role="ai" 
              text="I've generated 4 promotional images optimized for different channels. Check them on your canvas!" 
              visible={scrollProgress >= 65}
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

        {/* Canvas Area - Scrollable */}
        <div className="flex-1 h-full flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="h-14 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-6 z-20 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="h-6 w-px bg-border mx-4" />
            <span className="font-medium text-foreground">Canvas Feature Launch Campaign</span>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>3 collaborators</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-600">Auto-saved</span>
              </div>
            </div>
          </div>

          {/* Scrollable Canvas Content */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
          >
            <div className="h-full p-8 flex gap-6" style={{ width: 'max-content', minWidth: '2400px' }}>
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6 w-[380px] flex-shrink-0">
                {/* KEYWORD RESEARCH */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={0}>
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
                            { kw: "content canvas tool", vol: "2.4K", diff: "Low", color: "text-green-500" },
                            { kw: "ai content workspace", vol: "1.8K", diff: "Medium", color: "text-yellow-500" },
                            { kw: "content collaboration", vol: "5.1K", diff: "High", color: "text-red-500" },
                            { kw: "visual content planning", vol: "890", diff: "Low", color: "text-green-500" },
                            { kw: "content marketing ai", vol: "3.2K", diff: "Medium", color: "text-yellow-500" },
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

                {/* LINKEDIN POST */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={15}>
                  <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-blue-500/5 border-b border-border">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="font-medium text-foreground">LinkedIn Post</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400" />
                        <div>
                          <p className="text-sm font-medium text-foreground">StoryChief</p>
                          <p className="text-xs text-muted-foreground">15,423 followers</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        🚀 Big news! Introducing Canvas — your infinite workspace for content creation.
                        <br /><br />
                        Plan campaigns visually. Create with AI. Publish everywhere.
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

              {/* Column 2 */}
              <div className="flex flex-col gap-6 w-[340px] flex-shrink-0">
                {/* BLOG ARTICLE */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={8}>
                  <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border-b border-border">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">Blog Article</span>
                      <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Draft</span>
                    </div>
                    <div className="p-4">
                      <div className="w-full h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-orange-400/10 rounded-lg mb-3 flex items-center justify-center">
                        <Image className="w-8 h-8 text-primary/40" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1.5">
                        How to 10x Your Content Output with Canvas
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        A complete guide to using AI-powered visual workspaces for content creation teams...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          8 min read
                        </span>
                        <span>1,847 words</span>
                      </div>
                    </div>
                  </div>
                </CanvasCard>

                {/* SCHEDULE */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={25}>
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
                        { label: "Email Campaign", time: "Tue, 8:00 AM", color: "bg-green-500", status: "draft" },
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

              {/* Column 3 */}
              <div className="flex flex-col gap-6 w-[400px] flex-shrink-0">
                {/* LANDING PAGE */}
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
                      <div className="w-full aspect-[16/10] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-border">
                        <div className="h-full flex flex-col">
                          <div className="h-6 bg-slate-800 border-b border-slate-700 flex items-center px-2 gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                          </div>
                          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-3 bg-primary/30 rounded mb-3" />
                            <div className="w-32 h-4 bg-white/20 rounded mb-2" />
                            <div className="w-24 h-3 bg-white/10 rounded mb-4" />
                            <div className="w-16 h-5 bg-primary rounded" />
                            <div className="mt-4 w-full h-16 bg-white/5 rounded flex items-center justify-center">
                              <Globe className="w-6 h-6 text-white/20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CanvasCard>

                {/* VIDEO */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={45}>
                  <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-pink-500/5 border-b border-border">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <Video className="w-4 h-4 text-pink-500" />
                      </div>
                      <span className="font-medium text-foreground">Promo Video</span>
                      <span className="ml-auto px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">Rendering</span>
                    </div>
                    <div className="p-4">
                      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                                            radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
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

              {/* Column 4 */}
              <div className="flex flex-col gap-6 w-[360px] flex-shrink-0">
                {/* VIDEO SCRIPT */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={55}>
                  <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-amber-500/5 border-b border-border">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <PenTool className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="font-medium text-foreground">Video Script</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {[
                        { time: "00:00", text: "Hook: \"What if you could create a week's worth of content in one session?\"", type: "hook" },
                        { time: "00:08", text: "Introducing StoryChief Canvas — your infinite workspace.", type: "intro" },
                        { time: "00:15", text: "[Demo: Canvas interface with AI generating content]", type: "visual" },
                        { time: "00:30", text: "Plan. Create. Collaborate. Publish. All in one place.", type: "outro" },
                        { time: "00:40", text: "CTA: Start free at storychief.io/canvas", type: "cta" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-xs font-mono text-primary font-medium w-10 flex-shrink-0">{item.time}</span>
                          <p className={`text-sm leading-relaxed ${item.type === "visual" ? "text-muted-foreground italic" : "text-foreground"}`}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CanvasCard>

                {/* GENERATED IMAGES */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={65}>
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
                          { gradient: "from-primary/40 via-orange-400/30 to-amber-400/40", label: "Hero" },
                          { gradient: "from-blue-400/40 via-indigo-400/30 to-purple-400/40", label: "Social" },
                          { gradient: "from-emerald-400/40 via-teal-400/30 to-cyan-400/40", label: "Blog" },
                          { gradient: "from-pink-400/40 via-rose-400/30 to-red-400/40", label: "Ad" },
                        ].map((item, i) => (
                          <div key={i} className="relative group">
                            <div 
                              className={`aspect-square rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center cursor-pointer transition-all group-hover:scale-[1.02] group-hover:shadow-lg`}
                            >
                              <Sparkles className="w-6 h-6 text-white/60" />
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

                {/* AI BADGE */}
                <CanvasCard scrollProgress={scrollProgress} revealAt={75} className="self-end">
                  <div className="flex items-center gap-3 px-5 py-3 bg-card/90 backdrop-blur-md rounded-full border border-primary/30 shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <span className="font-medium text-foreground">AI-Generated Campaign</span>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </CanvasCard>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress */}
      {scrollProgress < 95 && <ScrollProgress progress={scrollProgress} />}
      
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
