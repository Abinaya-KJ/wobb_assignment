import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  isLoading?: boolean;
  onProfileClick: (username: string) => void;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 mb-3 flex items-center gap-4"
      style={{
        background: "rgba(30, 41, 59, 0.4)",
        border: "1px solid rgba(148,163,184,0.08)",
      }}
    >
      <div className="skeleton rounded-full flex-shrink-0" style={{ width: 56, height: 56 }} />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 rounded-lg" style={{ width: "40%" }} />
        <div className="skeleton h-3 rounded-lg" style={{ width: "60%" }} />
        <div className="skeleton h-3 rounded-lg" style={{ width: "30%" }} />
      </div>
      <div className="skeleton rounded-xl flex-shrink-0" style={{ width: 96, height: 36 }} />
    </div>
  );
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  isLoading = false,
  onProfileClick,
}: ProfileListProps) {
  if (isLoading) {
    return (
      <div className="results-enter">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="results-enter">
      {profiles.length === 0 && (
        <div
          className="text-center py-16 rounded-2xl"
          style={{
            background: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(148,163,184,0.08)",
          }}
        >
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold text-sm" style={{ color: "#CBD5E1" }}>No profiles found</p>
          <p className="text-xs mt-1" style={{ color: "#64748B" }}>Try a different search term</p>
        </div>
      )}
      {profiles.map((profile, i) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          index={i}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
