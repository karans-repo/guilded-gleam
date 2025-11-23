import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Layers, Hash, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    icon: Building2,
    title: "Buildings",
    description: "Think of servers as buildings - large communities with multiple sections",
    color: "hsl(250 70% 60%)",
  },
  {
    icon: Layers,
    title: "Floors",
    description: "Floors organize your building into categories like work, social, voice",
    color: "hsl(262 70% 58%)",
  },
  {
    icon: Hash,
    title: "Rooms",
    description: "Rooms are where conversations happen - text channels or voice spaces",
    color: "hsl(142 70% 50%)",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/app/home");
    }
  };

  const handleSkip = () => {
    navigate("/app/home");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip tour
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-border shadow-elegant">
          <CardHeader className="text-center pb-4">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mx-auto mb-4"
              style={{ backgroundColor: `${step.color}20`, color: step.color }}
            >
              <step.icon className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl">{step.title}</CardTitle>
            <CardDescription className="text-base">{step.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-all ${
                    idx === currentStep
                      ? "border-primary bg-primary/5"
                      : idx < currentStep
                      ? "border-success/50 bg-success/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        idx < currentStep
                          ? "bg-success text-success-foreground"
                          : idx === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <s.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-medium">{s.title}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
