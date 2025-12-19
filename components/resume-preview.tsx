"use client"

import type { GeneratedResume } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRef, useState, useCallback, memo } from "react"
import { Download, Edit2, Copy, Check, ExternalLink } from "lucide-react"

interface ResumePreviewProps {
  data: GeneratedResume
  onEdit: () => void
}

export const ResumePreview = memo(function ResumePreview({ data, onEdit }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const downloadPDF = useCallback(async () => {
    if (!resumeRef.current) return

    try {
      const html2pdf = (await import("html2pdf.js")).default
      const element = resumeRef.current
      const opt = {
        margin: 10,
        filename: `${data.header.name.replace(/\s+/g, "_")}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      }

      html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Failed to generate PDF:", error)
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
          className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-all duration-200 hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download PDF
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
        <Button
          onClick={onEdit}
          variant="outline"
          className="px-6 gap-2 border-border hover:bg-card bg-transparent transition-all duration-200 hover:shadow-lg"
        >
          <Edit2 className="w-4 h-4" />
          Edit Resume
        </Button>
      </div>

      {/* Resume Preview */}
      <Card className="p-12 bg-card text-foreground shadow-2xl border-border animate-fade-in" ref={resumeRef}>
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-primary pb-6">
          <h1 className="text-4xl font-bold text-foreground">{data.header.name}</h1>
          <p className="text-xl font-semibold text-primary mt-2">{data.header.title}</p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground mt-3 flex-wrap">
            {data.header.contact.email && <span>{data.header.contact.email}</span>}
            {data.header.contact.phone && <span>•</span>}
            {data.header.contact.phone && <span>{data.header.contact.phone}</span>}
            {data.header.contact.location && <span>•</span>}
            {data.header.contact.location && <span>{data.header.contact.location}</span>}
            {data.header.contact.linkedin && <span>•</span>}
            {data.header.contact.linkedin && <span>{data.header.contact.linkedin}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3 border-b border-border pb-2">Professional Summary</h2>
            <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index} className="hover:bg-muted/30 p-3 rounded transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      {exp.location && <p className="text-muted-foreground text-sm">{exp.location}</p>}
                    </div>
                    <span className="text-muted-foreground text-sm whitespace-nowrap ml-4">
                      {exp.start} - {exp.end}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1 ml-4">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-muted-foreground flex items-start">
                          <span className="mr-3 text-primary font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="hover:bg-muted/30 p-3 rounded transition-colors duration-200">
                  <h3 className="font-bold text-foreground">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  {edu.year && <p className="text-muted-foreground text-sm">{edu.year}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Skills</h2>
            <div className="space-y-4">
              {data.skills.technical && data.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Technical</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary/20 text-primary px-3 py-1 rounded text-sm font-medium border border-primary/30 hover:bg-primary/30 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft && data.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-accent/20 text-accent px-3 py-1 rounded text-sm font-medium border border-accent/30 hover:bg-accent/30 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.tools && data.skills.tools.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Tools & Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.tools.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-muted text-muted-foreground px-3 py-1 rounded text-sm font-medium border border-border hover:bg-muted/80 transition-colors duration-200"
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

        {/* Suggested Skills */}
        {data.extra_skills_suggested && data.extra_skills_suggested.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Recommended Skills</h2>
            <div className="space-y-2">
              {data.extra_skills_suggested.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="text-muted-foreground">{skill.name}</span>
                  <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${skill.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="hover:bg-muted/30 p-3 rounded transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-foreground">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 ml-2 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">{project.description}</p>
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech_stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors duration-200"
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
