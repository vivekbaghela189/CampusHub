import { Providers } from "./providers"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next";

const geist = GeistSans

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
