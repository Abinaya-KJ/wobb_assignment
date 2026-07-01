import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platformParam = searchParams.get("platform") as Platform | null;
  const initialPlatform: Platform = (platformParam && ["instagram", "youtube", "tiktok"].includes(platformParam))
    ? platformParam
    : "instagram";

  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount(clickCount + 1);
    console.log("Clicked profile:", username, "total clicks:", clickCount);
  };

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
          setSearchParams({ platform: p });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
