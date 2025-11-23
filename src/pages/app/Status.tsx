import { Activity, Zap, Database, HardDrive, Cloud, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockSystemStatus } from "@/lib/mockData";

const icons = {
  "API Gateway": Zap,
  "Voice Server": Activity,
  "Message Queue": Cloud,
  Database: Database,
  "File Storage": HardDrive,
};

export default function Status() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Status</h1>
          <p className="text-muted-foreground">
            Real-time visibility into platform health and performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockSystemStatus.map((status) => {
            const Icon = icons[status.name as keyof typeof icons] || Activity;
            const statusColor =
              status.status === "operational"
                ? "success"
                : status.status === "degraded"
                ? "warning"
                : "destructive";

            return (
              <Card key={status.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{status.name}</CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        statusColor === "success"
                          ? "bg-success/10 text-success border-success/20"
                          : statusColor === "warning"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {status.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {status.latency && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Latency</span>
                        <span className="font-medium">{status.latency}ms</span>
                      </div>
                      <Progress
                        value={Math.max(0, 100 - status.latency / 2)}
                        className="h-2"
                      />
                    </div>
                  )}
                  {status.uptime && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="font-medium">{status.uptime}%</span>
                      </div>
                      <Progress value={status.uptime} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Activity Overview
            </CardTitle>
            <CardDescription>Last 24 hours of platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm text-muted-foreground">Messages Sent</p>
                  <p className="text-2xl font-bold">14,302</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    +12.5%
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm text-muted-foreground">Voice Minutes</p>
                  <p className="text-2xl font-bold">3,847</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    +8.3%
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">892</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    -2.1%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure your status alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-alerts" className="cursor-pointer">
                Sound alerts for outages
              </Label>
              <Switch id="sound-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="degraded-alerts" className="cursor-pointer">
                Notify on degraded performance
              </Label>
              <Switch id="degraded-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="recovery-alerts" className="cursor-pointer">
                Notify when systems recover
              </Label>
              <Switch id="recovery-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
