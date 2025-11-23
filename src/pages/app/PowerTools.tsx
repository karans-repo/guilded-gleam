import { useState } from "react";
import { Command, Zap, Keyboard, Search, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const shortcuts = [
  { keys: ["Ctrl", "K"], action: "Open command palette", category: "Navigation" },
  { keys: ["Ctrl", "N"], action: "New message", category: "Messages" },
  { keys: ["Ctrl", "F"], action: "Search messages", category: "Search" },
  { keys: ["Ctrl", "B"], action: "Toggle sidebar", category: "UI" },
  { keys: ["Ctrl", "Shift", "M"], action: "Mute/Unmute", category: "Voice" },
  { keys: ["Ctrl", "Shift", "D"], action: "Deafen/Undeafen", category: "Voice" },
  { keys: ["Alt", "↑"], action: "Previous channel", category: "Navigation" },
  { keys: ["Alt", "↓"], action: "Next channel", category: "Navigation" },
  { keys: ["Esc"], action: "Close modal/Clear search", category: "General" },
  { keys: ["Ctrl", "/"], action: "Show shortcuts", category: "Help" },
];

const workflows = [
  {
    id: "w1",
    name: "Quick Share",
    description: "Share screenshot with one click",
    steps: 3,
    uses: 45,
  },
  {
    id: "w2",
    name: "Meeting Setup",
    description: "Start voice channel and share link",
    steps: 2,
    uses: 28,
  },
  {
    id: "w3",
    name: "Status Update",
    description: "Post to #announcements with template",
    steps: 4,
    uses: 67,
  },
];

export default function PowerTools() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShortcuts = shortcuts.filter(
    (s) =>
      s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Power Tools</h1>
          <p className="text-muted-foreground">
            Advanced features for power users and efficiency experts
          </p>
        </div>

        <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Command className="w-5 h-5" />
              Command Palette
            </CardTitle>
            <CardDescription>Quick access to any action or navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full justify-between bg-background hover:bg-muted text-left font-normal"
                >
                  <span className="text-muted-foreground">Search commands...</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="font-mono text-xs">
                      Ctrl
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-xs">
                      K
                    </Badge>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Command Palette</DialogTitle>
                  <DialogDescription>Type to search for actions and navigation</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1 max-h-[400px] overflow-auto">
                    {["Go to Home", "Go to Status", "Toggle Dark Mode", "Open Settings", "New Message", "Search Messages", "Join Voice", "Leave Voice"].map((cmd, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
                      >
                        <span>{cmd}</span>
                        <kbd className="text-xs text-muted-foreground">↵</kbd>
                      </button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm text-muted-foreground mt-4">
              Press <Badge variant="secondary" className="font-mono text-xs mx-1">Ctrl</Badge> +{" "}
              <Badge variant="secondary" className="font-mono text-xs mx-1">K</Badge> anywhere to open
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </CardTitle>
            <CardDescription>Master shortcuts to work faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search shortcuts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="space-y-4">
              {["Navigation", "Messages", "Voice", "UI", "Search", "General", "Help"]
                .map((category) => {
                  const categoryShortcuts = filteredShortcuts.filter(
                    (s) => s.category === category
                  );
                  if (categoryShortcuts.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {categoryShortcuts.map((shortcut, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <span className="text-sm">{shortcut.action}</span>
                            <div className="flex gap-1">
                              {shortcut.keys.map((key) => (
                                <Badge
                                  key={key}
                                  variant="secondary"
                                  className="font-mono text-xs"
                                >
                                  {key}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              Custom Workflows
            </CardTitle>
            <CardDescription>Automate repetitive tasks with one click</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        {workflow.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {workflow.description}
                      </p>
                    </div>
                    <Button size="sm">Run</Button>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                    <span>{workflow.steps} steps</span>
                    <span>•</span>
                    <span>Used {workflow.uses} times</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                + Create New Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
