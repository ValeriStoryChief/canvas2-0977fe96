import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none"/>
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-foreground">StoryChief</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Customers
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button variant="outline" size="sm">Book a demo</Button>
            <Button variant="default" size="sm">Try for free</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Platform
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Customers
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Resources
              </a>
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" className="w-full">Log in</Button>
                <Button variant="default" className="w-full">Try for free</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
