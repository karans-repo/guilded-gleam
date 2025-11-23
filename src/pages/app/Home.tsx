import { useState, useEffect, useRef } from "react";
import { Send, Smile, Paperclip, Image, Mic, Video, Phone, MoreVertical, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockMessages, Message } from "@/lib/mockData";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLayout } from "@/contexts/LayoutContext";

const botResponses = [
  "Thanks for sharing! 🎉",
  "That's a great point! 💡",
  "I totally agree with you!",
  "Interesting perspective! 🤔",
  "Love the energy in here! ⚡",
  "Keep up the great work! 💪",
  "That's really helpful, thanks!",
  "Noted! I'll look into that. 👀",
];

export default function Home() {
  const { showMembers, density, focusMode } = useLayout();
  const [searchParams] = useSearchParams();
  const currentRoomId = searchParams.get("room") || "r1";
  const [message, setMessage] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter messages for the current room
  const currentMessages = messages.filter((msg) => msg.roomId === currentRoomId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentRoomId]);

  const handleSend = async () => {
    if (!message.trim()) {
      setSendError("Message cannot be empty");
      return;
    }

    if (message.length > 2000) {
      setSendError("Message is too long (max 2000 characters)");
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add user message
      const newUserMessage: Message = {
        id: `m${Date.now()}`,
        roomId: currentRoomId,
        userId: "current-user",
        userName: "User",
        userAvatar: "👤",
        content: message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);
      const messageContent = message;
      setMessage("");
      setIsDraft(false);
      setIsSending(false);

      toast.success("Message sent", {
        icon: <CheckCircle2 className="w-4 h-4" />,
        duration: 2000,
      });

      // Add bot reply after 1-2 seconds
      setTimeout(() => {
        const botMessage: Message = {
          id: `m${Date.now()}-bot`,
          roomId: currentRoomId,
          userId: "bot",
          userName: "PixelBot",
          userAvatar: "🤖",
          content: botResponses[Math.floor(Math.random() * botResponses.length)],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      setIsSending(false);
      setSendError("Failed to send message. Please try again.");
      toast.error("Failed to send message", {
        description: "Please check your connection and try again.",
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    setIsDraft(value.length > 0);
    setSendError(null); // Clear error when user types
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className={cn(
            "max-w-4xl mx-auto",
            density === "compact" && "space-y-2",
            density === "comfortable" && "space-y-4",
            density === "spacious" && "space-y-6"
          )}>
            {currentMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-base font-medium mb-1">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              <>
                {currentMessages.map((msg) => {
                  const isCurrentUser = msg.userId === "current-user";
                  const isBot = msg.userId === "bot";
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-all duration-200 group focus-within:bg-muted/40",
                        density === "compact" && "gap-2 py-1",
                        density === "comfortable" && "gap-3 py-1.5",
                        density === "spacious" && "gap-4 py-2"
                      )}
                      role="article"
                      aria-label={`Message from ${msg.userName}`}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className={cn(
                            "mt-0.5 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all",
                            density === "compact" && "w-8 h-8",
                            density === "comfortable" && "w-10 h-10",
                            density === "spacious" && "w-12 h-12"
                          )}>
                            <AvatarFallback className={cn(
                              "text-lg",
                              isCurrentUser && "bg-primary/20 text-primary",
                              isBot && "bg-accent/20 text-accent",
                              !isCurrentUser && !isBot && "bg-secondary text-foreground"
                            )}>
                              {msg.userAvatar}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{msg.userName}</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm text-foreground">{msg.userName}</span>
                          {isBot && (
                            <Badge variant="outline" className="h-4 px-1.5 text-[10px] font-normal">
                              BOT
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground" aria-label={`Sent at ${new Date(msg.timestamp).toLocaleTimeString()}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed break-words">
                          {msg.content}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              aria-label={`More options for message from ${msg.userName}`}
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Message options</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} aria-live="polite" aria-atomic="true" />
              </>
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-border p-4 bg-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            {isDraft && (
              <div className="mb-2 flex items-center gap-2 text-xs text-warning animate-in fade-in slide-in-from-top-1">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" aria-hidden="true" />
                <span>Draft saved</span>
              </div>
            )}
            {sendError && (
              <div className="mb-2 flex items-center gap-2 text-xs text-destructive animate-in fade-in slide-in-from-top-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{sendError}</span>
              </div>
            )}
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  placeholder="Message #general"
                  value={message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isSending}
                  className={cn(
                    "pr-32 min-h-[44px] resize-none bg-secondary border-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    sendError && "border-destructive/50 focus-visible:ring-destructive/20"
                  )}
                  aria-label="Type a message"
                  aria-describedby={sendError ? "message-error" : undefined}
                  aria-invalid={!!sendError}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach file">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attach file</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Upload image">
                        <Image className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload image</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Add emoji">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add emoji</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {message.length > 0 && (
                  <div className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">
                    {message.length}/2000
                  </div>
                )}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="h-[44px] px-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Send message"
                  >
                    {isSending ? (
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" aria-label="Sending" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSending ? "Sending..." : "Send message"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
              <span>Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Shift+Enter</kbd> for new line</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Members */}
      {showMembers && !focusMode && (
        <div className="w-60 border-l border-border bg-card/50 flex flex-col transition-all duration-300 ease-in-out">
        <div className="p-4 flex-1 overflow-auto">
          <h3 className="text-sm font-semibold mb-4 text-foreground">Members — 4</h3>
          <div className="space-y-1.5">
            {["Alice", "Bob", "Charlie", "Diana"].map((name, idx) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${name}'s profile`}
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                        <AvatarFallback className="bg-primary/20 text-sm">
                          {["🦊", "🐻", "🦁", "🐼"][idx]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card animate-pulse" aria-label="Online" />
                    </div>
                    <span className="text-sm text-foreground truncate flex-1">{name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name} - Online</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Voice</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 hover:bg-success/15 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-success" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">Lounge</span>
                </div>
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Toggle video">
                        <Video className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle video</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Leave voice channel">
                        <Phone className="w-4 h-4 text-destructive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Leave voice channel</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Status</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2 rounded-md hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">Connection</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                  Good
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-md hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">Latency</span>
                <span className="font-medium text-foreground">32ms</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-md hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">Voice Quality</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                  HD
                </Badge>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
