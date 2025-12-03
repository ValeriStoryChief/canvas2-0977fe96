import { MoreHorizontal, Users, Share2, MessageCircle } from "lucide-react";
import storychiefLogo from "@/assets/storychief-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MobileCanvasToolbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 bg-card/95 backdrop-blur-md border-b border-border flex items-center px-3 z-40">
      {/* Logo and name */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
          <img src={storychiefLogo} alt="StoryChief" className="w-full h-full object-cover" />
        </div>
        <span className="font-medium text-foreground text-sm truncate">AI Campaigns</span>
      </div>

      {/* Auto-saved indicator */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20 mr-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-medium text-green-600">Saved</span>
      </div>

      {/* Overflow menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center border border-border">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>3 collaborators</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>Comments</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-blue-600">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
