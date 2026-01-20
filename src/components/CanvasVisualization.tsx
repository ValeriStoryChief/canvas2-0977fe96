import { useState, useEffect } from "react";
import { 
  FileText, Sparkles, Calendar, Share2, MessageSquare, Image, 
  Search, Video, Layout, PenTool, Send, Bot, User, Play,
  BarChart3, Globe, ExternalLink, ChevronRight
} from "lucide-react";

interface CanvasNodeProps {
  delay: number;
  children: React.ReactNode;
  className?: string;
}

const CanvasNode = ({ delay, children, className = "" }: CanvasNodeProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'} ${className}`}
    >
      {children}
    </div>
  );
};

const TypeWriter = ({ text, delay, speed = 25 }: { text: string; delay: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
};

// Thinking Step with checkmark
const ThinkingStep = ({ 
  text, 
  delay,
  isComplete = true 
}: { 
  text: string; 
  delay: number;
  isComplete?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (visible && isComplete) {
      const timer = setTimeout(() => setCompleted(true), 500);
      return () => clearTimeout(timer);
    }
  }, [visible, isComplete]);

  if (!visible) return null;
  
  return (
    <div className="flex items-center gap-2 py-0.5 animate-fade-in">
      {completed ? (
        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin flex-shrink-0" />
      )}
      <span className={`text-[11px] ${completed ? 'text-foreground' : 'text-muted-foreground'}`}>
        {text}
      </span>
    </div>
  );
};

