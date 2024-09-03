import "@/styles/globals.css"
import { Metadata } from "next"
import ReactGA from "react-ga4"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "image": siteConfig.url+"/share.jpg",
  "url": siteConfig.url
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: "Steve Oziel", url: "https://www.steveinnovates.com" }],
  creator: "Steve Oziel",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png"
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{
      url: "/share.png",
    }],
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ANALYTICS_ID);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{siteConfig.name}</title>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex h-screen min-h-screen flex-col">
              <SiteHeader />
              <div>{children}</div>
            </div>
          </ThemeProvider>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
        </body>
      </html>
    </>
  )
}
