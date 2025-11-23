import { Palette, Square, Type, Circle, Layers, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DesignSystem() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Design System</h1>
          <p className="text-muted-foreground">
            Consistent, beautiful components throughout the application
          </p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Palette
            </CardTitle>
            <CardDescription>Semantic color tokens ensure consistency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  Primary
                </div>
                <p className="text-xs text-muted-foreground">Brand accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                  Secondary
                </div>
                <p className="text-xs text-muted-foreground">UI surfaces</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium">
                  Accent
                </div>
                <p className="text-xs text-muted-foreground">Highlights</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-medium">
                  Muted
                </div>
                <p className="text-xs text-muted-foreground">Subtle backgrounds</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-success flex items-center justify-center text-success-foreground font-medium">
                  Success
                </div>
                <p className="text-xs text-muted-foreground">Positive states</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-warning flex items-center justify-center text-warning-foreground font-medium">
                  Warning
                </div>
                <p className="text-xs text-muted-foreground">Caution states</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
                  Destructive
                </div>
                <p className="text-xs text-muted-foreground">Error states</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-card border border-border flex items-center justify-center text-card-foreground font-medium">
                  Card
                </div>
                <p className="text-xs text-muted-foreground">Elevated surfaces</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Square className="w-5 h-5" />
              Buttons
            </CardTitle>
            <CardDescription>Multiple variants for different contexts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button className="bg-gradient-to-r from-primary to-accent">Gradient</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Circle className="w-5 h-5" />
              Badges
            </CardTitle>
            <CardDescription>Status indicators and tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-success text-success-foreground">Success</Badge>
              <Badge className="bg-warning text-warning-foreground">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography
            </CardTitle>
            <CardDescription>Clear hierarchy and readability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
            </div>
            <div>
              <p className="text-base">Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="text-sm text-muted-foreground">text-base</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Muted text - Secondary information and labels
              </p>
              <p className="text-sm text-muted-foreground">text-sm text-muted-foreground</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Form Elements
            </CardTitle>
            <CardDescription>Interactive input components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input</label>
              <Input placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slider</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="demo-switch" />
              <label htmlFor="demo-switch" className="text-sm">Toggle switch</label>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
