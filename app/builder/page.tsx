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

const demoResume: GeneratedResume = {
  header: {
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    contact: {
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sarahjohnson",
    },
  },
  summary:
    "Results-driven Senior Software Engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Expertise in React, Node.js, and cloud architecture. Proven track record of delivering high-impact features that improve user experience and drive business growth.",
  experience: [
    {
      company: "Tech Innovations Inc.",
      title: "Senior Software Engineer",
      start: "Jan 2021",
      end: "Present",
      location: "San Francisco, CA",
      bullets: [
        "Led development of customer-facing dashboard using React and TypeScript, resulting in 40% increase in user engagement",
        "Architected microservices infrastructure on AWS, reducing system latency by 35%",
        "Mentored team of 5 junior engineers and conducted code reviews to maintain high code quality",
        "Implemented CI/CD pipelines with GitHub Actions, reducing deployment time by 60%",
      ],
    },
    {
      company: "Digital Solutions Corp",
      title: "Software Engineer",
      start: "Jun 2018",
      end: "Dec 2020",
      location: "Austin, TX",
      bullets: [
        "Developed RESTful APIs and database schemas supporting 50K+ daily active users",
        "Optimized database queries and implemented caching strategies, improving response time by 45%",
        "Collaborated with product and design teams to deliver 20+ features in agile sprints",
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      year: "2018",
    },
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "MongoDB", "GraphQL", "REST APIs"],
    soft: ["Team Leadership", "Problem Solving", "Communication", "Agile Methodology", "Code Review"],
    tools: ["Git", "Docker", "AWS", "Jenkins", "Jira", "Figma", "Postman"],
  },
  extra_skills_suggested: [
    { name: "Kubernetes", confidence: 0.85 },
    { name: "System Design", confidence: 0.78 },
    { name: "Testing (Jest/Cypress)", confidence: 0.72 },
  ],
  projects: [
    {
      name: "E-Commerce Platform Redesign",
      description:
        "Led the complete redesign of checkout flow for major e-commerce platform, implementing modern UI patterns and payment integrations that increased conversion rate by 28%",
      tech_stack: ["React", "Redux", "Stripe API", "Node.js", "PostgreSQL"],
      link: "https://github.com/sarahjohnson/ecommerce-platform",
    },
    {
      name: "Real-Time Analytics Dashboard",
      description:
        "Built real-time analytics dashboard for tracking user behavior and system metrics, processing 1M+ events per day with sub-second latency",
      tech_stack: ["React", "D3.js", "WebSockets", "Redis", "Elasticsearch"],
      link: "https://github.com/sarahjohnson/analytics-dashboard",
    },
  ],
}

export default function BuilderPage() {
  const [step, setStep] = useState<"form" | "preview">("preview")
  const [resumeData, setResumeData] = useState<GeneratedResume | null>(demoResume)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUserGenerated, setIsUserGenerated] = useState(false)

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
      setIsUserGenerated(true)
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
    if (isUserGenerated) {
      setStep("form")
    }
  }, [isUserGenerated])

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
        <ResumePreview data={resumeData} onEdit={handleEdit} allowEdit={isUserGenerated} />
      </div>
    ) : null
  }, [step, resumeData, isGenerating, isUserGenerated, handleGenerateResume, handleEdit])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">ResumeAI</h1>
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
          {/* Mobile Menu Button */}
          <Button variant="outline" className="md:hidden bg-transparent">
            Menu
          </Button>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/20 rounded-full mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary">AI-Powered Resume Builder</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
              Create Your Perfect Resume
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed px-4">
              Our AI optimizes your content to match job descriptions and boost your chances of getting hired.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-12 flex-wrap animate-fade-in animation-delay-100 px-4">
            <Button
              variant={step === "form" ? "default" : "outline"}
              onClick={() => handleStepChange("form")}
              disabled={isGenerating}
              className={`px-4 md:px-6 py-2 text-sm md:text-base transition-all duration-300 ${
                step === "form"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  : "border-border hover:bg-card"
              }`}
            >
              <span className="flex items-center gap-1.5 md:gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span className="hidden sm:inline">Your Information</span>
                <span className="sm:hidden">Info</span>
              </span>
            </Button>
            <div className="hidden sm:flex items-center text-muted-foreground">
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <Button
              variant={step === "preview" ? "default" : "outline"}
              onClick={() => handleStepChange("preview")}
              disabled={!resumeData || isGenerating}
              className={`px-4 md:px-6 py-2 text-sm md:text-base transition-all duration-300 ${
                step === "preview"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  : "border-border hover:bg-card"
              }`}
            >
              <span className="flex items-center gap-1.5 md:gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span className="hidden sm:inline">Preview Resume</span>
                <span className="sm:hidden">Preview</span>
              </span>
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-6 md:mb-8 p-3 md:p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive animate-fade-in text-sm md:text-base">
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
