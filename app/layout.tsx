"use client";

import "./globals.css";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
