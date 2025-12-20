"use client"

import type { GeneratedResume } from "@/app/builder/page"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRef, useState, useCallback, memo } from "react"
import { Download, Edit2, Copy, Check, ExternalLink, Mail, Phone, MapPin, Linkedin } from "lucide-react"

interface ResumePreviewProps {
  data: GeneratedResume
  onEdit: () => void
  allowEdit?: boolean
}

export const ResumePreview = memo(function ResumePreview({ data, onEdit, allowEdit = true }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPDF = useCallback(async () => {
    setIsDownloading(true)
    try {
      const html2pdf = (await import("html2pdf.js")).default

      // Create a clean version for PDF without buttons
      const pdfContent = document.createElement("div")
      pdfContent.innerHTML = resumeRef.current?.innerHTML || ""

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${data.header.name.replace(/\s+/g, "_")}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      }

      await html2pdf().set(opt).from(resumeRef.current).save()
    } catch (error) {
      console.error("Failed to generate PDF:", error)
      alert("Failed to download PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }, [data.header.name])

  const copyToClipboard = useCallback(() => {
    const text = JSON.stringify(data, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [data])

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center flex-wrap animate-fade-in">
        <Button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-all duration-200 hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Generating..." : "Download PDF"}
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="px-6 gap-2 border-border hover:bg-card bg-transparent transition-all duration-200 hover:shadow-lg"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy JSON
            </>
          )}
        </Button>
        {allowEdit && (
          <Button
            onClick={onEdit}
            variant="outline"
            className="px-6 gap-2 border-border hover:bg-card bg-transparent transition-all duration-200 hover:shadow-lg"
          >
            <Edit2 className="w-4 h-4" />
            Edit Resume
          </Button>
        )}
      </div>

      <Card className="p-8 md:p-12 bg-card text-foreground shadow-2xl border-border animate-fade-in" ref={resumeRef}>
        {/* Header Section */}
        <div className="mb-8 pb-6 border-b-2 border-primary">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{data.header.name}</h1>
          <p className="text-lg md:text-xl font-semibold text-primary mb-4">{data.header.title}</p>

          {/* Contact Information with Icons */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {data.header.contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{data.header.contact.email}</span>
              </div>
            )}
            {data.header.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{data.header.contact.phone}</span>
              </div>
            )}
            {data.header.contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.header.contact.location}</span>
              </div>
            )}
            {data.header.contact.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <span>{data.header.contact.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-primary/30">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{exp.title}</h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                      {exp.location && <p className="text-muted-foreground text-sm">{exp.location}</p>}
                    </div>
                    <span className="text-muted-foreground text-sm font-medium whitespace-nowrap bg-muted px-3 py-1 rounded">
                      {exp.start} - {exp.end}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-muted-foreground flex items-start leading-relaxed">
                          <span className="mr-3 text-primary font-bold mt-1">•</span>
                          <span className="flex-1">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="pl-4 border-l-2 border-primary/30">
                  <h3 className="font-bold text-foreground text-lg">{edu.degree}</h3>
                  <p className="text-primary font-semibold">{edu.institution}</p>
                  {edu.year && (
                    <p className="text-muted-foreground text-sm mt-1">
                      <span className="bg-muted px-2 py-0.5 rounded">{edu.year}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              Skills
            </h2>
            <div className="space-y-4">
              {data.skills.technical && data.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-primary">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30 hover:bg-primary/30 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft && data.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-accent">
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium border border-accent/30 hover:bg-accent/30 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.tools && data.skills.tools.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.tools.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-muted/80 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Suggested Skills Section */}
        {data.extra_skills_suggested && data.extra_skills_suggested.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              Recommended Skills
            </h2>
            <p className="text-sm text-muted-foreground mb-4 italic">
              Based on your profile, consider adding these skills to stand out
            </p>
            <div className="space-y-3">
              {data.extra_skills_suggested.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="text-muted-foreground font-medium">{skill.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${skill.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium w-10 text-right">
                      {Math.round(skill.confidence * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-5">
              {data.projects.map((project, index) => (
                <div key={index} className="pl-4 border-l-2 border-primary/30">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-foreground text-lg">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1 text-sm font-medium whitespace-nowrap"
                      >
                        View <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
})
