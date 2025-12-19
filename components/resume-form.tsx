"use client"

import type React from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import type { ResumeData } from "@/app/page"

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void
  isLoading: boolean
}

export const ResumeForm = memo(function ResumeForm({ onSubmit, isLoading }: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    current_title: "",
    summary_or_bio: "",
    education: "",
    work_experience: "",
    skills: "",
    projects: "",
    target_job: "",
    industry: "",
    language: "English",
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.name || !formData.target_job) {
        alert("Please fill in all required fields: Name and Target Job")
        return
      }
      onSubmit(formData)
    },
    [formData, onSubmit],
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3 animate-fade-in">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          Tip: The more detailed information you provide, the better our AI can optimize your resume for your target
          role.
        </p>
      </div>

      {/* Personal Information */}
      <div className="animate-fade-in animation-delay-100">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
          <Input
            name="current_title"
            placeholder="Current Job Title"
            value={formData.current_title}
            onChange={handleInputChange}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </div>
      </div>

      {/* Career Target */}
      <div className="animate-fade-in animation-delay-200">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Career Target</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            name="target_job"
            placeholder="Target Job Title *"
            value={formData.target_job}
            onChange={handleInputChange}
            required
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
          <Input
            name="industry"
            placeholder="Industry (e.g., Tech, Finance, Healthcare)"
            value={formData.industry}
            onChange={handleInputChange}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </div>
        <Textarea
          name="summary_or_bio"
          placeholder="Professional Summary or Bio (optional - AI will enhance this)"
          value={formData.summary_or_bio}
          onChange={handleInputChange}
          rows={3}
          className="bg-input border-border transition-all duration-200 focus:shadow-lg"
        />
      </div>

      {/* Work Experience */}
      <div className="animate-fade-in animation-delay-300">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Work Experience</h2>
        <Card className="p-4 border-l-4 border-l-primary bg-card/50 border-border hover:shadow-md transition-shadow duration-300">
          <Textarea
            name="work_experience"
            placeholder="Describe your work experience (e.g., Company name, job titles, dates, responsibilities, achievements). You can list multiple positions separated by line breaks."
            value={formData.work_experience}
            onChange={handleInputChange}
            rows={6}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </Card>
      </div>

      {/* Education */}
      <div className="animate-fade-in animation-delay-400">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Education</h2>
        <Card className="p-4 border-l-4 border-l-accent bg-card/50 border-border hover:shadow-md transition-shadow duration-300">
          <Textarea
            name="education"
            placeholder="Your education (e.g., University name, degree, field of study, graduation year). You can list multiple degrees separated by line breaks."
            value={formData.education}
            onChange={handleInputChange}
            rows={4}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </Card>
      </div>

      {/* Skills */}
      <div className="animate-fade-in animation-delay-500">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Skills</h2>
        <Card className="p-4 border-l-4 border-l-primary/60 bg-card/50 border-border hover:shadow-md transition-shadow duration-300">
          <Textarea
            name="skills"
            placeholder="List your skills (e.g., Python, JavaScript, Project Management, Leadership). Separate multiple skills with commas or line breaks."
            value={formData.skills}
            onChange={handleInputChange}
            rows={4}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </Card>
      </div>

      {/* Projects */}
      <div className="animate-fade-in animation-delay-600">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Projects & Achievements</h2>
        <Card className="p-4 border-l-4 border-l-accent/60 bg-card/50 border-border hover:shadow-md transition-shadow duration-300">
          <Textarea
            name="projects"
            placeholder="Notable projects or achievements (e.g., Project name, description, technologies used, impact). Separate multiple projects with line breaks."
            value={formData.projects}
            onChange={handleInputChange}
            rows={4}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
        </Card>
      </div>

      {/* Language */}
      <div className="animate-fade-in animation-delay-700">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Preferences</h2>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground transition-all duration-200 focus:shadow-lg"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 animate-fade-in animation-delay-800 hover:shadow-lg disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Resume...
          </span>
        ) : (
          "Generate Resume with AI"
        )}
      </Button>
    </form>
  )
})
