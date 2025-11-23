import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import { AppLayout } from "./components/layout/AppLayout";
import Home from "./pages/app/Home";
import Status from "./pages/app/Status";
import Customization from "./pages/app/Customization";
import DesignSystem from "./pages/app/DesignSystem";
import DraftsPermissions from "./pages/app/DraftsPermissions";
import PowerTools from "./pages/app/PowerTools";
import LayoutModes from "./pages/app/LayoutModes";
import Errors from "./pages/app/Errors";
import Help from "./pages/app/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="status" element={<Status />} />
            <Route path="customization" element={<Customization />} />
            <Route path="design-system" element={<DesignSystem />} />
            <Route path="drafts-permissions" element={<DraftsPermissions />} />
            <Route path="power-tools" element={<PowerTools />} />
            <Route path="layout-modes" element={<LayoutModes />} />
            <Route path="errors" element={<Errors />} />
            <Route path="help" element={<Help />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
