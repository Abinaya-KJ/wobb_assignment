import { useState } from "react";
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

  return (
    <div className="p-4 min-h-screen relative">
      <header className="mb-6 border-b dark:border-gray-800 pb-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-purple-600 transition-colors">
          Influencer Search
        </Link>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative px-4 py-2 text-sm font-semibold rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-all cursor-pointer flex items-center gap-2 border border-purple-200/50 dark:border-purple-800/30"
        >
          <span>⭐ My Saved List</span>
          <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {savedProfiles.length}
          </span>
        </button>
      </header>

      {title && <h1 className="text-2xl font-bold mt-2 mb-6 text-left">{title}</h1>}

      <main>{children}</main>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Panel */}
          <div className="relative w-screen max-w-md bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col h-full animate-slide-in">
            <div className="p-5 border-b border-gray-150 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 m-0">
                Saved Influencers ({savedProfiles.length})
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {savedProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 py-10">
                  <span className="text-5xl mb-4">⭐</span>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Your saved list is empty.</p>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Add influencers from search results to see them here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProfiles.map((p) => (
                    <div
                      key={p.user_id}
                      className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-800/80 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all duration-150"
                    >
                      <img src={p.picture} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-800" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">
                          @{p.username}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.fullname}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">
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
                        className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
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
