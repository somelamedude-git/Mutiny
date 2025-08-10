import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mutiny",
  description: "Investor & founder network",
  themeColor: "#0A0A0C",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#0A0A0C" />
        <style>{`
          :root { color-scheme: dark; }
          html, body { background-color: #0A0A0C; }
        `}</style>
      </head>
      <body className="min-h-screen bg-[#0A0A0C]! text-white antialiased">{children}</body>
    </html>
  )
}
