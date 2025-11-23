import { useState } from "react";
import { HelpCircle, Search, Book, Video, MessageCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How do I navigate between Buildings, Floors, and Rooms?",
    answer:
      "Use the server sidebar on the left to switch Buildings. Within each Building, Floors are organized as collapsible groups in the channel list. Click on any Room (channel) to enter it. You can also use Alt+↑/↓ keyboard shortcuts to navigate quickly.",
  },
  {
    question: "Where are my unsent message drafts saved?",
    answer:
      "All drafts are automatically saved as you type. You can find them in the Drafts & Permissions page. Drafts are preserved even if you close the app or switch channels, so you never lose your work.",
  },
  {
    question: "How do I use the Command Palette?",
    answer:
      "Press Ctrl+K (or Cmd+K on Mac) anywhere in the app to open the Command Palette. Type to search for any action, channel, or setting. It's the fastest way to navigate and perform actions without using your mouse.",
  },
  {
    question: "Can I customize the layout?",
    answer:
      "Yes! Go to Customization or Layout Modes pages to adjust sidebar width, message density, font size, and enable Focus Mode. You have full control over the interface to match your preferences.",
  },
  {
    question: "What are the system status indicators?",
    answer:
      "Status indicators show real-time connection quality, voice quality, and system health. Find them in the Status page or in the sidebar. Green means optimal, yellow means degraded, and red indicates issues requiring attention.",
  },
];

const tutorials = [
  { id: 1, title: "Getting Started Tour", duration: "3 min", completed: true },
  { id: 2, title: "Understanding Buildings & Floors", duration: "5 min", completed: true },
  { id: 3, title: "Using Keyboard Shortcuts", duration: "4 min", completed: false },
  { id: 4, title: "Customizing Your Experience", duration: "6 min", completed: false },
  { id: 5, title: "Voice Channel Features", duration: "5 min", completed: false },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">
            Everything you need to master Holy Pixel Chat
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive guides and references
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">
                Learn visually with step-by-step videos
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support Chat</h3>
              <p className="text-sm text-muted-foreground">
                Get help from our community
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No results found</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Interactive Tutorials</CardTitle>
            <CardDescription>Learn by doing with guided walkthroughs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {tutorial.completed ? (
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                        {tutorial.id}
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium">{tutorial.title}</h4>
                      <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tutorial.completed && (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                    )}
                    <Button size="sm" variant={tutorial.completed ? "outline" : "default"}>
                      {tutorial.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you
              </p>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
