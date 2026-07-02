import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
};

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platformParam = searchParams.get("platform") as Platform | null;
  const initialPlatform: Platform = (platformParam && ["instagram", "youtube", "tiktok"].includes(platformParam))
    ? platformParam
    : "instagram";

  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [listKey, setListKey] = useState(0); // triggers re-mount for animation
  const loadingTimerRef = useRef<number | null>(null);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handlePlatformChange = (p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
    setSearchParams({ platform: p });
    // Skeleton flash on tab switch
    setIsLoading(true);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setListKey((k) => k + 1);
    }, 350);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setListKey((k) => k + 1);
  };

  const handleProfileClick = (username: string) => {
    setClickCount(clickCount + 1);
    console.log("Clicked profile:", username, "total clicks:", clickCount);
  };

  return (
    <Layout title="Find Influencers">
      {/* Hero tagline */}
      <p className="text-left mb-8 text-base" style={{ color: "#94A3B8" }}>
        Discover creators that match your brand
      </p>

      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Results count badge */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: `${PLATFORM_COLORS[platform]}18`,
            color: PLATFORM_COLORS[platform],
            border: `1px solid ${PLATFORM_COLORS[platform]}33`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: PLATFORM_COLORS[platform] }}
          />
          {filtered.length} of {allProfiles.length} on {PLATFORM_LABELS[platform]}
        </span>
      </div>

      <ProfileList
        key={listKey}
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        isLoading={isLoading}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
