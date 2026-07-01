import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSavedList } from "@/context/SavedListContext";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSaved } = useSavedList();
  const isSaved = isProfileSaved(profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-700 mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 w-[700px] max-w-full rounded-lg transition-colors"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full object-cover" />
      <div className="text-left flex-1">
        <div className="font-bold flex items-center gap-1">
          <span>@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{profile.fullname}</div>
        <div className="text-sm text-gray-500">{formatFollowersLocal(profile.followers)}</div>
      </div>
      <button
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
          isSaved
            ? "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 shadow-sm"
            : "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/30"
        }`}
        onClick={handleListClick}
      >
        {isSaved ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
