import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSavedList } from "@/context/SavedListContext";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showDecorations?: boolean;
}

interface DecorationItem {
  src: string;
  alt: string;
  top: string;
  left?: string;
  right?: string;
  rotation: string;
  animation: string;
  glow: string;
  width: string;
}

const LEFT_DECORATIONS: DecorationItem[] = [
  {
    src: "/src/assets/images/decorations/camera.png?v=2",
    alt: "3D Professional Camera",
    top: "0%",
    left: "-15px",
    rotation: "-15deg",
    animation: "floatY 6s ease-in-out infinite",
    glow: "drop-shadow(0 15px 30px rgba(0,0,0,0.55))",
    width: "144px", // w-36
  },
  {
    src: "/src/assets/images/decorations/ring-light.png?v=2",
    alt: "3D Ring Light",
    top: "14%",
    left: "40px",
    rotation: "12deg",
    animation: "floatY2 5s ease-in-out infinite",
    glow: "drop-shadow(0 0 25px rgba(255,255,255,0.45)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
    width: "144px", // w-36
  },
  {
    src: "/src/assets/images/decorations/headphones.png?v=2",
    alt: "3D Headphones",
    top: "38%",
    left: "-10px",
    rotation: "-10deg",
    animation: "floatY3 7s ease-in-out infinite",
    glow: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
    width: "128px", // w-32
  },
  {
    src: "/src/assets/images/decorations/tiktok-logo.png?v=2",
    alt: "TikTok Logo",
    top: "56%",
    left: "50px",
    rotation: "18deg",
    animation: "floatY 5.5s ease-in-out infinite",
    glow: "drop-shadow(0 0 20px rgba(0,242,234,0.45))",
    width: "112px", // w-28
  },
  {
    src: "/src/assets/images/decorations/microphone.png?v=2",
    alt: "3D Microphone",
    top: "74%",
    left: "5px",
    rotation: "15deg",
    animation: "floatY2 6.5s ease-in-out infinite",
    glow: "drop-shadow(0 15px 35px rgba(0,0,0,0.5))",
    width: "96px", // w-24
  },
];

const RIGHT_DECORATIONS: DecorationItem[] = [
  {
    src: "/src/assets/images/decorations/led-light.png?v=2",
    alt: "3D LED Light Wand",
    top: "0%",
    right: "20px",
    rotation: "-22deg",
    animation: "floatY3 6.2s ease-in-out infinite",
    glow: "drop-shadow(0 0 25px rgba(139,92,246,0.45))",
    width: "112px", // w-28
  },
  {
    src: "/src/assets/images/decorations/gimbal.png?v=2",
    alt: "3D Gimbal Stabilizer",
    top: "24%",
    right: "-10px",
    rotation: "15deg",
    animation: "floatY 5.8s ease-in-out infinite",
    glow: "drop-shadow(0 15px 35px rgba(0,0,0,0.55))",
    width: "128px", // w-32
  },
  {
    src: "/src/assets/images/decorations/youtube-play.png?v=2",
    alt: "YouTube Neon Play Button",
    top: "50%",
    right: "40px",
    rotation: "-12deg",
    animation: "floatY2 6.8s ease-in-out infinite",
    glow: "drop-shadow(0 0 20px rgba(255,0,0,0.45))",
    width: "144px", // w-36
  },
  {
    src: "/src/assets/images/decorations/drone.png?v=2",
    alt: "3D Quadcopter Drone",
    top: "70%",
    right: "-10px",
    rotation: "10deg",
    animation: "floatY3 7.5s ease-in-out infinite",
    glow: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))",
    width: "128px", // w-32
  },
];

