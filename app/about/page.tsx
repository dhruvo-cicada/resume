"use client"

import { useState, useEffect } from "react"
import { Sparkles, Users, Zap, Shield, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const stats = [
    { label: "Resumes Generated", value: "50K+", icon: TrendingUp },
    { label: "Success Rate", value: "94%", icon: Award },
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Job Placements", value: "8.5K+", icon: Zap },
  ]

  const features = [
    {
      title: "AI-Powered Optimization",
      description: "Our advanced AI analyzes job descriptions and optimizes your resume for maximum impact.",
      icon: Sparkles,
    },
    {
      title: "ATS-Friendly Format",
      description: "Resumes designed to pass Applicant Tracking Systems and get noticed by recruiters.",
      icon: Shield,
    },
    {
      title: "Instant Generation",
      description: "Create a professional resume in minutes, not hours. Get started immediately.",
      icon: Zap,
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former HR Director with 10+ years in recruitment and talent acquisition.",
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      bio: "AI/ML specialist with expertise in natural language processing and resume optimization.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "UX/UI designer passionate about creating intuitive and beautiful products.",
    },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ResumeAI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Builder
            </a>
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Blog
            </a>
            <a href="/about" className="text-primary font-semibold text-sm">
              About
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div
            className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Empowering Careers with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ResumeAI is on a mission to help professionals land their dream jobs by creating stunning, ATS-optimized
              resumes powered by artificial intelligence.
            </p>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="p-6 text-center border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              )
            })}
          </div>

          {/* Features Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose ResumeAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="p-8 border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                  >
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Team Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="p-8 border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={`bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 text-center transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Resume?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs with ResumeAI.
            </p>
            <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
              Start Building Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
