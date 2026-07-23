import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/app/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "SHAWAZ PORTFOLIO",
  description: "Futuristic developer console & interactive signal deck portfolio. Engineered with Next.js, GSAP, and Framer Motion.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-void text-ink font-sans selection:bg-signal/30 flex flex-col">
        <SmoothScrollProvider>
          <ScrollProgress />
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
