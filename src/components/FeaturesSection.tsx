import { Search, Sparkles, Users, Send } from "lucide-react";

const features = [
  {
    icon: Search,
    label: "Plan",
    title: "Research & strategize with AI insights",
    description: "Discover trending topics, analyze competitors, and build data-driven content strategies in your visual workspace.",
    color: "bg-blue-500",
  },
  {
    icon: Sparkles,
    label: "Create",
    title: "Generate content that resonates",
    description: "Write blogs, social posts, and campaigns with AI assistance. Transform ideas into polished content in minutes.",
    color: "bg-primary",
  },
  {
    icon: Users,
    label: "Collaborate",
    title: "Work together in real-time",
    description: "Comment, review, and approve content as a team. Keep everyone aligned from ideation to publication.",
    color: "bg-purple-500",
  },
  {
    icon: Send,
    label: "Publish",
    title: "Distribute everywhere at once",
    description: "Push content to WordPress, social media, and 1000+ channels directly from your canvas.",
    color: "bg-green-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Plan. Create. Collaborate. Publish.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All in Canvas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Label */}
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {feature.label}
              </span>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
