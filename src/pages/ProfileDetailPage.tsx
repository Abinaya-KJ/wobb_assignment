import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSavedList } from "@/context/SavedListContext";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const PLATFORM_BG_GLOW: Record<string, string> = {
  instagram: "rgba(225,48,108,0.2)",
  youtube: "rgba(255,0,0,0.2)",
  tiktok: "rgba(0,242,234,0.2)",
};

const STAT_GRADIENTS = [
  "linear-gradient(90deg, #6366F1, #8B5CF6)",
  "linear-gradient(90deg, #06B6D4, #3B82F6)",
  "linear-gradient(90deg, #10B981, #6366F1)",
  "linear-gradient(90deg, #F59E0B, #EF4444)",
  "linear-gradient(90deg, #EC4899, #8B5CF6)",
  "linear-gradient(90deg, #14B8A6, #06B6D4)",
];

interface StatCardProps {
  label: string;
  value: string;
  gradientIndex?: number;
  platformColor: string;
}

function StatCard({ label, value, gradientIndex = 0, platformColor }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-4 text-left"
      style={{
        background: "rgba(30, 41, 59, 0.6)",
        border: "1px solid rgba(148,163,184,0.1)",
        borderTop: `2px solid transparent`,
        backgroundClip: "padding-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient top border simulation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: STAT_GRADIENTS[gradientIndex % STAT_GRADIENTS.length],
        }}
      />
      <div className="text-xs font-medium mb-1" style={{ color: "#64748B" }}>
        {label}
      </div>
      <div className="text-xl font-bold" style={{ color: "#F8FAFC" }}>
        {value}
      </div>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const platformColor = PLATFORM_COLORS[platform] || "#6366F1";
  const platformBgGlow = PLATFORM_BG_GLOW[platform] || "rgba(99,102,241,0.2)";

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p style={{ color: "#CBD5E1" }}>Invalid profile</p>
        <Link to="/" style={{ color: "#818CF8" }}>Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          <div className="skeleton h-4 rounded-lg" style={{ width: "120px" }} />
          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <div className="flex gap-6 items-start">
              <div className="skeleton rounded-full flex-shrink-0" style={{ width: 96, height: 96 }} />
              <div className="flex-1 space-y-3">
                <div className="skeleton h-6 rounded-lg" style={{ width: "50%" }} />
                <div className="skeleton h-4 rounded-lg" style={{ width: "35%" }} />
                <div className="skeleton h-3 rounded-lg" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="mb-4" style={{ color: "#F87171" }}>
          Could not load profile details for {username}
        </p>
        <Link to={`/?platform=${platform}`} style={{ color: "#818CF8" }}>
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const { addProfile, removeProfile, isProfileSaved } = useSavedList();
  const isSaved = isProfileSaved(user.user_id);

  const handleListClick = () => {
    if (isSaved) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  return (
    <Layout title={user.fullname}>
      {/* Back link */}
      <Link
        to={`/?platform=${platform}`}
        className="inline-flex items-center gap-2 text-sm font-medium mb-8 group transition-all"
        style={{ color: "#94A3B8" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F8FAFC")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-1"
        >
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to search
      </Link>

      <div
        className="rounded-2xl overflow-hidden card-enter"
        style={{
          background: "rgba(30, 41, 59, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(148,163,184,0.12)",
          borderTop: `3px solid ${platformColor}`,
        }}
      >
        {/* Profile Header */}
        <div
          className="p-8"
          style={{
            background: `radial-gradient(ellipse at top left, ${platformBgGlow} 0%, transparent 60%)`,
          }}
        >
          <div className="flex gap-6 items-start text-left flex-wrap">
            {/* Avatar */}
            <div
              className="rounded-full p-1 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${platformColor}, ${platformColor}66)`,
                boxShadow: `0 0 30px ${platformBgGlow}`,
              }}
            >
              <img
                src={user.picture}
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: "3px solid #0F172A" }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2
                className="text-2xl font-bold flex items-center gap-2 flex-wrap"
                style={{ color: "#F8FAFC" }}
              >
                @{user.username}
                <VerifiedBadge verified={user.is_verified} />
              </h2>
              <p className="text-base mt-1" style={{ color: "#CBD5E1" }}>
                {user.fullname}
              </p>
              <span
                className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${platformColor}18`,
                  color: platformColor,
                  border: `1px solid ${platformColor}33`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: platformColor }} />
                {PLATFORM_LABELS[platform] || platform}
              </span>

              {user.description && (
                <p
                  className="mt-4 text-sm leading-relaxed max-w-lg"
                  style={{ color: "#94A3B8" }}
                >
                  {user.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="px-8 pb-6"
          style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
        >
          <h3 className="text-sm font-semibold mb-4 mt-6" style={{ color: "#64748B", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Analytics
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard
              label="Followers"
              value={formatFollowersDetail(user.followers)}
              gradientIndex={0}
              platformColor={platformColor}
            />
            <StatCard
              label="Engagement Rate"
              value={
                user.engagement_rate !== undefined
                  ? (user.engagement_rate * 10000).toFixed(2) + "%"
                  : "N/A"
              }
              gradientIndex={1}
              platformColor={platformColor}
            />
            {user.posts_count !== undefined && (
              <StatCard
                label="Posts"
                value={String(user.posts_count)}
                gradientIndex={2}
                platformColor={platformColor}
              />
            )}
            {user.avg_likes !== undefined && (
              <StatCard
                label="Avg Likes"
                value={formatFollowersDetail(user.avg_likes)}
                gradientIndex={3}
                platformColor={platformColor}
              />
            )}
            {user.avg_comments !== undefined && (
              <StatCard
                label="Avg Comments"
                value={String(user.avg_comments)}
                gradientIndex={4}
                platformColor={platformColor}
              />
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <StatCard
                label="Avg Views"
                value={formatFollowersDetail(user.avg_views)}
                gradientIndex={5}
                platformColor={platformColor}
              />
            )}
            {user.engagements !== undefined && (
              <StatCard
                label="Engagements"
                value={formatEngagementRate(user.engagement_rate)}
                gradientIndex={0}
                platformColor={platformColor}
              />
            )}
          </div>
        </div>

        {/* CTA Footer */}
        <div
          className="px-8 py-6 flex flex-wrap gap-3 items-center"
          style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
        >
          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`view-platform-btn-${user.user_id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: `${platformColor}22`,
                color: platformColor,
                border: `1px solid ${platformColor}44`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = `${platformColor}33`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = `${platformColor}22`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              View on {PLATFORM_LABELS[platform] || "platform"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}

          <button
            id={`detail-add-btn-${user.user_id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
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
                    boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                  }
            }
            onClick={handleListClick}
            onMouseEnter={(e) => {
              if (!isSaved) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(99,102,241,0.55)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaved) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(99,102,241,0.4)";
              }
            }}
          >
            {isSaved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Saved to List
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Add to List
              </>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
