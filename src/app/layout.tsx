import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/app/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const SITE_URL = "https://shawaz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shawaz | Full-Stack Developer & Interactive Web Engineer",
    template: "%s | Shawaz Portfolio",
  },
  description:
    "Official Portfolio of J. Shawaz - Full-Stack Developer & Interactive Web Engineer. Specializing in modern web applications with Next.js, React, TypeScript, GSAP, and Three.js.",
  keywords: [
    "Shawaz",
    "Shawaz Portfolio",
    "J Shawaz",
    "Shawaz Developer",
    "Shawaz Web Developer",
    "Shawaz Full Stack Developer",
    "Shawaz Vercel",
    "Full Stack Developer Portfolio",
    "Interactive Web Developer",
    "Next.js Developer Portfolio",
    "React Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "J. Shawaz", url: SITE_URL }],
  creator: "J. Shawaz",
  publisher: "J. Shawaz",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Shawaz | Full-Stack Developer & Interactive Web Engineer",
    description:
      "Explore the interactive developer console & portfolio of J. Shawaz. Engineered with Next.js, React, TypeScript, GSAP, and Three.js.",
    siteName: "Shawaz Portfolio",
    images: [
      {
        url: "/profile-circle.png",
        width: 800,
        height: 800,
        alt: "Shawaz - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shawaz | Full-Stack Developer & Interactive Web Engineer",
    description:
      "Official Portfolio of J. Shawaz. Engineered with Next.js, GSAP, Framer Motion, and Three.js.",
    creator: "@__iamsha_",
    images: ["/profile-circle.png"],
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "J. Shawaz",
        alternateName: ["Shawaz", "Shawaz Developer", "Shawaz Portfolio"],
        jobTitle: "Full-Stack Developer",
        description:
          "Full-Stack Developer passionate about crafting immersive, high-performance web experiences.",
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpeg`,
        sameAs: [
          "https://github.com/shawaz03",
          "https://www.instagram.com/__iamsha_",
        ],
        knowsAbout: [
          "Web Development",
          "React",
          "Next.js",
          "TypeScript",
          "Full-Stack Development",
          "GSAP",
          "Three.js",
          "Tailwind CSS",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Shawaz Portfolio",
        description: "Official Portfolio of J. Shawaz - Full-Stack Developer",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