export function Layout({ children, title, showDecorations = true }: LayoutProps) {
  const { savedProfiles, removeProfile } = useSavedList();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [badgeBounce, setBadgeBounce] = useState(false);
  const prevCount = useRef(savedProfiles.length);

  useEffect(() => {
    if (savedProfiles.length > prevCount.current) {
      setBadgeBounce(true);
      setTimeout(() => setBadgeBounce(false), 450);
    }
    prevCount.current = savedProfiles.length;
  }, [savedProfiles.length]);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#0B0F19" }}>
      {/* Star Field Background */}
      <div className="star-field pointer-events-none" />

      {/* Central spotlight radial glow behind header/content */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />

      {/* Floating 3D Side Decorations */}
      {showDecorations && (
        <>
          {/* Left Panel */}
          <div className="hidden md:block fixed left-2 lg:left-4 xl:left-[calc(50vw-580px)] top-[140px] bottom-10 w-[220px] pointer-events-none z-0">
            {LEFT_DECORATIONS.map((item, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: item.top,
                  left: item.left,
                  animation: item.animation,
                  animationDelay: `${idx * 0.4}s`,
                  '--rot': item.rotation,
                } as React.CSSProperties}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-auto object-contain"
                  style={{
                    width: item.width,
                    filter: item.glow,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="hidden md:block fixed right-2 lg:right-4 xl:right-[calc(50vw-580px)] top-[140px] bottom-10 w-[220px] pointer-events-none z-0">
            {RIGHT_DECORATIONS.map((item, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: item.top,
                  right: item.right,
                  animation: item.animation,
                  animationDelay: `${idx * 0.4}s`,
                  '--rot': item.rotation,
                } as React.CSSProperties}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-auto object-contain"
                  style={{
                    width: item.width,
                    filter: item.glow,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Ambient background orbs */}
      <div
        style={{
          position: "fixed",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "floatOrb 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "40%",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "floatOrb 16s ease-in-out infinite reverse",
        }}
      />

      {/* Navbar */}
      <header
        className="glass sticky top-0 z-40 border-b"
        style={{ borderColor: "rgba(148,163,184,0.08)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="gradient-text text-xl font-extrabold tracking-tight hover:opacity-80 transition-opacity"
            style={{ letterSpacing: "-0.02em" }}
          >
            ✦ Influencer Search
          </Link>

          <button
            id="saved-list-btn"
            onClick={() => setIsDrawerOpen(true)}
            className="saved-btn-glow btn-gradient flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>My Saved List</span>
            <span
              className={`bg-white/20 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-bold px-1 ${badgeBounce ? "badge-bounce" : ""}`}
            >
              {savedProfiles.length}
            </span>
          </button>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-8 relative z-10">
        {title && (
          <h1
            className="gradient-text text-left mb-1"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {title}
          </h1>
        )}

        <main>{children}</main>
      </div>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Panel */}
          <div
            className="relative w-screen max-w-md flex flex-col h-full animate-slide-in border-l"
            style={{
              background: "#1E293B",
              borderColor: "rgba(148,163,184,0.12)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="px-6 py-5 flex items-center justify-between border-b"
              style={{ borderColor: "rgba(148,163,184,0.1)" }}
            >
              <h2 className="text-lg font-bold text-white m-0">
                Saved Influencers
                <span
                  className="ml-2 text-sm font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(99,102,241,0.2)", color: "#818CF8" }}
                >
                  {savedProfiles.length}
                </span>
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer p-2 rounded-full transition-colors"
                style={{ background: "rgba(148,163,184,0.1)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {savedProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(99,102,241,0.15)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className="font-semibold text-sm text-white mb-1">Your saved list is empty</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    Add influencers from search results to see them here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProfiles.map((p) => (
                    <div
                      key={p.user_id}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150"
                      style={{
                        background: "rgba(15,23,42,0.5)",
                        border: "1px solid rgba(148,163,184,0.1)",
                      }}
                    >
                      <img
                        src={p.picture}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: "2px solid rgba(99,102,241,0.4)" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.username)}&background=random&color=fff&size=128&bold=true`;
                        }}
                      />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-bold text-sm text-white truncate">
                          @{p.username}
                        </div>
                        <div className="text-xs truncate" style={{ color: "#94A3B8" }}>
                          {p.fullname}
                        </div>
                        <div className="text-[10px] font-semibold mt-0.5" style={{ color: "#4ADE80" }}>
                          {p.followers >= 1000000
                            ? (p.followers / 1000000).toFixed(1) + "M"
                            : p.followers >= 1000
                            ? (p.followers / 1000).toFixed(0) + "K"
                            : p.followers}{" "}
                          followers
                        </div>
                      </div>
                      <button
                        onClick={() => removeProfile(p.user_id)}
                        className="text-xs font-semibold cursor-pointer px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          color: "#F87171",
                          background: "rgba(248,113,113,0.1)",
                          border: "1px solid rgba(248,113,113,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.1)";
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
