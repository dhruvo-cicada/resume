"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, CheckCircle2, Zap, FileText, Briefcase, Target, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-48 bg-card/50 animate-pulse rounded-lg" />,
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ResumeAI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/builder"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Builder
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Button size="sm" className="ml-4">
              Get Started
            </Button>
          </nav>
          <Button size="sm" className="md:hidden">
            <Link href="/builder">Start</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-3xl opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 md:mb-8 animate-fade-in">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary">AI-Powered Resume Builder</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in animation-delay-100">
              Land your dream job with an{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-optimized resume
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200 px-4">
              Create professional, ATS-friendly resumes in minutes. Our AI analyzes job descriptions and optimizes your
              content to increase your chances of getting hired by 300%.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12 animate-fade-in animation-delay-300 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-5 md:py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/builder" className="flex items-center gap-2">
                  Create Your Resume
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-5 md:py-6 bg-transparent"
              >
                View Examples
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground animate-fade-in animation-delay-400 px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span>50,000+ resumes created</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-primary fill-primary" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span>Generate in 2 minutes</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-12 md:mt-16 max-w-5xl mx-auto animate-fade-in animation-delay-500 px-4">
            <Card className="p-1.5 md:p-2 shadow-2xl border-border bg-card/80 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 md:w-24 md:h-24 text-primary mx-auto mb-2 md:mb-4 opacity-50" />
                  <p className="text-sm md:text-base text-muted-foreground">Resume Preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">300%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Increase in callbacks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">2 min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Average creation time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50k+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Happy users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">98%</div>
              <div className="text-xs md:text-sm text-muted-foreground">ATS compatibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything you need to stand out
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Powerful features designed to help you create resumes that get noticed by recruiters and pass ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">AI-Powered Optimization</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Our AI analyzes your content and suggests improvements using action verbs, metrics, and
                industry-specific keywords.
              </p>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">ATS-Friendly Format</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Guaranteed to pass Applicant Tracking Systems with clean formatting and proper keyword optimization.
              </p>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Job-Matched Content</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Tailor your resume to specific job descriptions automatically with AI-powered content matching.
              </p>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Multiple Export Options</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Download as PDF, DOCX, or copy as plain text. Your resume, your way.
              </p>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Professional Templates</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Choose from modern, elegant templates designed by career experts and hiring managers.
              </p>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-primary/50 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Instant Generation</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Get your professionally crafted resume in under 2 minutes. No complex setup required.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Create your resume in 3 simple steps
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Our streamlined process makes it easy to create a professional resume that stands out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-primary-foreground mx-auto mb-4 md:mb-6">
                  1
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Enter Your Info</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Provide your work experience, education, and skills in a simple form.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/30" />
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-primary-foreground mx-auto mb-4 md:mb-6">
                  2
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">AI Optimization</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Our AI enhances your content with industry keywords and professional language.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/30" />
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-primary-foreground mx-auto mb-4 md:mb-6">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Download & Apply</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Get your polished, ATS-ready resume and start applying to your dream jobs.
              </p>
            </div>
          </div>

          <div className="text-center mt-10 md:mt-12 px-4">
            <Button size="lg" className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-5 md:py-6 shadow-lg">
              <Link href="/builder" className="flex items-center gap-2">
                Start Building Now
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 px-4">
              Ready to land your dream job?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/90 mb-6 md:mb-8 px-4">
              Join thousands of professionals who have successfully landed interviews with our AI-powered resume
              builder.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-5 md:py-6 shadow-lg"
              >
                <Link href="/builder">Get Started for Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-sm md:text-base px-6 md:px-8 py-5 md:py-6 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
