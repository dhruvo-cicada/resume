"use client"

import { useState, useCallback, useMemo } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-48 bg-card/50 animate-pulse rounded-lg" />,
  ssr: false,
})

export interface ResumeData {
  name: string
  current_title: string
  summary_or_bio: string
  education: string
  work_experience: string
  skills: string
  projects: string
  target_job: string
  industry: string
  language: string
}

export interface GeneratedResume {
  header: {
    name: string
    title: string
    contact: {
      email: string
      phone: string
      location: string
      linkedin: string
    }
  }
  summary: string
  experience: Array<{
    company: string
    title: string
    start: string
    end: string
    location: string
    bullets: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    tools: string[]
  }
  extra_skills_suggested: Array<{
    name: string
    confidence: number
  }>
  projects: Array<{
    name: string
    description: string
    tech_stack: string[]
    link: string
  }>
}

export default function BuilderPage() {
  const [step, setStep] = useState<"form" | "preview">("form")
  const [resumeData, setResumeData] = useState<GeneratedResume | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateResume = useCallback(async (formData: ResumeData) => {
    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to generate resume")

      const data = await response.json()
      setResumeData(data.resume)
      setStep("preview")
    } catch (error) {
      console.error("Error generating resume:", error)
      setError("Failed to generate resume. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const handleStepChange = useCallback((newStep: "form" | "preview") => {
    setStep(newStep)
  }, [])

  const handleEdit = useCallback(() => {
    setStep("form")
  }, [])

  const content = useMemo(() => {
    if (step === "form") {
      return (
        <Card className="p-8 shadow-2xl border-border bg-card/80 backdrop-blur-sm animate-fade-in">
          <ResumeForm onSubmit={handleGenerateResume} isLoading={isGenerating} />
        </Card>
      )
    }
    return resumeData ? (
      <div className="animate-fade-in">
        <ResumePreview data={resumeData} onEdit={handleEdit} />
      </div>
    ) : null
  }, [step, resumeData, isGenerating, handleGenerateResume, handleEdit])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ResumeAI</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Home
            </Link>
            <Link href="/builder" className="text-foreground transition-colors text-sm font-medium">
              Builder
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Blog
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI-Powered Resume Builder</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Create Your Perfect Resume
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our AI optimizes your content to match job descriptions and boost your chances of getting hired.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap animate-fade-in animation-delay-100">
            <Button
              variant={step === "form" ? "default" : "outline"}
              onClick={() => handleStepChange("form")}
              disabled={isGenerating}
              className={`px-6 py-2 transition-all duration-300 ${
                step === "form"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  : "border-border hover:bg-card"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Your Information
              </span>
            </Button>
            <div className="hidden sm:flex items-center text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
            </div>
            <Button
              variant={step === "preview" ? "default" : "outline"}
              onClick={() => handleStepChange("preview")}
              disabled={!resumeData || isGenerating}
              className={`px-6 py-2 transition-all duration-300 ${
                step === "preview"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  : "border-border hover:bg-card"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Preview Resume
              </span>
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive animate-fade-in">
              {error}
            </div>
          )}

          {/* Content */}
          <div className="max-w-4xl mx-auto">{content}</div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
