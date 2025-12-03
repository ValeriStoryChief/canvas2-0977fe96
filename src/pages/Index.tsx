import { HeroSection } from "@/components/HeroSection";
import { FullScreenCanvas } from "@/components/FullScreenCanvas";

const Index = () => {
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