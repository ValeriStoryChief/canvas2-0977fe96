import { Button } from "@/components/ui/button";
import { FloatingCard } from "./FloatingCard";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <span className="text-sm font-semibold text-primary">StoryChief Canvas</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up animation-delay-100">
            Your infinite workspace for{" "}
            <span className="text-gradient">content creation</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
            Plan, create, and collaborate on content campaigns in one visual canvas. 
            Powered by AI, designed for teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl">
              Start for Free
            </Button>
            <Button variant="hero-outline" size="xl">
              Book a Demo
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-6 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            No credit card required · 3 min setup
          </p>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="relative z-10 mt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto h-[400px] md:h-[500px]">
            {/* Left Card - Blog Post */}
            <div className="absolute left-0 top-10 md:left-[5%] md:top-16 float-animation">
              <FloatingCard
                type="blog"
                title="Content Marketing Guide 2024"
                subtitle="How to build a content strategy that drives results"
                status="Draft"
              />
            </div>

            {/* Right Card - Social Media */}
            <div className="absolute right-0 top-20 md:right-[5%] md:top-8 float-animation-delayed">
              <FloatingCard
                type="social"
                title="LinkedIn Post"
                subtitle="🚀 Excited to announce our new feature..."
                platform="LinkedIn"
              />
            </div>

            {/* Center Bottom Card - Calendar */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:bottom-10 float-animation-slow">
              <FloatingCard
                type="calendar"
                title="Content Calendar"
                items={["Blog: SEO Tips", "Newsletter: Weekly", "Social: Product Launch"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
