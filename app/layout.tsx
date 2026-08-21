import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UNITED HORMONE — Precision Over Hype.",
  description:
    "Built for the discipline behind the physique. Elite pharmaceutical-grade formulations, HPLC batch verification, and uncompromising quality.",
  keywords: [
    "United Hormone",
    "Precision",
    "Performance",
    "Discipline",
    "Batch Verification",
    "Pharmaceutical Grade",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} dark h-full antialiased selection:bg-[#C8B84D]/30 selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F0EDE8] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
