import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSavedList } from "@/context/SavedListContext";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
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
    <div className="min-h-screen relative" style={{ background: "#0F172A" }}>
      {/* Ambient background orbs */}
      <div
        style={{
          position: "fixed",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "floatOrb 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
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
