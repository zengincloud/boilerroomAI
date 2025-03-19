import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { DashboardShell } from "@/components/dashboard-shell"
import { ToastContextProvider } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "boilerroom.ai",
  description: "AI-powered sales engagement platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ToastContextProvider>
          <DashboardShell>{children}</DashboardShell>
          <Toaster />
        </ToastContextProvider>
      </body>
    </html>
  )
}



import './globals.css'