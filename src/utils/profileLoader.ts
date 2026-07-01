import type { ProfileDetailResponse, FullUserProfile } from "@/types";
import { extractProfiles, PLATFORMS } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (loader) {
    try {
      const result = await loader();
      const data =
        (result as { default?: ProfileDetailResponse }).default ?? result;
      return data as ProfileDetailResponse;
    } catch (e) {
      console.error("Failed to load profile details from JSON file:", e);
    }
  }

  // Fallback: look up in the search data across all platforms
  for (const platform of PLATFORMS) {
    const profiles = extractProfiles(platform);
    const foundProfile = profiles.find(
      (p) => p.username.toLowerCase() === username.toLowerCase()
    );

    if (foundProfile) {
      const userProfile: FullUserProfile = {
        ...foundProfile,
        type: platform,
      };

      return {
        cached: false,
        data: {
          success: true,
          user_profile: userProfile,
        },
      };
    }
  }

  return null;
}
