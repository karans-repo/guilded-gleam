import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LayoutContextType {
  showSidebar: boolean;
  showMembers: boolean;
  focusMode: boolean;
  density: "compact" | "comfortable" | "spacious";
  setShowSidebar: (show: boolean) => void;
  setShowMembers: (show: boolean) => void;
  setFocusMode: (focus: boolean) => void;
  setDensity: (density: "compact" | "comfortable" | "spacious") => void;
  setMinimalMode: () => void;
  setFullMode: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [density, setDensity] = useState<"compact" | "comfortable" | "spacious">("comfortable");

  const setMinimalMode = () => {
    setFocusMode(true);
    setShowMembers(false);
    setShowSidebar(false);
  };

  const setFullMode = () => {
    setFocusMode(false);
    setShowMembers(true);
    setShowSidebar(true);
    setDensity("comfortable");
  };

  // When focus mode is toggled, automatically sync sidebar visibility
  useEffect(() => {
    if (focusMode) {
      setShowMembers(false);
      setShowSidebar(false);
    }
  }, [focusMode]);

  return (
    <LayoutContext.Provider
      value={{
        showSidebar,
        showMembers,
        focusMode,
        density,
        setShowSidebar,
        setShowMembers,
        setFocusMode,
        setDensity,
        setMinimalMode,
        setFullMode,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

