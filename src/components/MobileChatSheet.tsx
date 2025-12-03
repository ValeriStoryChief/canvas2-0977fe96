import { useState } from "react";
import { MessageCircle, Send, ChevronUp, ChevronDown, X } from "lucide-react";
import userAvatar from "@/assets/user-avatar-new.jpg";
import aiAvatar from "@/assets/ai-avatar.jpg";

interface Message {
  role: "user" | "ai";
  text: string;
  revealAt: number;
}

interface MobileChatSheetProps {
  scrollProgress: number;
  messages: Message[];
}

export const MobileChatSheet = ({ scrollProgress, messages }: MobileChatSheetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleMessages = messages.filter((msg) => scrollProgress >= msg.revealAt);

  return (
    <>
      {/* Collapsed pill */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-card/95 backdrop-blur-md rounded-full border border-border shadow-xl animate-fade-in"
        >
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">AI Chat</span>
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
          {visibleMessages.length > 0 && (
            <span className="ml-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center">
              {visibleMessages.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded sheet */}
      {isExpanded && (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
          {/* Backdrop */}
          <div
            className="absolute inset-0 -top-screen bg-black/40 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />

          {/* Sheet content */}
          <div className="relative bg-card border-t border-border rounded-t-2xl max-h-[60vh] flex flex-col">
            {/* Handle */}
            <div className="flex items-center justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-orange-400">
                  <img src={aiAvatar} alt="AI" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Campaign helper</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {visibleMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 overflow-hidden ${
                      msg.role === "user"
                        ? "bg-muted"
                        : "bg-gradient-to-br from-primary to-orange-400"
                    }`}
                  >
                    <img
                      src={msg.role === "user" ? userAvatar : aiAvatar}
                      alt={msg.role === "user" ? "You" : "AI"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-muted text-foreground rounded-tr-md"
                        : "bg-primary/10 text-foreground rounded-tl-md border border-primary/20"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border">
                <input
                  type="text"
                  placeholder="Ask AI to create content..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  disabled
                />
                <button className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
