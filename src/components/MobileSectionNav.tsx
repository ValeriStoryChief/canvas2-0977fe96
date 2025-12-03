import { CheckCircle2 } from "lucide-react";

interface MobileSectionNavProps {
  scrollProgress: number;
}

export const MobileSectionNav = ({ scrollProgress }: MobileSectionNavProps) => {
  const sections = [
    { id: 1, name: "Research", range: [0, 33] },
    { id: 2, name: "Create", range: [33, 70] },
    { id: 3, name: "Publish", range: [70, 100] },
  ];

  const getCurrentSection = () => {
    if (scrollProgress < 33) return 0;
    if (scrollProgress < 70) return 1;
    return 2;
  };

  const currentSection = getCurrentSection();

  return (
    <div className="absolute top-12 left-0 right-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-center gap-2 py-2 px-3 overflow-x-auto scrollbar-hide">
        {sections.map((section, i) => {
          const isActive = i === currentSection;
          const isPast = i < currentSection;

          return (
            <div
              key={section.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isPast
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isPast ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                  {section.id}
                </span>
              )}
              <span>{section.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
