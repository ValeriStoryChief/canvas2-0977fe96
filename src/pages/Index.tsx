import { HeroSection } from "@/components/HeroSection";
import { FullScreenCanvas } from "@/components/FullScreenCanvas";
import { useMobileCanvas } from "@/hooks/useMobileCanvas";

const Index = () => {
  const { isMobile, isTablet } = useMobileCanvas();

  // On mobile/tablet, only show the canvas (which has its own toolbar)
  if (isMobile || isTablet) {
    return <FullScreenCanvas />;
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