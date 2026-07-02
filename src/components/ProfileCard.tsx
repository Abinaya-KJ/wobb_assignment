import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSavedList } from "@/context/SavedListContext";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  index?: number;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
};

const PLATFORM_RING_GLOW: Record<Platform, string> = {
  instagram: "rgba(225,48,108,0.5)",
  youtube: "rgba(255,0,0,0.5)",
  tiktok: "rgba(0,242,234,0.5)",
};

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  index = 0,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSaved } = useSavedList();
  const isSaved = isProfileSaved(profile.user_id);
  const [btnPulsing, setBtnPulsing] = useState(false);

  const platformColor = PLATFORM_COLORS[platform];
  const platformGlow = PLATFORM_RING_GLOW[platform];

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBtnPulsing(true);
    setTimeout(() => setBtnPulsing(false), 500);
    if (isSaved) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="card-enter group cursor-pointer rounded-2xl transition-all duration-250 relative overflow-hidden"
      style={{
        animationDelay: `${index * 50}ms`,
        background: "rgba(30, 41, 59, 0.6)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(148,163,184,0.12)",
        borderLeft: `3px solid ${platformColor}`,
        marginBottom: "12px",
      }}
      data-search={searchQuery}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.border = `1px solid ${platformColor}55`;
        el.style.borderLeft = `3px solid ${platformColor}`;
        el.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px ${platformColor}22`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.border = "1px solid rgba(148,163,184,0.12)";
        el.style.borderLeft = `3px solid ${platformColor}`;
        el.style.boxShadow = "none";
      }}
    >
      <div className="flex items-center gap-4 p-5">
        {/* Avatar with platform ring */}
        <div className="relative flex-shrink-0">
          <div
            className="w-14 h-14 rounded-full p-0.5"
            style={{
              background: `linear-gradient(135deg, ${platformColor}, ${platformColor}88)`,
              boxShadow: `0 0 12px ${platformGlow}`,
            }}
          >
            <img
              src={profile.picture}
              className="w-full h-full rounded-full object-cover"
              style={{ border: "2px solid #0F172A" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=random&color=fff&size=128&bold=true`;
              }}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-left flex-1 min-w-0">
          <div className="font-bold text-base flex items-center gap-1 flex-wrap" style={{ color: "#F8FAFC" }}>
            <span>@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-sm truncate" style={{ color: "#94A3B8" }}>
            {profile.fullname}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span className="text-xs font-semibold" style={{ color: "#4ADE80" }}>
              {formatFollowersLocal(profile.followers)}
            </span>
          </div>
        </div>

        {/* Add to List Button */}
        <button
          id={`add-btn-${profile.user_id}`}
          className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-200 ${btnPulsing ? "btn-pulse" : ""}`}
          style={
            isSaved
              ? {
                  background: "rgba(74,222,128,0.15)",
                  color: "#4ADE80",
                  border: "1px solid rgba(74,222,128,0.35)",
                }
              : {
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "#fff",
                  border: "1px solid transparent",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }
          }
          onClick={handleListClick}
          onMouseEnter={(e) => {
            if (!isSaved) {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {isSaved ? "Added ✓" : "Add to List"}
        </button>
      </div>
    </div>
  );
}
