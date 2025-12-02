import { FileText, Calendar, Share2, MoreVertical, Maximize2 } from "lucide-react";

interface FloatingCardProps {
  type: "blog" | "social" | "calendar";
  title: string;
  subtitle?: string;
  status?: string;
  platform?: string;
  items?: string[];
}

export const FloatingCard = ({ type, title, subtitle, status, platform, items }: FloatingCardProps) => {
  if (type === "blog") {
    return (
      <div className="w-[280px] sm:w-[320px] bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Blog Post</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted rounded">
              <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="p-1 hover:bg-muted rounded">
              <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/30 rounded-lg" />
          </div>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
          {status && (
            <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              {status}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "social") {
    return (
      <div className="w-[280px] sm:w-[320px] bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-foreground">{platform}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted rounded">
              <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="p-1 hover:bg-muted rounded">
              <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
            <div>
              <p className="text-xs font-medium text-foreground">@storychief</p>
              <p className="text-xs text-muted-foreground">Scheduled for tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="w-[300px] sm:w-[380px] bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
          <span className="text-xs text-muted-foreground">November 2024</span>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs text-muted-foreground text-center py-1">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                className={`text-xs text-center py-1.5 rounded ${
                  [5, 12, 19].includes(i)
                    ? "bg-primary text-primary-foreground font-medium"
                    : [8, 15, 22].includes(i)
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Items */}
          <div className="space-y-2">
            {items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
              >
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? "bg-primary" : index === 1 ? "bg-blue-500" : "bg-green-500"
                }`} />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
