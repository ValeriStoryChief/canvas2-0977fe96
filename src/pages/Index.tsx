import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FullScreenCanvas } from "@/components/FullScreenCanvas";
import { LogosSection } from "@/components/LogosSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <FullScreenCanvas />
        <LogosSection />
        <FeaturesSection />
        <ShowcaseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
