import { createContext, useContext, useState, type ReactNode } from "react";
import type { Profile } from "./AppState";

const EMPTY_DRAFT: Profile = {
  displayName: "",
  birthdate: "",
  city: "",
  photoUri: null,
  favoriteArtists: [],
  genres: [],
  instagram: "",
  crewPreference: null,
};

interface DraftContextValue {
  draft: Profile;
  setField: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function OnboardingDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Profile>(EMPTY_DRAFT);

  const setField: DraftContextValue["setField"] = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  return <DraftContext.Provider value={{ draft, setField }}>{children}</DraftContext.Provider>;
}

export function useOnboardingDraft() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useOnboardingDraft must be used within OnboardingDraftProvider");
  return ctx;
}
