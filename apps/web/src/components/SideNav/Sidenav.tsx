"use client";

import { useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavItem {
  label: string;
  href: Route;
}

// Define sub-navigation items for each main route
const subNavConfig: Record<string, SubNavItem[]> = {
  "/market": [
    { label: "Overview", href: "/market" },
    { label: "Price History", href: "/market/history" },
    { label: "Market Analysis", href: "/market/analysis" },
    { label: "Favorites", href: "/market/favorites" },
  ],
  "/crafting": [
    { label: "Recipe Search", href: "/crafting" },
    { label: "Calculator", href: "/crafting/calculator" },
    { label: "Materials", href: "/crafting/materials" },
    { label: "Rotations", href: "/crafting/rotations" },
  ],
  "/gathering": [
    { label: "Node Timer", href: "/gathering" },
    { label: "Maps", href: "/gathering/maps" },
    { label: "Collectables", href: "/gathering/collectables" },
  ],
};

export default function Sidenav({ section }: { section: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const currentSubNav = subNavConfig[section] || [];

  if (!currentSubNav.length) {
    return null;
  }

  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] transition-transform ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white`}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          {/* Toggle Button */}
          <div className="mb-8 flex items-center justify-between">
            {isOpen && (
              <h2 className="text-xl font-bold">
                {section.slice(1).charAt(0).toUpperCase() + section.slice(2)}
              </h2>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-gray-700"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {currentSubNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
                  pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
