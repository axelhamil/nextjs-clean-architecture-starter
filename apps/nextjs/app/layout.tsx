import type { Metadata } from "next";
import { Sora } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import Providers from "../common/providers";
import "./global.css";

import "@packages/ui/globals.css";
import { Toaster } from "@packages/ui/index";
import { getLocale } from "next-intl/server";

const sora = Sora({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "NextJS - Clean Architecture & Modern Development",
    template: "%s | NextJS",
  },
  description:
    "A clean Next.js application built with modern architecture patterns, TypeScript, and best practices for scalable development.",
  keywords: [
    "Next.js",
    "TypeScript",
    "Clean Architecture",
    "React",
    "Modern Development",
    "Full Stack",
  ],
  authors: [{ name: "AxelHamil" }],
  creator: "AxelHamil",
  publisher: "AxelHamil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://github.com/axelhamil"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/axelhamil",
    title: "NextJS - Clean Architecture & Modern Development",
    description:
      "A clean Next.js application built with modern architecture patterns, TypeScript, and best practices for scalable development.",
    siteName: "NextJS App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextJS Application Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS - Clean Architecture & Modern Development",
    description:
      "A clean Next.js application built with modern architecture patterns, TypeScript, and best practices for scalable development.",
    images: ["/og-image.jpg"],
    creator: "@axelhamil",
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
  verification: {
    google: "google-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
};
