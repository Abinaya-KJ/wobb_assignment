import React from "react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
};

const PLATFORM_GLOW: Record<Platform, string> = {
  instagram: "rgba(225, 48, 108, 0.35)",
  youtube: "rgba(255, 0, 0, 0.35)",
  tiktok: "rgba(0, 242, 234, 0.35)",
};

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon fill="#0F172A" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5a2.89 2.89 0 0 1-2.89-2.89a2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05a6.34 6.34 0 0 0-6.34 6.34a6.34 6.34 0 0 0 6.34 6.34a6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.84 4.84 0 0 1-1.01-.09z"/>
    </svg>
  );
}

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
  tiktok: <TikTokIcon />,
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      {/* Platform Tabs */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {PLATFORMS.map((p) => {
          const isActive = selected === p;
          const color = PLATFORM_COLORS[p];
          const glow = PLATFORM_GLOW[p];
          return (
            <button
              key={p}
              id={`platform-tab-${p}`}
              type="button"
              onClick={() => onChange(p)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 relative"
              style={{
                background: isActive ? "rgba(30, 41, 59, 0.9)" : "rgba(30, 41, 59, 0.4)",
                border: `1px solid ${isActive ? color : "rgba(148,163,184,0.12)"}`,
                color: isActive ? color : "#94A3B8",
                boxShadow: isActive ? `0 0 16px ${glow}, 0 0 0 1px ${color}22` : "none",
                borderBottom: isActive ? `2px solid ${color}` : `1px solid rgba(148,163,184,0.12)`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(30, 41, 59, 0.7)";
                  el.style.color = color;
                  el.style.border = `1px solid ${color}44`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(30, 41, 59, 0.4)";
                  el.style.color = "#94A3B8";
                  el.style.border = "1px solid rgba(148,163,184,0.12)";
                }
              }}
            >
              <span style={{ color: isActive ? color : "#64748B" }}>
                {PLATFORM_ICONS[p]}
              </span>
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        {/* Search icon */}
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#64748B" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          id="search-influencers"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          className="search-input w-full pl-12 pr-5 py-4 rounded-2xl text-sm font-medium transition-all duration-200"
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            color: "#F8FAFC",
            caretColor: "#6366F1",
          }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
            style={{ color: "#64748B" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#94A3B8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#64748B")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
