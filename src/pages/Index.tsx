import { HeroSection } from "@/components/HeroSection";
import { FullScreenCanvas } from "@/components/FullScreenCanvas";
import { useMobileCanvas } from "@/hooks/useMobileCanvas";

const Index = () => {
  const { isMobile, isTablet } = useMobileCanvas();

  // On mobile/tablet, show hero + canvas
  if (isMobile || isTablet) {
    return (
      <div className="min-h-screen bg-background">
        <HeroSection />
        <FullScreenCanvas />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <main>
        <HeroSection />
        <FullScreenCanvas />
      </main>
    </div>
  );
};

export default Index;