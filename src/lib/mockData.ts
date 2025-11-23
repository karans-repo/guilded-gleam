export interface Building {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  name: string;
  icon: string;
}

export interface Room {
  id: string;
  floorId: string;
  name: string;
  type: "text" | "voice";
  unread?: number;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
}

export interface Draft {
  id: string;
  roomId: string;
  content: string;
  timestamp: Date;
}

export interface SystemStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down";
  latency?: number;
  uptime?: number;
}

export const mockBuildings: Building[] = [
  { id: "b1", name: "Holy Pixel HQ", icon: "🏢", color: "hsl(250 70% 60%)" },
  { id: "b2", name: "Design Team", icon: "🎨", color: "hsl(340 70% 60%)" },
  { id: "b3", name: "Dev Guild", icon: "💻", color: "hsl(142 70% 50%)" },
  { id: "b4", name: "Gaming Lounge", icon: "🎮", color: "hsl(38 92% 50%)" },
];

export const mockFloors: Floor[] = [
  { id: "f1", buildingId: "b1", name: "Main Floor", icon: "📋" },
  { id: "f2", buildingId: "b1", name: "Voice Channels", icon: "🎙️" },
  { id: "f3", buildingId: "b2", name: "Projects", icon: "🎯" },
  { id: "f4", buildingId: "b3", name: "Code Reviews", icon: "🔍" },
];

export const mockRooms: Room[] = [
  { id: "r1", floorId: "f1", name: "general", type: "text", unread: 3 },
  { id: "r2", floorId: "f1", name: "announcements", type: "text" },
  { id: "r3", floorId: "f1", name: "random", type: "text", unread: 12 },
  { id: "r4", floorId: "f2", name: "Lounge", type: "voice" },
  { id: "r5", floorId: "f2", name: "Meeting Room 1", type: "voice" },
  { id: "r6", floorId: "f3", name: "ui-feedback", type: "text" },
  { id: "r7", floorId: "f4", name: "pull-requests", type: "text", unread: 2 },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    roomId: "r1",
    userId: "u1",
    userName: "Alice",
    userAvatar: "🦊",
    content: "Hey everyone! Welcome to Holy Pixel Chat. This is way better than Discord!",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "m2",
    roomId: "r1",
    userId: "u2",
    userName: "Bob",
    userAvatar: "🐻",
    content: "Agreed! I love the Building → Floor → Room metaphor. So intuitive!",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "m3",
    roomId: "r1",
    userId: "u3",
    userName: "Charlie",
    userAvatar: "🦁",
    content: "The status indicators are super helpful. I can see connection quality at a glance.",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "m4",
    roomId: "r1",
    userId: "u1",
    userName: "Alice",
    userAvatar: "🦊",
    content: "Don't forget to check out the customization options! You can adjust everything.",
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "m5",
    roomId: "r1",
    userId: "u4",
    userName: "Diana",
    userAvatar: "🐼",
    content: "Command palette is 🔥! Press Ctrl+K to try it.",
    timestamp: new Date(Date.now() - 300000),
  },
];

export const mockDrafts: Draft[] = [
  {
    id: "d1",
    roomId: "r1",
    content: "Hey, I was thinking about the new feature...",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "d2",
    roomId: "r3",
    content: "Anyone want to grab coffee?",
    timestamp: new Date(Date.now() - 3600000),
  },
];

export const mockSystemStatus: SystemStatus[] = [
  { id: "s1", name: "API Gateway", status: "operational", latency: 45, uptime: 99.98 },
  { id: "s2", name: "Voice Server", status: "operational", latency: 32, uptime: 99.95 },
  { id: "s3", name: "Message Queue", status: "degraded", latency: 180, uptime: 98.5 },
  { id: "s4", name: "Database", status: "operational", latency: 12, uptime: 99.99 },
  { id: "s5", name: "File Storage", status: "operational", latency: 89, uptime: 99.92 },
];

export const mockErrors = [
  {
    id: "e1",
    title: "Failed to send message",
    description: "Network timeout after 30s",
    timestamp: new Date(Date.now() - 600000),
    severity: "high",
    resolved: false,
  },
  {
    id: "e2",
    title: "Voice connection dropped",
    description: "Peer connection closed unexpectedly",
    timestamp: new Date(Date.now() - 1200000),
    severity: "medium",
    resolved: true,
  },
  {
    id: "e3",
    title: "Failed to load user profile",
    description: "404 Not Found",
    timestamp: new Date(Date.now() - 300000),
    severity: "low",
    resolved: false,
  },
];
