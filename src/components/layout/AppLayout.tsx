import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Activity,
  Settings,
  Palette,
  FileText,
  Zap,
  Layout,
  AlertTriangle,
  HelpCircle,
  Building2,
  Hash,
  Volume2,
  Search,
  Bell,
  Users,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockBuildings, mockFloors, mockRooms } from "@/lib/mockData";

const navigation = [
  { name: "Home", href: "/app/home", icon: Home },
  { name: "Status", href: "/app/status", icon: Activity },
  { name: "Customization", href: "/app/customization", icon: Settings },
  { name: "Design System", href: "/app/design-system", icon: Palette },
  { name: "Drafts & Permissions", href: "/app/drafts-permissions", icon: FileText },
  { name: "Power Tools", href: "/app/power-tools", icon: Zap },
  { name: "Layout Modes", href: "/app/layout-modes", icon: Layout },
  { name: "Errors", href: "/app/errors", icon: AlertTriangle },
  { name: "Help", href: "/app/help", icon: HelpCircle },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedFloors = mockFloors.filter((f) => f.buildingId === selectedBuilding);
  const selectedRooms = mockRooms.filter((r) =>
    selectedFloors.some((f) => f.id === r.floorId)
  );

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
        <div className="w-60 bg-card border-r border-border flex flex-col">
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
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <span>{floor.icon}</span>
                        <span>{floor.name}</span>
                      </div>
                      {floorRooms.map((room) => (
                        <Button
                          key={room.id}
                          variant="ghost"
                          className="w-full justify-start gap-2 text-sm hover:bg-sidebar-accent pl-6"
                        >
                          {room.type === "text" ? (
                            <Hash className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                          <span className="flex-1 text-left">{room.name}</span>
                          {room.unread && (
                            <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                              {room.unread}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>

          <div className="h-14 border-t border-border p-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">User</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success" />
                Online
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="h-12 border-b border-border flex items-center px-4 gap-4">
            <div className="flex-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>Holy Pixel HQ</span>
              <span>/</span>
              <span>Main Floor</span>
              <span>/</span>
              <Hash className="w-4 h-4" />
              <span className="text-foreground font-medium">general</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 bg-secondary border-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Users className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
