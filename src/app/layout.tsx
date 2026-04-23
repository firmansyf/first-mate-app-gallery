import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import Footer from "./components/Footer";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_USERNAME,
  AUTHOR_JOB_TITLE,
} from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${AUTHOR_NAME}'s Online Gallery`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    AUTHOR_NAME,
    "yusuf firmansyah",
    "Yusuf",
    "Firmansyah",
    "FirstMate",
    "first mate",
    AUTHOR_JOB_TITLE,
    "software engineer indonesia",
    "personal gallery",
    "online gallery",
    "portfolio",
    "web developer",
    "photography",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${AUTHOR_NAME}'s Online Gallery`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${AUTHOR_NAME}'s Online Gallery`,
    description: SITE_DESCRIPTION,
    creator: `@${AUTHOR_USERNAME}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "personal",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: ["Yusuf", "Firmansyah", AUTHOR_USERNAME],
  url: SITE_URL,
  jobTitle: AUTHOR_JOB_TITLE,
  description: `${AUTHOR_NAME} adalah seorang ${AUTHOR_JOB_TITLE} dan pemilik gallery online ${SITE_NAME}.`,
  mainEntityOfPage: SITE_URL,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "First Mate",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "id",
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} h-full`}>
      <body className="min-h-full bg-gray-50 font-[family-name:var(--font-outfit)] antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">{children}</main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
