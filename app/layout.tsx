import { Providers } from "@/components/theme/Providers"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { KeyboardShortcutsProvider } from "./context/KeyboardShortcutsContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindFlow — Clear your mind through expressive writing",
  description:
    "Welcome to MindFlow – a unique platform to clear your mind through raw, unfiltered writing. Express yourself and see your thoughts gracefully fade into the background, making space for fresh ideas and inspiration.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}, container mx-auto selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black`}
      >
        <Providers>
          <KeyboardShortcutsProvider>{children}</KeyboardShortcutsProvider>
        </Providers>
      </body>
    </html>
  )
}
