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
  verification: {
    google: "google48456b389b98d05b",
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
        alternateName: ["Shawaz", "Shawaz Developer", "Shawaz Portfolio", "J Shawaz"],
        jobTitle: "Full-Stack Developer & Interactive Web Engineer",
        description:
          "Full-Stack Developer & Interactive Web Engineer specializing in crafting modern, performant web applications with Next.js, React, TypeScript, Three.js, and GSAP animations.",
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpeg`,
        sameAs: [
          "https://github.com/shawaz03",
          "https://www.instagram.com/__iamsha_",
          "https://www.linkedin.com/in/shawaz-j-979114302/",
        ],
        knowsAbout: [
          "Web Development",
          "React",
          "Next.js",
          "TypeScript",
          "Full-Stack Development",
          "GSAP Animations",
          "Three.js",
          "React Three Fiber",
          "Tailwind CSS",
          "Node.js",
          "REST APIs",
          "Web Performance & SEO",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering & Technical Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full-Stack Web Application Development",
                description:
                  "Building custom, performant, and scalable web applications using Next.js, React, TypeScript, and Node.js.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interactive 3D & WebGL Experiences",
                description:
                  "Crafting immersive 3D graphics and interactive web canvas visuals with Three.js and React Three Fiber.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Performant UI Animation & Motion Systems",
                description:
                  "Implementing responsive micro-interactions, smooth scroll, and complex sequence animations using GSAP and Framer Motion.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Shawaz Portfolio",
        description: "Official Portfolio of J. Shawaz - Full-Stack Developer & Interactive Web Engineer",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "J. Shawaz - Developer Profile & Showcase",
        mainEntity: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is J. Shawaz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "J. Shawaz is a Full-Stack Developer and Interactive Web Engineer specializing in Next.js, React, TypeScript, Three.js, and GSAP animations.",
            },
          },
          {
            "@type": "Question",
            name: "What is Shawaz's official portfolio website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The official portfolio of J. Shawaz is located at https://shawaz.vercel.app.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies does Shawaz specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shawaz specializes in Next.js (App Router), React 19, TypeScript, Tailwind CSS, Three.js, React Three Fiber, GSAP, Framer Motion, Lenis, and Node.js backend integration.",
            },
          },
          {
            "@type": "Question",
            name: "Is Shawaz available for freelance or full-time roles?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Shawaz is open for freelance web engineering projects, technical contracts, and full-time software developer opportunities.",
            },
          },
          {
            "@type": "Question",
            name: "How can I contact Shawaz for projects or hiring?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can reach out to Shawaz directly via the contact section on his portfolio (https://shawaz.vercel.app), LinkedIn (https://www.linkedin.com/in/shawaz-j-979114302/), or GitHub (https://github.com/shawaz03).",
            },
          },
        ],
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

