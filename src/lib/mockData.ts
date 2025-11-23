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
  // Holy Pixel HQ
  { id: "f1", buildingId: "b1", name: "Main Floor", icon: "📋" },
  { id: "f2", buildingId: "b1", name: "Voice Channels", icon: "🎙️" },
  // Design Team
  { id: "f3", buildingId: "b2", name: "Projects", icon: "🎯" },
  { id: "f4", buildingId: "b2", name: "Feedback", icon: "💬" },
  // Dev Guild
  { id: "f5", buildingId: "b3", name: "Code Reviews", icon: "🔍" },
  { id: "f6", buildingId: "b3", name: "Development", icon: "⚙️" },
  // Gaming Lounge
  { id: "f7", buildingId: "b4", name: "Game Chat", icon: "🎮" },
  { id: "f8", buildingId: "b4", name: "Voice Rooms", icon: "🔊" },
];

export const mockRooms: Room[] = [
  // Holy Pixel HQ - Main Floor
  { id: "r1", floorId: "f1", name: "general", type: "text", unread: 3 },
  { id: "r2", floorId: "f1", name: "announcements", type: "text" },
  { id: "r3", floorId: "f1", name: "random", type: "text", unread: 12 },
  // Holy Pixel HQ - Voice Channels
  { id: "r4", floorId: "f2", name: "Lounge", type: "voice" },
  { id: "r5", floorId: "f2", name: "Meeting Room 1", type: "voice" },
  // Design Team - Projects
  { id: "r6", floorId: "f3", name: "ui-feedback", type: "text" },
  { id: "r7", floorId: "f3", name: "design-ideas", type: "text", unread: 5 },
  // Design Team - Feedback
  { id: "r8", floorId: "f4", name: "client-reviews", type: "text" },
  // Dev Guild - Code Reviews
  { id: "r9", floorId: "f5", name: "pull-requests", type: "text", unread: 2 },
  { id: "r10", floorId: "f5", name: "bug-reports", type: "text", unread: 7 },
  // Dev Guild - Development
  { id: "r11", floorId: "f6", name: "backend", type: "text" },
  { id: "r12", floorId: "f6", name: "frontend", type: "text" },
  // Gaming Lounge - Game Chat
  { id: "r13", floorId: "f7", name: "lobby", type: "text", unread: 20 },
  { id: "r14", floorId: "f7", name: "tournaments", type: "text" },
  // Gaming Lounge - Voice Rooms
  { id: "r15", floorId: "f8", name: "Squad 1", type: "voice" },
  { id: "r16", floorId: "f8", name: "Squad 2", type: "voice" },
];

export const mockMessages: Message[] = [
  // Holy Pixel HQ - general
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
  // Design Team - ui-feedback
  {
    id: "m6",
    roomId: "r6",
    userId: "u5",
    userName: "Emma",
    userAvatar: "🎨",
    content: "I think we should add more rounded corners to the cards",
    timestamp: new Date(Date.now() - 2400000),
  },
  {
    id: "m7",
    roomId: "r6",
    userId: "u6",
    userName: "Frank",
    userAvatar: "🖌️",
    content: "Good idea! And maybe increase the shadow on hover?",
    timestamp: new Date(Date.now() - 1200000),
  },
  // Dev Guild - pull-requests
  {
    id: "m8",
    roomId: "r9",
    userId: "u7",
    userName: "Grace",
    userAvatar: "💻",
    content: "PR #234 is ready for review - added the new authentication flow",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "m9",
    roomId: "r9",
    userId: "u8",
    userName: "Henry",
    userAvatar: "🔧",
    content: "I'll take a look! Give me 10 mins",
    timestamp: new Date(Date.now() - 2700000),
  },
  // Gaming Lounge - lobby
  {
    id: "m10",
    roomId: "r13",
    userId: "u9",
    userName: "Ivan",
    userAvatar: "🎮",
    content: "Anyone up for a game?",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "m11",
    roomId: "r13",
    userId: "u10",
    userName: "Julia",
    userAvatar: "🕹️",
    content: "I'm in! What are we playing?",
    timestamp: new Date(Date.now() - 1500000),
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
