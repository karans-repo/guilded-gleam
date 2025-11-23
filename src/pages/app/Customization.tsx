import { useState } from "react";
import { Palette, Type, Layout, Undo2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Customization() {
  const [viewMode, setViewMode] = useState("modern");
  const [sidebarWidth, setSidebarWidth] = useState([240]);
  const [fontSize, setFontSize] = useState("medium");
  const [messageDensity, setMessageDensity] = useState("comfortable");
  const [compactMode, setCompactMode] = useState(false);

  const handleReset = () => {
    setViewMode("modern");
    setSidebarWidth([240]);
    setFontSize("medium");
    setMessageDensity("comfortable");
    setCompactMode(false);
    toast.success("Settings reset to defaults");
  };

  const handleSave = () => {
    toast.success("Customization settings saved!");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customization</h1>
          <p className="text-muted-foreground">
            Personalize your experience with full control over the interface
          </p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              View Mode
            </CardTitle>
            <CardDescription>Choose between classic Discord-style or our modern redesign</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={viewMode} onValueChange={setViewMode} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="classic" id="classic" />
                <Label htmlFor="classic" className="flex-1 cursor-pointer">
                  <div className="font-medium">Classic Mode</div>
                  <div className="text-sm text-muted-foreground">Traditional Discord interface</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-primary bg-primary/5 cursor-pointer">
                <RadioGroupItem value="modern" id="modern" />
                <Label htmlFor="modern" className="flex-1 cursor-pointer">
                  <div className="font-medium">Modern Mode (Recommended)</div>
                  <div className="text-sm text-muted-foreground">Improved Holy Pixel design</div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Layout Settings
            </CardTitle>
            <CardDescription>Adjust spacing, density, and sidebar dimensions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Sidebar Width</Label>
                <span className="text-sm text-muted-foreground">{sidebarWidth[0]}px</span>
              </div>
              <Slider
                value={sidebarWidth}
                onValueChange={setSidebarWidth}
                min={180}
                max={320}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Message Density</Label>
              <RadioGroup value={messageDensity} onValueChange={setMessageDensity}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact" className="cursor-pointer">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="comfortable" />
                  <Label htmlFor="comfortable" className="cursor-pointer">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="spacious" />
                  <Label htmlFor="spacious" className="cursor-pointer">Spacious</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact-mode">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Hide extra UI elements</p>
              </div>
              <Switch
                id="compact-mode"
                checked={compactMode}
                onCheckedChange={setCompactMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography
            </CardTitle>
            <CardDescription>Customize text size for better readability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label>Font Size</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={fontSize === "small" ? "default" : "outline"}
                  onClick={() => setFontSize("small")}
                  className="h-auto py-4"
                >
                  <div className="text-center">
                    <div className="text-xs font-medium mb-1">Small</div>
                    <div className="text-[10px] text-muted-foreground">Aa</div>
                  </div>
                </Button>
                <Button
                  variant={fontSize === "medium" ? "default" : "outline"}
                  onClick={() => setFontSize("medium")}
                  className="h-auto py-4"
                >
                  <div className="text-center">
                    <div className="text-xs font-medium mb-1">Medium</div>
                    <div className="text-sm text-muted-foreground">Aa</div>
                  </div>
                </Button>
                <Button
                  variant={fontSize === "large" ? "default" : "outline"}
                  onClick={() => setFontSize("large")}
                  className="h-auto py-4"
                >
                  <div className="text-center">
                    <div className="text-xs font-medium mb-1">Large</div>
                    <div className="text-base text-muted-foreground">Aa</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            <Undo2 className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
