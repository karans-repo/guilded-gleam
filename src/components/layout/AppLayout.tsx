import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Activity,
  Settings,
  Building2,
  Hash,
  Volume2,
  Search,
  Bell,
  Users,
  MoreVertical,
  Wifi,
  WifiOff,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockBuildings, mockFloors, mockRooms } from "@/lib/mockData";
import { SettingsSheet } from "./SettingsSheet";
import { useLayout } from "@/contexts/LayoutContext";

const navigation = [
  { name: "Home", href: "/app/home", icon: Home },
  { name: "Status", href: "/app/status", icon: Activity },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSidebar, showMembers, focusMode } = useLayout();
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "connecting">("online");
  const [notifications, setNotifications] = useState(3);

  const selectedFloors = mockFloors.filter((f) => f.buildingId === selectedBuilding);
  const selectedRooms = mockRooms.filter((r) =>
    selectedFloors.some((f) => f.id === r.floorId)
  );

  // Simulate connection status monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional connection checks
      if (Math.random() > 0.95) {
        setConnectionStatus("connecting");
        setTimeout(() => setConnectionStatus("online"), 500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
        searchInput?.focus();
      }

      // Ctrl/Cmd + , for settings
      if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault();
        setSettingsOpen(true);
      }

      // Escape to close settings
      if (e.key === "Escape" && settingsOpen) {
        setSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [settingsOpen]);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        {/* Server Sidebar */}
        <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-3 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:rounded-xl transition-all duration-200"
            onClick={() => navigate("/app/home")}
          >
            <Building2 className="w-6 h-6" />
          </Button>

          <div className="w-10 h-[2px] bg-border rounded-full my-1" />

          <ScrollArea className="flex-1 w-full">
            <div className="flex flex-col items-center gap-2 px-3">
              {mockBuildings.map((building) => (
                <Tooltip key={building.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "w-14 h-14 rounded-2xl hover:rounded-xl transition-all duration-200 text-2xl",
                        selectedBuilding === building.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-primary/20"
                      )}
                      onClick={() => setSelectedBuilding(building.id)}
                    >
                      {building.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{building.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}

              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-2xl bg-secondary hover:bg-success/20 hover:rounded-xl transition-all duration-200 text-success border-2 border-dashed border-success/30"
              >
                +
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* Channel Sidebar */}
        {showSidebar && !focusMode && (
          <div className="w-60 bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out">
          <div className="h-12 border-b border-border flex items-center px-4">
            <h2 className="font-semibold text-sm truncate">
              {mockBuildings.find((b) => b.id === selectedBuilding)?.name}
            </h2>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-accent text-sidebar-primary"
                    )}
                    onClick={() => navigate(item.href)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </Button>
                );
              })}

              <div className="pt-4">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Channels
                </div>
                {selectedFloors.map((floor) => {
                  const floorRooms = selectedRooms.filter((r) => r.floorId === floor.id);
                  return (
                    <div key={floor.id} className="mt-2">
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                        <span aria-hidden="true">{floor.icon}</span>
                        <span>{floor.name}</span>
                      </div>
                      {floorRooms.map((room) => (
                        <Tooltip key={room.id}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm hover:bg-sidebar-accent pl-6 group relative"
                              aria-label={`${room.type === "text" ? "Text channel" : "Voice channel"}: ${room.name}`}
                            >
                              {room.type === "text" ? (
                                <Hash className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                              )}
                              <span className="flex-1 text-left truncate">{room.name}</span>
                              {room.unread && (
                                <Badge variant="destructive" className="h-5 px-1.5 text-xs min-w-[20px] flex items-center justify-center" aria-label={`${room.unread} unread messages`}>
                                  {room.unread > 99 ? "99+" : room.unread}
                                </Badge>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{room.name} - {room.type === "text" ? "Text channel" : "Voice channel"}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>

          <div className="h-14 border-t border-border p-2 flex items-center gap-2 bg-card/50">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" role="button" tabIndex={0} aria-label="User profile">
                  U
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>User Profile</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">User</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
                <span>Online</span>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSettingsOpen(true)}
                  aria-label="Open settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="h-12 border-b border-border flex items-center px-4 gap-4 bg-card/30 backdrop-blur-sm">
            <div className="flex-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span>Holy Pixel HQ</span>
              <span aria-hidden="true">/</span>
              <span>Main Floor</span>
              <span aria-hidden="true">/</span>
              <Hash className="w-4 h-4" aria-hidden="true" />
              <span className="text-foreground font-medium">general</span>
              {focusMode && (
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20 text-[10px]">
                  Focus Mode
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Connection Status Indicator */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
                    {connectionStatus === "online" ? (
                      <Wifi className="w-3.5 h-3.5 text-success" aria-label="Online" />
                    ) : connectionStatus === "connecting" ? (
                      <Loader2 className="w-3.5 h-3.5 text-warning animate-spin" aria-label="Connecting" />
                    ) : (
                      <WifiOff className="w-3.5 h-3.5 text-destructive" aria-label="Offline" />
                    )}
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {connectionStatus === "online" ? "Online" : connectionStatus === "connecting" ? "Connecting..." : "Offline"}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connection Status: {connectionStatus}</p>
                </TooltipContent>
              </Tooltip>

              <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 bg-secondary border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  aria-label="Search messages and channels"
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 relative" aria-label="Notifications">
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full border-2 border-card" aria-label={`${notifications} notifications`} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{notifications} new notifications</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View members">
                    <Users className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View members</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>

        {/* Settings Sheet */}
        <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </TooltipProvider>
  );
}
