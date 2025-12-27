"use client"

import type React from "react"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import type { ResumeData } from "@/app/page"

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void
  isLoading?: boolean
}

export const ResumeForm = memo(function ResumeForm({ onSubmit, isLoading = false }: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    current_title: "",
    summary_or_bio: "",
    target_job: "",
    industry: "",
    education: [],
    work_experience: [],
    skills: [],
    projects: [],
    language: "English",
    profilePicture: "",
  })

  const [educationInput, setEducationInput] = useState({ institution: "", degree: "", field: "", year: "", gpa: "" })
  const [experienceInput, setExperienceInput] = useState({
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: "",
  })
  const [skillInput, setSkillInput] = useState({ name: "", category: "Technical" })
  const [projectInput, setProjectInput] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    impact: "",
  })
  const [profilePicture, setProfilePicture] = useState<string>("")

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addEducation = useCallback(() => {
    if (educationInput.institution && educationInput.degree) {
      setFormData((prev) => ({
        ...prev,
        education: [...(Array.isArray(prev.education) ? prev.education : []), educationInput],
      }))
      setEducationInput({ institution: "", degree: "", field: "", year: "", gpa: "" })
    }
  }, [educationInput])

  const removeEducation = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: Array.isArray(prev.education) ? prev.education.filter((_, i) => i !== index) : [],
    }))
  }, [])

  const addExperience = useCallback(() => {
    if (experienceInput.company && experienceInput.title) {
      setFormData((prev) => ({
        ...prev,
        work_experience: [...(Array.isArray(prev.work_experience) ? prev.work_experience : []), experienceInput],
      }))
      setExperienceInput({
        company: "",
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: "",
      })
    }
  }, [experienceInput])

  const removeExperience = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      work_experience: Array.isArray(prev.work_experience) ? prev.work_experience.filter((_, i) => i !== index) : [],
    }))
  }, [])

  const addSkill = useCallback(() => {
    if (skillInput.name) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(Array.isArray(prev.skills) ? prev.skills : []), skillInput],
      }))
      setSkillInput({ name: "", category: "Technical" })
    }
  }, [skillInput])

  const removeSkill = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: Array.isArray(prev.skills) ? prev.skills.filter((_, i) => i !== index) : [],
    }))
  }, [])

  const addProject = useCallback(() => {
    if (projectInput.name && projectInput.description) {
      setFormData((prev) => ({
        ...prev,
        projects: [...(Array.isArray(prev.projects) ? prev.projects : []), projectInput],
      }))
      setProjectInput({ name: "", description: "", technologies: "", link: "", impact: "" })
    }
  }, [projectInput])

  const removeProject = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: Array.isArray(prev.projects) ? prev.projects.filter((_, i) => i !== index) : [],
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
      {/* Profile Picture Upload Section */}
      <div className="space-y-2">
        <label htmlFor="profilePicture" className="block text-sm font-semibold text-foreground">
          Profile Picture <span className="text-muted-foreground text-xs">(Optional)</span>
        </label>
        <div className="flex items-center gap-4">
          {profilePicture && (
            <div className="relative">
              <img
                src={profilePicture || "/placeholder.svg"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <button
                type="button"
                onClick={() => setProfilePicture("")}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-destructive/90"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex-1">
            <label
              htmlFor="profilePicture"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:bg-card/50 transition-colors"
            >
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{profilePicture ? "Change photo" : "Upload photo"}</span>
            </label>
            <input id="profilePicture" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        </div>
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
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="bg-input border-border transition-all duration-200 focus:shadow-lg"
          />
          <Input
            name="location"
            placeholder="City, State/Country"
            value={formData.location}
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
        {Array.isArray(formData.work_experience) &&
          formData.work_experience.map((exp, index) => (
            <Card key={index} className="p-4 mb-4 border-l-4 border-l-primary bg-card/50 border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground">
                  {exp.title} at {exp.company}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {exp.startDate} - {exp.endDate}
              </p>
              {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
            </Card>
          ))}

        <Card className="p-4 border-l-4 border-l-primary bg-card/50 border-border">
          <h3 className="font-semibold mb-3 text-foreground">Add Work Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="Company Name"
              value={experienceInput.company}
              onChange={(e) => setExperienceInput((prev) => ({ ...prev, company: e.target.value }))}
              className="bg-input border-border"
            />
            <Input
              placeholder="Job Title"
              value={experienceInput.title}
              onChange={(e) => setExperienceInput((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-input border-border"
            />
            <Input
              placeholder="Location"
              value={experienceInput.location}
              onChange={(e) => setExperienceInput((prev) => ({ ...prev, location: e.target.value }))}
              className="bg-input border-border"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Start Date (MM/YYYY)"
                value={experienceInput.startDate}
                onChange={(e) => setExperienceInput((prev) => ({ ...prev, startDate: e.target.value }))}
                className="bg-input border-border"
              />
              <Input
                placeholder="End Date (MM/YYYY)"
                value={experienceInput.endDate}
                onChange={(e) => setExperienceInput((prev) => ({ ...prev, endDate: e.target.value }))}
                className="bg-input border-border"
              />
            </div>
          </div>
          <Textarea
            placeholder="Job Description & Responsibilities"
            value={experienceInput.description}
            onChange={(e) => setExperienceInput((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="bg-input border-border mb-3"
          />
          <Textarea
            placeholder="Key Achievements & Accomplishments (one per line)"
            value={experienceInput.achievements}
            onChange={(e) => setExperienceInput((prev) => ({ ...prev, achievements: e.target.value }))}
            rows={2}
            className="bg-input border-border mb-3"
          />
          <Button type="button" onClick={addExperience} className="w-full gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </Card>
      </div>

      {/* Education */}
      <div className="animate-fade-in animation-delay-400">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Education</h2>
        {Array.isArray(formData.education) &&
          formData.education.map((edu, index) => (
            <Card key={index} className="p-4 mb-4 border-l-4 border-l-accent bg-card/50 border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground">{edu.degree}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-accent font-semibold">{edu.institution}</p>
              {edu.field && <p className="text-sm text-muted-foreground">{edu.field}</p>}
              {edu.year && <p className="text-sm text-muted-foreground">Graduated: {edu.year}</p>}
              {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
            </Card>
          ))}

        <Card className="p-4 border-l-4 border-l-accent bg-card/50 border-border">
          <h3 className="font-semibold mb-3 text-foreground">Add Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="Institution/University Name"
              value={educationInput.institution}
              onChange={(e) => setEducationInput((prev) => ({ ...prev, institution: e.target.value }))}
              className="bg-input border-border"
            />
            <Input
              placeholder="Degree (e.g., Bachelor, Master)"
              value={educationInput.degree}
              onChange={(e) => setEducationInput((prev) => ({ ...prev, degree: e.target.value }))}
              className="bg-input border-border"
            />
            <Input
              placeholder="Field of Study"
              value={educationInput.field}
              onChange={(e) => setEducationInput((prev) => ({ ...prev, field: e.target.value }))}
              className="bg-input border-border"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Graduation Year"
                value={educationInput.year}
                onChange={(e) => setEducationInput((prev) => ({ ...prev, year: e.target.value }))}
                className="bg-input border-border"
              />
              <Input
                placeholder="GPA (optional)"
                value={educationInput.gpa}
                onChange={(e) => setEducationInput((prev) => ({ ...prev, gpa: e.target.value }))}
                className="bg-input border-border"
              />
            </div>
          </div>
          <Button type="button" onClick={addEducation} className="w-full gap-2 bg-accent hover:bg-accent/90">
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </Card>
      </div>

      {/* Skills */}
      <div className="animate-fade-in animation-delay-500">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Skills</h2>
        <div className="mb-4 space-y-2">
          {Array.isArray(formData.skills) &&
            formData.skills.map((skill, index) => (
              <Card key={index} className="p-3 flex justify-between items-center bg-card/50 border-border">
                <div>
                  <p className="font-semibold text-foreground">{skill.name}</p>
                  <p className="text-xs text-muted-foreground">{skill.category}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
        </div>

        <Card className="p-4 border-l-4 border-l-primary/60 bg-card/50 border-border">
          <h3 className="font-semibold mb-3 text-foreground">Add Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="Skill Name (e.g., Python, Leadership)"
              value={skillInput.name}
              onChange={(e) => setSkillInput((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-input border-border"
            />
            <select
              value={skillInput.category}
              onChange={(e) => setSkillInput((prev) => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option>Technical</option>
              <option>Soft Skills</option>
              <option>Tools & Platforms</option>
              <option>Languages</option>
            </select>
          </div>
          <Button type="button" onClick={addSkill} className="w-full gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </Card>
      </div>

      {/* Projects */}
      <div className="animate-fade-in animation-delay-600">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Projects & Achievements</h2>
        {Array.isArray(formData.projects) &&
          formData.projects.map((project, index) => (
            <Card key={index} className="p-4 mb-4 border-l-4 border-l-accent/60 bg-card/50 border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground">{project.name}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {project.technologies && (
                <p className="text-xs text-muted-foreground mb-1">Tech: {project.technologies}</p>
              )}
              {project.impact && <p className="text-sm text-muted-foreground">{project.impact}</p>}
            </Card>
          ))}

        <Card className="p-4 border-l-4 border-l-accent/60 bg-card/50 border-border">
          <h3 className="font-semibold mb-3 text-foreground">Add Project</h3>
          <Input
            placeholder="Project Name"
            value={projectInput.name}
            onChange={(e) => setProjectInput((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-input border-border mb-3"
          />
          <Textarea
            placeholder="Project Description"
            value={projectInput.description}
            onChange={(e) => setProjectInput((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="bg-input border-border mb-3"
          />
          <Input
            placeholder="Technologies Used (comma-separated)"
            value={projectInput.technologies}
            onChange={(e) => setProjectInput((prev) => ({ ...prev, technologies: e.target.value }))}
            className="bg-input border-border mb-3"
          />
          <Input
            placeholder="Project Link (optional)"
            value={projectInput.link}
            onChange={(e) => setProjectInput((prev) => ({ ...prev, link: e.target.value }))}
            className="bg-input border-border mb-3"
          />
          <Textarea
            placeholder="Impact & Achievements"
            value={projectInput.impact}
            onChange={(e) => setProjectInput((prev) => ({ ...prev, impact: e.target.value }))}
            rows={2}
            className="bg-input border-border mb-3"
          />
          <Button type="button" onClick={addProject} className="w-full gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
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
