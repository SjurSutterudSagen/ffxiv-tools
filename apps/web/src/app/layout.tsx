import type { Metadata } from "next";

import "./globals.css";
import { Nav } from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "FFXIV Tools",
  description: "Tools for Final Fantasy XIV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
