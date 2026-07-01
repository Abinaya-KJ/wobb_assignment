import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserProfileSummary } from "@/types";

interface SavedListContextType {
  savedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  isProfileSaved: (userId: string) => boolean;
}

const SavedListContext = createContext<SavedListContextType | undefined>(undefined);

export function SavedListProvider({ children }: { children: React.ReactNode }) {
  const [savedProfiles, setSavedProfiles] = useState<UserProfileSummary[]>(() => {
    const saved = localStorage.getItem("saved_influencers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("saved_influencers", JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  const addProfile = (profile: UserProfileSummary) => {
    setSavedProfiles((prev) => {
      if (prev.some((p) => p.user_id === profile.user_id)) {
        return prev;
      }
      return [...prev, profile];
    });
  };

  const removeProfile = (userId: string) => {
    setSavedProfiles((prev) => prev.filter((p) => p.user_id !== userId));
  };

  const isProfileSaved = (userId: string) => {
    return savedProfiles.some((p) => p.user_id === userId);
  };

  return (
    <SavedListContext.Provider
      value={{ savedProfiles, addProfile, removeProfile, isProfileSaved }}
    >
      {children}
    </SavedListContext.Provider>
  );
}

export function useSavedList() {
  const context = useContext(SavedListContext);
  if (!context) {
    throw new Error("useSavedList must be used within a SavedListProvider");
  }
  return context;
}
