import { useState, useEffect } from "react";
import { FileText, Sparkles, Calendar, Share2, MessageSquare, Image, Zap, Check } from "lucide-react";

interface CanvasNodeProps {
  delay: number;
  children: React.ReactNode;
  className?: string;
  connectionFrom?: "left" | "right" | "top";
}

const CanvasNode = ({ delay, children, className = "", connectionFrom }: CanvasNodeProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {connectionFrom && visible && (
        <div className={`absolute ${
          connectionFrom === 'left' ? '-left-8 top-1/2 w-8 h-0.5' :
          connectionFrom === 'right' ? '-right-8 top-1/2 w-8 h-0.5' :
          'left-1/2 -top-8 w-0.5 h-8'
        } bg-gradient-to-r from-primary/50 to-primary animate-pulse`} />
      )}
      {children}
    </div>
  );
};

const TypeWriter = ({ text, delay, className = "" }: { text: string; delay: number; className?: string }) => {
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
    }, 30);
    
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={className}>
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
};

export const CanvasVisualization = () => {
  const [showAiSpark, setShowAiSpark] = useState(false);
  const [showConnections, setShowConnections] = useState(false);

  useEffect(() => {
    const sparkTimer = setTimeout(() => setShowAiSpark(true), 2000);
    const connTimer = setTimeout(() => setShowConnections(true), 1500);
    return () => {
      clearTimeout(sparkTimer);
      clearTimeout(connTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[600px]">
      {/* Canvas Background */}
      <div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
        {/* Grid dots */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        {/* Canvas toolbar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-4 px-3 py-1 bg-background/50 rounded-md text-xs text-muted-foreground">
            Content Campaign — Q4 Launch
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">AI Active</span>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showConnections ? 'opacity-100' : 'opacity-0'}`}>
          {/* Main content to social */}
          <path
            d="M 320 250 Q 400 200 480 180"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          {/* Main content to blog */}
          <path
            d="M 320 250 Q 200 280 120 320"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          {/* Main content to calendar */}
          <path
            d="M 320 280 Q 350 350 380 400"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>

        {/* Central AI Content Generator */}
        <CanvasNode delay={200} className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-[320px] bg-card rounded-xl shadow-card border border-primary/30 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-b border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI Content Brief</span>
              {showAiSpark && <Zap className="w-3 h-3 text-primary animate-bounce ml-auto" />}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Campaign Theme</p>
                <p className="text-sm font-medium text-foreground">
                  <TypeWriter text="Product Launch — StoryChief Canvas" delay={500} />
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Target Audience</p>
                <p className="text-sm text-foreground">
                  <TypeWriter text="Marketing teams & content creators" delay={1200} />
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Key Message</p>
                <p className="text-sm text-foreground">
                  <TypeWriter text="Create content 10x faster with AI" delay={2000} />
                </p>
              </div>
            </div>
          </div>
        </CanvasNode>

        {/* Social Media Post - Top Right */}
        <CanvasNode delay={2800} className="absolute right-8 md:right-16 top-24 md:top-28">
          <div className="w-[240px] md:w-[280px] bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border-b border-border">
              <Share2 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-foreground">LinkedIn Post</span>
              <Check className="w-3 h-3 text-green-500 ml-auto" />
            </div>
            <div className="p-3">
              <p className="text-xs text-foreground leading-relaxed">
                <TypeWriter 
                  text="🚀 Big news! Introducing StoryChief Canvas — your new infinite workspace for content creation. Plan, create & publish all in one place." 
                  delay={3200} 
                />
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                <span className="text-xs text-muted-foreground">@storychief</span>
              </div>
            </div>
          </div>
        </CanvasNode>

        {/* Blog Post Card - Left */}
        <CanvasNode delay={3800} className="absolute left-4 md:left-12 bottom-32 md:bottom-36">
          <div className="w-[240px] md:w-[280px] bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Blog Article</span>
            </div>
            <div className="p-3">
              <div className="w-full h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-3 flex items-center justify-center">
                <Image className="w-6 h-6 text-primary/40" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                <TypeWriter text="How to 10x Your Content Output" delay={4200} />
              </h4>
              <p className="text-xs text-muted-foreground">
                <TypeWriter text="A complete guide to using AI for content creation..." delay={4800} />
              </p>
            </div>
          </div>
        </CanvasNode>

        {/* Calendar Card - Bottom Right */}
        <CanvasNode delay={4500} className="absolute right-8 md:right-20 bottom-16 md:bottom-20">
          <div className="w-[220px] md:w-[260px] bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Schedule</span>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: "LinkedIn Post", time: "Mon 9:00 AM", color: "bg-blue-500" },
                { label: "Blog Article", time: "Wed 10:00 AM", color: "bg-primary" },
                { label: "Newsletter", time: "Fri 8:00 AM", color: "bg-green-500" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 p-2 rounded-lg bg-muted/30 transition-all duration-300`}
                  style={{ 
                    opacity: 1,
                    transitionDelay: `${5000 + i * 300}ms`,
                    animation: `fade-up 0.3s ease-out ${5000 + i * 300}ms backwards`
                  }}
                >
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-foreground flex-1">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </CanvasNode>

        {/* Comment/Collaboration bubble */}
        <CanvasNode delay={5500} className="absolute left-1/2 bottom-8 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card border border-border">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-xs text-foreground">
              <TypeWriter text="Sarah added a comment: 'Love the headline! 🎉'" delay={5800} />
            </span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 -ml-1" />
          </div>
        </CanvasNode>

        {/* Floating AI suggestions */}
        {showAiSpark && (
          <div className="absolute top-20 left-8 md:left-16 animate-fade-up">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary font-medium">AI suggests: Add a CTA</span>
            </div>
          </div>
        )}
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl -z-10" />
    </div>
  );
};
