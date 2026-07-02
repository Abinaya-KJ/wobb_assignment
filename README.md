# Influencer Search App — Wobb Assignment

## 1. Bugs I Noticed

- npm install threw errors on first setup
- YouTube tab went completely blank when typing anything in the search bar
- Only the first two profiles were clickable — all others failed to load
- Clicking any profile outside the first two showed "Could not load profile details"
- "Back to search" always went back to Instagram tab regardless of which platform you were on
- "Add to List" button existed but did nothing when clicked
- YouTube channel profile pictures were broken (showing red broken image circle)
- Some YouTube avatars downloaded locally were fake colored squares, not real logos

---

## 2. How I Fixed Them

- Fixed npm install errors by clearing node_modules and reinstalling cleanly
- Fixed YouTube blank search by adding proper error handling and an empty state message
- Fixed profile loading by replacing hardcoded lookup with dynamic find-by-username so all 10 profiles per platform work
- Fixed "Back to search" by passing the current platform tab through route state so navigation returns to the correct tab
- Implemented "Add to List" with duplicate prevention, "Added ✓" visual feedback, and localStorage so the list persists after page refresh
- Fixed broken YouTube avatars by adding an onError fallback that generates a letter avatar from the username when an image fails to load

---

## 3. UI/UX Improvements

- Changed background from plain black to deep navy blue (#0F172A) to match Wobb's dark brand theme
- Added platform brand colors — Instagram pink, YouTube red, TikTok cyan — as card left borders and active tab highlights
- Added SVG icons for Instagram, YouTube, and TikTok inside the platform tab buttons
- Redesigned profile cards with a glassmorphism dark style, hover lift effect, and smooth animations
- Added gradient purple-blue text for the "Find Influencers" heading
- Added glowing border effect on the search bar when focused
- Added frosted glass navbar with gradient logo text
- Added staggered fade-in animation so cards load one after another smoothly
- Added "My Saved List" pill button in the navbar showing a live count badge
- Added 3D floating decoration images on both sides of the hero section — ring light, DSLR camera, microphone, headphones, drone, gimbal on the left, and neon TikTok logo, YouTube play button, LED light bar on the right — each with a slow floating up-down animation
- Made the layout fully responsive so it works on mobile screens

---

## 4. Assumptions Made

- No real API keys were provided so all data is treated as static mock data — follower counts and profile details are example values, not live data
- "Add to List" was understood as a personal saved shortlist feature, like bookmarking a creator for later
- Since there was no backend or database provided, localStorage was used to keep the saved list persistent across page refreshes
- YouTube avatar images are not reliably available from public URLs so a letter-based fallback was used when images fail to load
- The app is assumed to be used on desktop primarily, though mobile responsiveness was still added

---

## 5. Trade-offs

- **localStorage instead of a database** — the saved list persists only on the user's device and clears if browser storage is wiped; a real backend would be needed for proper persistence
- **Static mock data instead of real APIs** — avoids the complexity of API keys and rate limits but means the data never updates automatically
- **Letter avatar fallback instead of fixing each URL** — more maintainable since broken URLs can't always be predicted, but the fallback looks less polished than a real profile photo
- **Pure Tailwind CSS animations instead of Framer Motion** — keeps the bundle size smaller and avoids an extra dependency, but animations are less flexible and smooth compared to a dedicated animation library
- **No Zustand yet** — React Context was kept as-is due to time constraints; Zustand would make state management cleaner especially as the app grows

---

## How to Run
command prompt 
npm install
npm run dev
