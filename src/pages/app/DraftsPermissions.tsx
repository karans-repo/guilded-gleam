import { FileText, Shield, AlertCircle, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockDrafts, mockRooms } from "@/lib/mockData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const roles = ["Admin", "Moderator", "Member", "Guest"];
const permissions = [
  "Send Messages",
  "Delete Messages",
  "Manage Channels",
  "Ban Members",
  "Kick Members",
  "Manage Roles",
];

export default function DraftsPermissions() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Drafts & Permissions</h1>
          <p className="text-muted-foreground">
            Error prevention through draft saving and clear permission controls
          </p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Unsent Drafts
            </CardTitle>
            <CardDescription>
              Never lose your work - all drafts are automatically saved
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockDrafts.length > 0 ? (
              <div className="space-y-3">
                {mockDrafts.map((draft) => {
                  const room = mockRooms.find((r) => r.id === draft.roomId);
                  return (
                    <div
                      key={draft.id}
                      className="p-4 rounded-lg bg-warning/5 border border-warning/20 hover:border-warning/40 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-warning" />
                          <span className="font-medium">#{room?.name || "unknown"}</span>
                          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                            Draft
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(draft.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{draft.content}</p>
                      <div className="flex gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Resume
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Resume draft?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will navigate to #{room?.name} and load your unsent message.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button size="sm" variant="ghost">
                          Discard
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No unsent drafts</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Permission Matrix
            </CardTitle>
            <CardDescription>
              Clear visibility into role capabilities prevents accidental actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-2 mb-2">
                  <div className="font-semibold text-sm">Permission</div>
                  {roles.map((role) => (
                    <div key={role} className="font-semibold text-sm text-center">
                      {role}
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {permissions.map((permission, idx) => {
                    const hasPermission = [
                      [true, true, true, false], // Send Messages
                      [true, true, false, false], // Delete Messages
                      [true, true, false, false], // Manage Channels
                      [true, false, false, false], // Ban Members
                      [true, true, false, false], // Kick Members
                      [true, false, false, false], // Manage Roles
                    ][idx];

                    return (
                      <div
                        key={permission}
                        className="grid grid-cols-[200px_repeat(4,1fr)] gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-sm flex items-center">{permission}</div>
                        {hasPermission.map((has, roleIdx) => (
                          <div key={roleIdx} className="flex items-center justify-center">
                            {has ? (
                              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                                <Check className="w-4 h-4 text-success" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                                <X className="w-4 h-4 text-destructive" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Error Prevention Features</CardTitle>
            <CardDescription>Systems in place to prevent mistakes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Auto-save Drafts</h4>
                  <p className="text-sm text-muted-foreground">
                    Messages are automatically saved as you type
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Confirmation Dialogs</h4>
                  <p className="text-sm text-muted-foreground">
                    Destructive actions require explicit confirmation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Permission Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Users can see their capabilities before attempting actions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
