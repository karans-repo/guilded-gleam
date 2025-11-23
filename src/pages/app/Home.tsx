import { useState, useEffect } from "react";
import { Send, Smile, Paperclip, Image, Mic, Video, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockMessages, Message } from "@/lib/mockData";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const currentRoomId = searchParams.get("room") || "r1";
  const [message, setMessage] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // Filter messages for the current room
  const currentMessages = messages.filter((msg) => msg.roomId === currentRoomId);

  const handleSend = () => {
    if (message.trim()) {
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
      setMessage("");
      setIsDraft(false);

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
    }
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    setIsDraft(value.length > 0);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {currentMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No messages yet. Start the conversation! 💬</p>
              </div>
            ) : (
              currentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex gap-3 hover:bg-muted/30 -mx-2 px-2 py-1 rounded-lg transition-colors group"
              >
                <Avatar className="w-10 h-10 mt-0.5">
                  <AvatarFallback className="bg-primary/20 text-primary text-lg">
                    {msg.userAvatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">{msg.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="max-w-4xl mx-auto">
            {isDraft && (
              <div className="mb-2 flex items-center gap-2 text-xs text-warning">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                Draft saved
              </div>
            )}
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Message #general"
                  value={message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="pr-32 min-h-[44px] resize-none bg-secondary border-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                className="h-[44px] px-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Members */}
      <div className="w-60 border-l border-border bg-card/50">
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-4">Members — 4</h3>
          <div className="space-y-2">
            {["Alice", "Bob", "Charlie", "Diana"].map((name, idx) => (
              <div
                key={name}
                className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-sm">
                      {["🦊", "🐻", "🦁", "🐼"][idx]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
                </div>
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Voice</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Lounge</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Connection</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Good
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Latency</span>
                <span className="font-medium">32ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Voice Quality</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  HD
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
