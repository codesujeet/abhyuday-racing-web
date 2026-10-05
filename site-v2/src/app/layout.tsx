import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Saira_Condensed } from "next/font/google";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/content/site";
import "./globals.css";

const saira = Saira_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-saira", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Autonomous & electric off-road racing, GHRCEM Pune`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["Team Abhyuday Racing", "aBAJA", "eBAJA", "BAJA SAEINDIA", "autonomous vehicle", "GHRCEM Pune", "student motorsport", "A10"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "A10, Team Abhyuday Racing's autonomous buggy" }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
  colorScheme: "dark",
};

// Runs before first paint: skip the preloader if already seen this session or if the visitor prefers less motion.
const preloadGate = `try{if(sessionStorage.getItem("tar-preloaded")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("skip-preload")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${saira.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadGate }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Preloader />
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
