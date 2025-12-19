import { Card } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, Download, BarChart3, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Optimization",
      description:
        "Our advanced AI analyzes your background and optimizes your resume with industry-specific keywords and action verbs.",
    },
    {
      icon: Shield,
      title: "ATS-Friendly Format",
      description:
        "Resumes are formatted to pass Applicant Tracking Systems, ensuring your application reaches human recruiters.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "Get a professional resume in minutes, not hours. Fill in your details and let AI do the heavy lifting.",
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Download your resume as PDF, Word, or plain text. Perfect for any application platform.",
    },
    {
      icon: BarChart3,
      title: "Job-Matched Content",
      description: "Tailor your resume to specific job descriptions with AI-powered suggestions and recommendations.",
    },
    {
      icon: CheckCircle2,
      title: "Professional Templates",
      description: "Choose from modern, professionally-designed templates that impress hiring managers.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Fill Your Information",
      description: "Enter your work experience, education, skills, and career goals. No need for perfect formatting.",
    },
    {
      number: "02",
      title: "AI Enhancement",
      description: "Our AI analyzes your input and generates optimized content with powerful action verbs and metrics.",
    },
    {
      number: "03",
      title: "Review & Customize",
      description: "Preview your resume, make adjustments, and ensure everything matches your vision.",
    },
    {
      number: "04",
      title: "Download & Apply",
      description: "Export your resume in your preferred format and start applying to your dream jobs.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a resume that gets you noticed by top employers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="p-6 border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple 4-step process to create your perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[calc(100%-60%)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <Card className="p-6 border-border bg-card/50 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary-foreground">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully used ResumeAI to get hired at top companies.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
          >
            Start Building Your Resume
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
