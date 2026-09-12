import "./globals.css";
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { AppProvider } from "@/components/AppProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import LangNotice from "@/components/LangNotice";
import { OrganizationSchema, WebSiteSchema } from "@/components/schema";
import { SITE, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `MASAR — ${SITE.positioning}`,
    template: "%s · MASAR",
  },
  description: SITE.description,
  applicationName: "MASAR",
  authors: [{ name: "MASAR" }],
  keywords: [
    "Saudi Africa trade",
    "Nigeria Saudi Arabia trade",
    "African agricultural exporters",
    "Saudi agricultural buyers",
    "African commodity sourcing",
    "Saudi food import",
    "trade compliance",
    "agricultural procurement",
    "Nigeria export to Saudi Arabia",
  ],
  icons: {
    icon: [
      { url: "/brand/logo-mark.png", type: "image/png" },
    ],
    apple: "/brand/logo-mark.png",
  },
  openGraph: {
    type: "website",
    siteName: "MASAR",
    title: `MASAR — ${SITE.positioning}`,
    description: SITE.description,
    url: SITE_URL,
    locale: "en_GB",
    alternateLocale: ["ar_SA", "fr_FR"],
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "MASAR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `MASAR — ${SITE.positioning}`,
    description: SITE.description,
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

const bootstrap = `(function(){try{var l=localStorage.getItem('masar-lang')||'en';var th=localStorage.getItem('masar-theme')||'dark';var d=document.documentElement;d.classList.add(th==='light'?'light':'dark');d.lang=l;d.dir=(l==='ar'?'rtl':'ltr');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} ${arabic.variable}`}>
        <AppProvider>
          <div className="app-bg" aria-hidden="true" />
          <div className="app-grid" aria-hidden="true" />
          <Navbar />
          <LangNotice />
          <main id="main" className="min-h-screen pb-24 xl:pb-0">
            {children}
          </main>
          <Footer />
          <Tracker />
        </AppProvider>
      </body>
    </html>
  );
}
