import "@/styles/globals.css"
import { Metadata } from "next"
import ReactGA from "react-ga4"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  ReactGA.initialize("G-DT9EJBG3SJ");

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Facebook Marketplace Nationwide Search</title>
          <meta name="description" content="Search the Facebook Marketplace across all the US, Canada or Australia." />
          <meta name="author" content="GMOZ.biz" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen h-screen flex-col">
              <SiteHeader />
              <div className="h-full">{children}</div>
            </div>
            {/*<TailwindIndicator />*/}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
