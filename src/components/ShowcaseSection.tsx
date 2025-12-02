import { Check } from "lucide-react";

const showcaseItems = [
  {
    title: "AI-Powered Writing",
    description: "Generate blog posts, social content, and marketing copy with our advanced AI that understands your brand voice.",
    features: ["Brand voice consistency", "SEO optimization", "Multi-language support"],
    visual: "writing",
  },
  {
    title: "Visual Content Calendar",
    description: "Plan and schedule your entire content strategy in a beautiful drag-and-drop calendar view.",
    features: ["Drag-and-drop scheduling", "Team assignments", "Deadline tracking"],
    visual: "calendar",
  },
  {
    title: "Multi-Channel Publishing",
    description: "Publish to WordPress, Medium, LinkedIn, Twitter, and 1000+ platforms with a single click.",
    features: ["One-click publishing", "Platform optimization", "Analytics tracking"],
    visual: "publish",
  },
];

export const ShowcaseSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Content */}
              <div className="flex-1 max-w-xl">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {item.description}
                </p>
                <ul className="space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-xl">
                <ShowcaseVisual type={item.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseVisual = ({ type }: { type: string }) => {
  if (type === "writing") {
    return (
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-sm text-muted-foreground ml-2">AI Editor</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">✨</span>
            </div>
            <p className="text-sm text-foreground">Write a compelling intro about content marketing trends...</p>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/5" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
          <div className="mt-6 flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg">
              Continue Writing
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded-lg">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-sm font-medium text-foreground">November 2024</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80">‹</button>
            <button className="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80">›</button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-xs text-muted-foreground text-center py-2 font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 4;
              const hasEvent = [8, 15, 22, 11, 18].includes(i);
              const eventColor = i === 8 || i === 22 ? "bg-primary" : i === 15 ? "bg-blue-500" : "bg-green-500";
              return (
                <div
                  key={i}
                  className={`relative text-xs text-center py-2 rounded-lg ${
                    day > 0 && day <= 30 ? "text-foreground hover:bg-muted cursor-pointer" : "text-muted-foreground/30"
                  }`}
                >
                  {day > 0 && day <= 30 ? day : ""}
                  {hasEvent && day > 0 && day <= 30 && (
                    <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${eventColor}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (type === "publish") {
    return (
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-sm font-medium text-foreground">Publish to channels</span>
        </div>
        <div className="p-4 space-y-3">
          {[
            { name: "WordPress", icon: "W", color: "bg-blue-600", connected: true },
            { name: "LinkedIn", icon: "in", color: "bg-blue-700", connected: true },
            { name: "Twitter/X", icon: "𝕏", color: "bg-foreground", connected: true },
            { name: "Medium", icon: "M", color: "bg-foreground", connected: false },
          ].map((channel) => (
            <div key={channel.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${channel.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                  {channel.icon}
                </div>
                <span className="font-medium text-foreground">{channel.name}</span>
              </div>
              <div className={`w-4 h-4 rounded-full ${channel.connected ? "bg-green-500" : "bg-muted-foreground/30"}`} />
            </div>
          ))}
          <button className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Publish Now
          </button>
        </div>
      </div>
    );
  }

  return null;
};
