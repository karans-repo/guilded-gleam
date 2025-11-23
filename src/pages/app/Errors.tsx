import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockErrors } from "@/lib/mockData";
import { Separator } from "@/components/ui/separator";

const severityConfig = {
  high: { color: "destructive", icon: XCircle },
  medium: { color: "warning", icon: AlertTriangle },
  low: { color: "muted", icon: Info },
};

export default function Errors() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Error Center</h1>
          <p className="text-muted-foreground">
            Clear error messages and recovery assistance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockErrors.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {mockErrors.filter((e) => e.resolved).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((mockErrors.filter((e) => e.resolved).length / mockErrors.length) * 100)}% resolution rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {mockErrors.filter((e) => !e.resolved).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Errors</CardTitle>
            <CardDescription>Click on any error for detailed recovery steps</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {mockErrors.map((error) => {
                  const config = severityConfig[error.severity as keyof typeof severityConfig];
                  const SeverityIcon = config.icon;

                  return (
                    <div
                      key={error.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                        error.resolved
                          ? "border-success/30 bg-success/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <SeverityIcon
                            className={`w-5 h-5 ${
                              error.severity === "high"
                                ? "text-destructive"
                                : error.severity === "medium"
                                ? "text-warning"
                                : "text-muted-foreground"
                            }`}
                          />
                          <h4 className="font-medium">{error.title}</h4>
                        </div>
                        {error.resolved ? (
                          <Badge className="bg-success/10 text-success border-success/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className={
                              error.severity === "high"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : error.severity === "medium"
                                ? "bg-warning/10 text-warning border-warning/20"
                                : ""
                            }
                          >
                            {error.severity}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{error.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(error.timestamp).toLocaleString()}
                        </span>
                        {!error.resolved && (
                          <Button size="sm" variant="outline">
                            View Recovery Steps
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Recovery Assistant
            </CardTitle>
            <CardDescription>Example recovery flow for a failed message</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    1
                  </div>
                  <div className="w-0.5 h-full bg-border my-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="font-medium mb-1">Check Connection</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Verify your internet connection is stable
                  </p>
                  <Button size="sm" variant="outline">
                    Test Connection
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium text-sm">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-border my-2" />
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="font-medium mb-1">Retry Message</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your draft was saved. Try sending again
                  </p>
                  <Button size="sm" variant="outline" disabled>
                    Retry Send
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium text-sm">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Contact Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Still having issues? Our team can help
                  </p>
                  <Button size="sm" variant="outline" disabled>
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
