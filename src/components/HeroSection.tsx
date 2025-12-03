import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative pt-8 pb-8 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-up">
            <span className="text-sm font-semibold text-primary">StoryChief Canvas</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up animation-delay-100">
            Where your ideas{" "}
            <span className="text-gradient">become reality</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
            Plan, create, and collaborate on content campaigns in one visual canvas. 
            Powered by AI, designed for teams.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" asChild>
              <a href="https://www.storychief.io/#demo">Book a Demo</a>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-4 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            No credit card required · 3 min setup
          </p>
        </div>
      </div>

    </section>
  );
};