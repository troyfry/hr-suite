import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "HR Suite",
  description: "HR compliance, simplified",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

