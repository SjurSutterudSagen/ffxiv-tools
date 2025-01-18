"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavItem {
  label: string;
  href: Route;
}

const mainNavItems: MainNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Crafting", href: "/crafting" },
  { label: "Gathering", href: "/gathering" },
  { label: "Settings", href: "/settings" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              FFXIV Tools
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
