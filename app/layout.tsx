import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder | Land Your Dream Job",
  description:
    "Create professional, ATS-friendly resumes in minutes with AI optimization. Join 50,000+ job seekers who landed interviews with ResumeAI. Free to start.",
  keywords:
    "resume builder, AI resume generator, ATS-friendly resume, professional resume, CV builder, job application, career tools, resume templates",
  authors: [{ name: "ResumeAI" }],
  openGraph: {
    title: "ResumeAI - AI-Powered Resume Builder",
    description: "Create professional, ATS-friendly resumes in minutes. 300% increase in interview callbacks.",
    type: "website",
    siteName: "ResumeAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI - AI-Powered Resume Builder",
    description: "Create professional, ATS-friendly resumes in minutes with AI optimization.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_geist.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
