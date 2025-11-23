import { Layout, Maximize2, Minimize2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLayout } from "@/contexts/LayoutContext";

export default function LayoutModes() {
  const {
    focusMode,
    density,
    showMembers,
    showSidebar,
    setFocusMode,
    setDensity,
    setShowMembers,
    setShowSidebar,
    setMinimalMode,
    setFullMode,
  } = useLayout();

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Layout Modes</h1>
          <p className="text-muted-foreground">
            Flexible layouts for different use cases and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5" />
                Before: Cluttered Interface
              </CardTitle>
              <CardDescription>Traditional Discord can feel overwhelming</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 p-2 grid grid-cols-[60px_1fr_200px] gap-1 text-xs">
                  <div className="bg-destructive/20 rounded flex items-center justify-center">
                    Servers
                  </div>
                  <div className="grid grid-rows-[40px_1fr] gap-1">
                    <div className="bg-destructive/20 rounded flex items-center justify-center">
                      Top Bar
                    </div>
                    <div className="grid grid-cols-[180px_1fr] gap-1">
                      <div className="bg-destructive/20 rounded flex items-center justify-center">
                        Channels
                      </div>
                      <div className="bg-destructive/20 rounded flex items-center justify-center">
                        Content
                      </div>
                    </div>
                  </div>
                  <div className="bg-destructive/20 rounded flex items-center justify-center">
                    Members
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                  <div className="flex-1 h-6 bg-destructive/30 rounded" />
                  <div className="w-20 h-6 bg-destructive/30 rounded" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <EyeOff className="w-4 h-4" />
                  <span>Too many UI elements competing for attention</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <EyeOff className="w-4 h-4" />
                  <span>No way to hide sections when not needed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <EyeOff className="w-4 h-4" />
                  <span>Fixed layout with limited customization</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border border-success/50 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-success" />
                After: Clean & Flexible
              </CardTitle>
              <CardDescription>Holy Pixel's improved design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-success/30">
                <div className="absolute inset-0 p-2 grid grid-cols-[60px_1fr] gap-1 text-xs">
                  <div className="bg-success/20 rounded flex items-center justify-center">
                    Servers
                  </div>
                  <div className="grid grid-rows-[40px_1fr] gap-1">
                    <div className="bg-success/20 rounded flex items-center justify-center">
                      Clean Top Bar
                    </div>
                    <div className="bg-success/20 rounded flex items-center justify-center">
                      Focused Content
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-success">
                  <Eye className="w-4 h-4" />
                  <span>Collapsible sections for focus mode</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <Eye className="w-4 h-4" />
                  <span>Adjustable density for different needs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <Eye className="w-4 h-4" />
                  <span>User-controlled layout preferences</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Layout Controls</CardTitle>
            <CardDescription>Customize your viewing experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="focus-mode" className="text-base">
                    Focus Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Hide sidebars for distraction-free reading
                  </p>
                </div>
                <Switch
                  id="focus-mode"
                  checked={focusMode}
                  onCheckedChange={setFocusMode}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Message Density</Label>
                <RadioGroup value={density} onValueChange={setDensity}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact" className="cursor-pointer font-normal">
                      Compact - More messages visible
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="comfortable" />
                    <Label htmlFor="comfortable" className="cursor-pointer font-normal">
                      Comfortable - Balanced spacing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spacious" id="spacious" />
                    <Label htmlFor="spacious" className="cursor-pointer font-normal">
                      Spacious - Maximum readability
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Visible Sections</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-sidebar" className="font-normal">
                      Channel Sidebar
                    </Label>
                    <Switch
                      id="show-sidebar"
                      checked={showSidebar}
                      onCheckedChange={setShowSidebar}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-members" className="font-normal">
                      Members List
                    </Label>
                    <Switch
                      id="show-members"
                      checked={showMembers}
                      onCheckedChange={setShowMembers}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={setMinimalMode}
              >
                <Minimize2 className="w-4 h-4 mr-2" />
                Minimal Mode
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={setFullMode}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
