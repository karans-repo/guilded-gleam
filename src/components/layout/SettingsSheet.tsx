import { useState } from "react";
import { X, Palette, Layout, FileText, Zap, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Customization from "@/pages/app/Customization";
import DesignSystem from "@/pages/app/DesignSystem";
import DraftsPermissions from "@/pages/app/DraftsPermissions";
import PowerTools from "@/pages/app/PowerTools";
import LayoutModes from "@/pages/app/LayoutModes";
import Errors from "@/pages/app/Errors";
import Help from "@/pages/app/Help";

const settingsSections = [
  { id: "appearance", name: "Appearance & Customization", icon: Palette, component: Customization },
  { id: "design-system", name: "Design System", icon: Layout, component: DesignSystem },
  { id: "drafts", name: "Drafts & Permissions", icon: FileText, component: DraftsPermissions },
  { id: "power-tools", name: "Power Tools", icon: Zap, component: PowerTools },
  { id: "layout-modes", name: "Layout Modes", icon: Layout, component: LayoutModes },
  { id: "errors", name: "Error Center", icon: AlertTriangle, component: Errors },
  { id: "help", name: "Help Center", icon: HelpCircle, component: Help },
];

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const [activeSection, setActiveSection] = useState("appearance");

  const ActiveComponent = settingsSections.find((s) => s.id === activeSection)?.component || Customization;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0">
        <div className="flex h-full">
          {/* Settings Navigation */}
          <div className="w-60 border-r border-border bg-card/50">
            <SheetHeader className="px-4 py-3 border-b border-border">
              <SheetTitle className="text-sm">Settings</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-2 space-y-1">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 hover:bg-sidebar-accent",
                        activeSection === section.id && "bg-sidebar-accent text-sidebar-primary"
                      )}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{section.name}</span>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Settings Content */}
          <div className="flex-1 flex flex-col">
            <div className="h-12 border-b border-border flex items-center justify-between px-4">
              <h2 className="font-semibold text-sm">
                {settingsSections.find((s) => s.id === activeSection)?.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6">
                <ActiveComponent />
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