// Thinking Steps Group with collapsible header
const ThinkingStepsGroup = ({ 
  title,
  steps,
  startDelay,
  stepInterval = 400
}: { 
  title: string;
  steps: string[];
  startDelay: number;
  stepInterval?: number;
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  if (!visible) return null;

  return (
    <div className="animate-fade-in space-y-1">
      <div className="flex items-center gap-2 py-1">
        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-medium text-foreground">{title}</span>
      </div>
      <div className="border-l-2 border-green-500/20 pl-3 ml-2 space-y-0.5">
        {steps.map((step, i) => (
          <ThinkingStep
            key={i}
            text={step}
            delay={startDelay + (i + 1) * stepInterval}
            isComplete={true}
          />
        ))}
      </div>
    </div>
  );
};

// Chat message component
const ChatMessage = ({ role, text, delay }: { role: "user" | "assistant"; text: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className={`flex gap-2 ${role === "user" ? "flex-row-reverse" : ""}`}>
      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
        role === "user" ? "bg-primary/20" : "bg-gradient-to-br from-primary to-orange-400"
      }`}>
        {role === "user" ? <User className="w-3 h-3 text-primary" /> : <Bot className="w-3 h-3 text-white" />}
      </div>
      <div className={`px-3 py-2 rounded-md text-xs leading-relaxed max-w-[85%] ${
        role === "user" 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-foreground"
      }`}>
        {role === "assistant" ? <TypeWriter text={text} delay={delay + 200} speed={15} /> : text}
      </div>
    </div>
  );
};

export const CanvasVisualization = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="flex rounded-lg border border-border overflow-hidden bg-card/80 backdrop-blur-sm shadow-2xl">
        
        {/* Left Sidebar - Conversation */}
        <div className="w-[280px] border-r border-border bg-background/50 flex-shrink-0 hidden lg:flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">StoryChief AI</p>
                <p className="text-xs text-muted-foreground">Content Assistant</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            <ChatMessage 
              role="user" 
              text="Create a content campaign for our new Canvas feature launch" 
              delay={500} 
            />
            <ChatMessage 
              role="assistant" 
              text="No problem! Here's the plan:" 
              delay={1500} 
            />
            
            {/* Thinking Steps for Research */}
            <ThinkingStepsGroup
              title="Keyword Research"
              steps={[
                "Analyzing search volume...",
                "Finding low-competition keywords...",
                "Research complete!"
              ]}
              startDelay={2000}
              stepInterval={400}
            />

            {/* Thinking Steps for Content */}
            <ThinkingStepsGroup
              title="Content Creation"
              steps={[
                "Drafting blog article...",
                "Creating LinkedIn post...",
                "Content ready!"
              ]}
              startDelay={4000}
              stepInterval={400}
            />

            <ChatMessage 
              role="user" 
              text="Also add a landing page and promo video" 
              delay={6000} 
            />
            
            {/* Thinking Steps for Assets */}
            <ThinkingStepsGroup
              title="Asset Generation"
              steps={[
                "Designing landing page...",
                "Creating video script...",
                "Assets complete!"
              ]}
              startDelay={6500}
              stepInterval={400}
            />

            <ChatMessage 
              role="user" 
              text="Schedule everything for next week" 
              delay={8500} 
            />
            
            {/* Thinking Steps for Scheduling */}
            <ThinkingStepsGroup
              title="Scheduling"
              steps={[
                "Setting up timeline...",
                "Scheduling posts...",
                "Ready to publish!"
              ]}
              startDelay={9000}
              stepInterval={400}
            />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md border border-border">
              <input 
                type="text" 
                placeholder="Ask AI to create content..." 
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
                disabled
              />
              <button className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <Send className="w-3 h-3 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative min-h-[600px] overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-3 z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="h-5 w-px bg-border" />
            <span className="text-xs font-medium text-foreground">Canvas Feature Launch Campaign</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="px-2 py-1 bg-green-500/10 rounded text-xs text-green-600 font-medium">Auto-saving</div>
            </div>
          </div>

          {/* Canvas Grid Background */}
          <div className="absolute inset-0 pt-10" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* Canvas Content */}
          <div className="relative pt-14 px-4 pb-6 h-full">
            <div className="grid grid-cols-12 gap-4 h-full">
              
              {/* Row 1 */}
              {/* Keyword Research Table */}
              <CanvasNode delay={800} className="col-span-5">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border-b border-border">
                    <Search className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-medium text-foreground">Keyword Research</span>
                    <BarChart3 className="w-3 h-3 text-emerald-600 ml-auto" />
                  </div>
                  <div className="p-3">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-muted-foreground border-b border-border">
                          <th className="text-left pb-2 font-medium">Keyword</th>
                          <th className="text-right pb-2 font-medium">Volume</th>
                          <th className="text-right pb-2 font-medium">Diff.</th>
                        </tr>
                      </thead>
                      <tbody className="text-foreground">
                        {[
                          { kw: "content canvas tool", vol: "2.4K", diff: "Low" },
                          { kw: "ai content workspace", vol: "1.8K", diff: "Med" },
                          { kw: "content collaboration", vol: "5.1K", diff: "High" },
                          { kw: "visual content planning", vol: "890", diff: "Low" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-1.5">{row.kw}</td>
                            <td className="text-right text-muted-foreground">{row.vol}</td>
                            <td className={`text-right ${
                              row.diff === "Low" ? "text-green-500" : 
                              row.diff === "Med" ? "text-yellow-500" : "text-red-500"
                            }`}>{row.diff}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CanvasNode>

              {/* Blog Article */}
              <CanvasNode delay={1200} className="col-span-4">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border-b border-border">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-foreground">Blog Article</span>
                  </div>
                  <div className="p-3">
                    <div className="w-full h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded mb-2 flex items-center justify-center">
                      <Image className="w-4 h-4 text-primary/40" />
                    </div>
                    <h4 className="text-xs font-semibold text-foreground mb-1">
                      <TypeWriter text="How to 10x Your Content Output with Canvas" delay={1600} />
                    </h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">
                      A complete guide to using AI-powered visual workspaces...
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded">Draft</span>
                      <span className="text-[10px] text-muted-foreground">1,240 words</span>
                    </div>
                  </div>
                </div>
              </CanvasNode>

              {/* Social Post */}
              <CanvasNode delay={1600} className="col-span-3">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border-b border-border">
                    <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-medium text-foreground">LinkedIn</span>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-foreground leading-relaxed">
                      🚀 Big news! Introducing Canvas — your infinite workspace for content creation.
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-orange-400" />
                      <span className="text-[10px] text-muted-foreground">@storychief</span>
                    </div>
                  </div>
                </div>
              </CanvasNode>

              {/* Row 2 */}
              {/* Landing Page */}
              <CanvasNode delay={2000} className="col-span-5 row-span-2">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden h-full">
                  <div className="flex items-center gap-2 px-3 py-2 bg-violet-500/10 border-b border-border">
                    <Layout className="w-3.5 h-3.5 text-violet-500" />
                    <span className="text-xs font-medium text-foreground">Landing Page</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                  </div>
                  <div className="p-3 h-[calc(100%-36px)]">
                    <div className="w-full h-full bg-gradient-to-br from-background to-muted rounded border border-border overflow-hidden">
                      {/* Mini landing page preview */}
                      <div className="p-2 space-y-2">
                        <div className="h-2 w-20 bg-primary/20 rounded" />
                        <div className="flex gap-1">
                          <div className="h-1 w-8 bg-muted-foreground/20 rounded" />
                          <div className="h-1 w-8 bg-muted-foreground/20 rounded" />
                          <div className="h-1 w-8 bg-muted-foreground/20 rounded" />
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="h-3 w-3/4 bg-foreground/10 rounded" />
                          <div className="h-3 w-1/2 bg-foreground/10 rounded" />
                        </div>
                        <div className="h-2 w-16 bg-primary rounded mt-2" />
                        <div className="mt-3 h-16 bg-primary/10 rounded flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CanvasNode>

              {/* Generated Video */}
              <CanvasNode delay={2400} className="col-span-4">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-pink-500/10 border-b border-border">
                    <Video className="w-3.5 h-3.5 text-pink-500" />
                    <span className="text-xs font-medium text-foreground">Promo Video</span>
                  </div>
                  <div className="p-3">
                    <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMjBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-50" />
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/50 rounded text-[10px] text-white">
                        0:45
                      </div>
                    </div>
                  </div>
                </div>
              </CanvasNode>

              {/* Schedule */}
              <CanvasNode delay={2800} className="col-span-3">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border-b border-border">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-xs font-medium text-foreground">Schedule</span>
                  </div>
                  <div className="p-2 space-y-1.5">
                    {[
                      { label: "Blog Launch", time: "Mon 9AM", color: "bg-primary" },
                      { label: "LinkedIn", time: "Mon 11AM", color: "bg-blue-500" },
                      { label: "Email Blast", time: "Tue 8AM", color: "bg-green-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-muted/50 text-[10px]">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                        <span className="text-foreground flex-1">{item.label}</span>
                        <span className="text-muted-foreground">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CanvasNode>

              {/* Row 3 */}
              {/* Video Script */}
              <CanvasNode delay={3200} className="col-span-4">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border-b border-border">
                    <PenTool className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-medium text-foreground">Video Script</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-primary font-medium">00:00</span>
                      <p className="text-foreground">Hook: "What if you could create a week's worth of content in one session?"</p>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-primary font-medium">00:08</span>
                      <p className="text-foreground">Introducing StoryChief Canvas...</p>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-primary font-medium">00:20</span>
                      <p className="text-muted-foreground italic">Demo sequence...</p>
                    </div>
                  </div>
                </div>
              </CanvasNode>

              {/* Generated Images */}
              <CanvasNode delay={3600} className="col-span-3">
                <div className="bg-card rounded border border-border shadow-card overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-rose-500/10 border-b border-border">
                    <Image className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-xs font-medium text-foreground">Generated Images</span>
                  </div>
                  <div className="p-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "from-primary/30 to-orange-400/30",
                        "from-blue-400/30 to-purple-400/30",
                        "from-emerald-400/30 to-cyan-400/30",
                        "from-pink-400/30 to-rose-400/30",
                      ].map((gradient, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square rounded bg-gradient-to-br ${gradient} flex items-center justify-center`}
                        >
                          <Sparkles className="w-3 h-3 text-foreground/30" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CanvasNode>

            </div>
          </div>

          {/* AI Indicator */}
          <CanvasNode delay={4000} className="absolute bottom-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 backdrop-blur rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">AI Generated Campaign</span>
              <ChevronRight className="w-3 h-3 text-primary" />
            </div>
          </CanvasNode>

        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-3xl -z-10" />
    </div>
  );
};
