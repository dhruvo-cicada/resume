const suggestSkillsForRole = (
  jobTitle: string,
  industry: string,
  existingSkills: string[],
): Array<{ name: string; confidence: number }> => {
  const skillDatabase: Record<string, Array<{ name: string; relevance: number }>> = {
    "software engineer": [
      { name: "System Design", relevance: 0.9 },
      { name: "GraphQL", relevance: 0.85 },
      { name: "Microservices", relevance: 0.88 },
      { name: "CI/CD", relevance: 0.82 },
      { name: "Cloud Architecture", relevance: 0.87 },
      { name: "Docker & Kubernetes", relevance: 0.86 },
      { name: "API Development", relevance: 0.89 },
    ],
    developer: [
      { name: "Git Workflow", relevance: 0.85 },
      { name: "REST APIs", relevance: 0.88 },
      { name: "Testing (Jest/Cypress)", relevance: 0.83 },
      { name: "Agile Methodologies", relevance: 0.8 },
      { name: "Code Review", relevance: 0.82 },
    ],
    "data scientist": [
      { name: "Machine Learning", relevance: 0.92 },
      { name: "Statistical Analysis", relevance: 0.9 },
      { name: "Data Visualization", relevance: 0.85 },
      { name: "Python/R", relevance: 0.93 },
      { name: "TensorFlow/PyTorch", relevance: 0.88 },
      { name: "SQL & NoSQL", relevance: 0.87 },
    ],
    "product manager": [
      { name: "Roadmap Planning", relevance: 0.88 },
      { name: "Stakeholder Management", relevance: 0.85 },
      { name: "Data-Driven Decisions", relevance: 0.83 },
      { name: "User Research", relevance: 0.86 },
      { name: "A/B Testing", relevance: 0.84 },
    ],
    designer: [
      { name: "Figma/Sketch", relevance: 0.9 },
      { name: "User Research", relevance: 0.87 },
      { name: "Prototyping", relevance: 0.85 },
      { name: "Design Systems", relevance: 0.84 },
      { name: "Responsive Design", relevance: 0.86 },
    ],
    "marketing manager": [
      { name: "Digital Marketing", relevance: 0.9 },
      { name: "SEO/SEM", relevance: 0.87 },
      { name: "Content Strategy", relevance: 0.85 },
      { name: "Analytics", relevance: 0.88 },
      { name: "Social Media Marketing", relevance: 0.84 },
    ],
    analyst: [
      { name: "Excel/Spreadsheets", relevance: 0.9 },
      { name: "SQL", relevance: 0.88 },
      { name: "Data Modeling", relevance: 0.85 },
      { name: "Business Intelligence", relevance: 0.87 },
      { name: "Tableau/Power BI", relevance: 0.86 },
    ],
  }

  const normalizedTitle = jobTitle.toLowerCase()
  let suggestions: Array<{ name: string; relevance: number }> = []

  // Find matching skills based on job title
  for (const [key, skills] of Object.entries(skillDatabase)) {
    if (normalizedTitle.includes(key)) {
      suggestions = [...suggestions, ...skills]
    }
  }

  // If no direct match, provide general professional skills
  if (suggestions.length === 0) {
    suggestions = [
      { name: "Communication", relevance: 0.85 },
      { name: "Problem Solving", relevance: 0.88 },
      { name: "Project Management", relevance: 0.82 },
      { name: "Leadership", relevance: 0.8 },
      { name: "Collaboration", relevance: 0.83 },
    ]
  }

  // Filter out skills the user already has
  const existingSkillsLower = existingSkills.map((s) => s.toLowerCase())
  suggestions = suggestions.filter((skill) => !existingSkillsLower.includes(skill.name.toLowerCase()))

  // Sort by relevance and return top 5
  return suggestions
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5)
    .map((skill) => ({
      name: skill.name,
      confidence: skill.relevance,
    }))
}

const generateEnhancedSummary = (formData: any, yearsOfExperience = 3) => {
  if (formData.summary_or_bio && formData.summary_or_bio.length > 50) {
    // User provided a good summary, enhance it slightly
    const targetJob = formData.target_job || "professional"
    return `${formData.summary_or_bio} Seeking opportunities to contribute as a ${targetJob}${formData.industry ? ` in the ${formData.industry} sector` : ""}.`
  }

  // Generate AI-powered summary based on user's information
  const name = formData.name || "Professional"
  const currentTitle = formData.current_title || "experienced professional"
  const targetJob = formData.target_job || "specialist"
  const industry = formData.industry || "relevant"

  // Extract key skills for summary
  const skills = formData.skills
    ? formData.skills
        .split(/[,\n]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s)
        .slice(0, 4)
    : []

  const skillsText = skills.length > 0 ? ` with expertise in ${skills.slice(0, 3).join(", ")}` : ""

  return `Results-driven ${currentTitle}${skillsText}, bringing ${yearsOfExperience}+ years of proven experience in ${industry} industry. Demonstrated success in delivering high-impact solutions and driving measurable business outcomes. Seeking to leverage technical expertise and collaborative approach as a ${targetJob} to contribute to organizational growth and innovation.`
}

const generateAchievements = (workExperience: string, targetJob: string): string[] => {
  const achievements: string[] = []

  if (!workExperience || workExperience.trim().length < 20) {
    // Generic achievements based on target job
    if (targetJob.toLowerCase().includes("engineer") || targetJob.toLowerCase().includes("developer")) {
      achievements.push(
        "Architected and deployed scalable solutions that improved system performance by 40%",
        "Collaborated with cross-functional teams to deliver critical features ahead of schedule",
        "Mentored junior team members and established best practices for code quality",
      )
    } else if (targetJob.toLowerCase().includes("manager")) {
      achievements.push(
        "Led team of professionals to exceed quarterly targets by 25%",
        "Implemented process improvements that reduced operational costs by 30%",
        "Built and maintained strategic partnerships with key stakeholders",
      )
    } else {
      achievements.push(
        "Consistently exceeded performance metrics and contributed to team success",
        "Implemented innovative solutions that improved efficiency and productivity",
        "Recognized for exceptional problem-solving and collaborative approach",
      )
    }
  } else {
    // Extract or enhance from user's experience
    const lines = workExperience.split("\n").filter((line) => line.trim())

    // Take user's bullets and enhance them if needed
    lines.slice(0, 5).forEach((line) => {
      if (line.length > 15) {
        // If line doesn't start with action verb, enhance it
        if (!/^(Led|Managed|Developed|Implemented|Designed|Created|Built|Achieved)/i.test(line)) {
          achievements.push(`Successfully ${line.charAt(0).toLowerCase()}${line.slice(1)}`)
        } else {
          achievements.push(line)
        }
      }
    })

    // Add at least 3 achievements
    if (achievements.length < 3) {
      achievements.push(
        "Delivered high-quality results while managing multiple priorities in fast-paced environment",
        "Collaborated with stakeholders to identify opportunities and implement effective solutions",
      )
    }
  }

  return achievements.slice(0, 5)
}

const generateResumeFromUserData = (formData: any) => {
  // Parse work experience into structured format
  const parseWorkExperience = (experienceText: string) => {
    if (!experienceText) {
      // Generate sample experience based on target job
      return [
        {
          company: "Professional Experience",
          title: formData.target_job || formData.current_title || "Professional",
          start: "2020",
          end: "Present",
          location: "United States",
          bullets: generateAchievements("", formData.target_job || ""),
        },
      ]
    }

    const lines = experienceText.split("\n").filter((line) => line.trim())
    const experiences = []

    // Enhanced parsing - look for company names, dates, etc.
    let currentExperience: any = null
    const bullets: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Check if line looks like a company/title (longer, no bullet points)
      if (trimmedLine.length > 0 && !trimmedLine.startsWith("-") && !trimmedLine.startsWith("•")) {
        // Save previous experience if exists
        if (currentExperience && bullets.length > 0) {
          currentExperience.bullets = [...bullets]
          experiences.push(currentExperience)
          bullets.length = 0
        }

        // Start new experience
        currentExperience = {
          company: trimmedLine.split(",")[0]?.trim() || trimmedLine,
          title: formData.current_title || formData.target_job || "Professional",
          start: "2020",
          end: "Present",
          location: "United States",
          bullets: [],
        }
      } else if (trimmedLine.length > 0) {
        // This is a bullet point
        bullets.push(trimmedLine.replace(/^[-•]\s*/, ""))
      }
    }

    // Add last experience
    if (currentExperience) {
      currentExperience.bullets =
        bullets.length > 0 ? bullets : generateAchievements(experienceText, formData.target_job || "")
      experiences.push(currentExperience)
    }

    // If no structured experiences found, create one
    if (experiences.length === 0 && lines.length > 0) {
      experiences.push({
        company: lines[0] || "Professional Experience",
        title: formData.current_title || formData.target_job || "Professional",
        start: "2020",
        end: "Present",
        location: "United States",
        bullets: generateAchievements(experienceText, formData.target_job || ""),
      })
    }

    return experiences
  }

  // Parse education into structured format
  const parseEducation = (educationText: string) => {
    if (!educationText) return []

    const lines = educationText.split("\n").filter((line) => line.trim())

    return lines.slice(0, 3).map((line) => {
      // Try to extract institution, degree, and year
      const parts = line.split(",").map((p) => p.trim())
      return {
        institution: parts[0] || "University",
        degree: parts[1] || "Bachelor's Degree",
        year: parts[2] || "2020",
      }
    })
  }

  // Parse skills into categories
  const parseSkills = (skillsText: string) => {
    if (!skillsText) return { technical: [], soft: [], tools: [] }

    const skillsList = skillsText
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter((s) => s)

    // Enhanced categorization logic
    const technical: string[] = []
    const soft: string[] = []
    const tools: string[] = []

    const softSkillKeywords = [
      "communication",
      "leadership",
      "management",
      "collaboration",
      "problem",
      "teamwork",
      "critical thinking",
      "adaptability",
      "time management",
    ]
    const toolKeywords = [
      "office",
      "excel",
      "powerpoint",
      "jira",
      "slack",
      "figma",
      "photoshop",
      "salesforce",
      "hubspot",
      "tableau",
    ]

    skillsList.forEach((skill) => {
      const lowerSkill = skill.toLowerCase()
      if (softSkillKeywords.some((keyword) => lowerSkill.includes(keyword))) {
        soft.push(skill)
      } else if (toolKeywords.some((keyword) => lowerSkill.includes(keyword))) {
        tools.push(skill)
      } else {
        technical.push(skill)
      }
    })

    // Add default soft skills if none provided
    if (soft.length === 0) {
      soft.push("Communication", "Problem Solving", "Team Collaboration")
    }

    return { technical: technical.slice(0, 10), soft: soft.slice(0, 5), tools: tools.slice(0, 5) }
  }

  // Parse projects
  const parseProjects = (projectsText: string) => {
    if (!projectsText) return []

    const lines = projectsText.split("\n").filter((line) => line.trim())
    const skills = formData.skills
      ? formData.skills
          .split(/[,\n]/)
          .map((s: string) => s.trim())
          .filter((s: string) => s)
      : []

    return lines.slice(0, 3).map((line) => ({
      name: line.split(":")[0]?.trim() || line.substring(0, 50),
      description: line.split(":")[1]?.trim() || line,
      tech_stack: skills.slice(0, 4),
      link: "",
    }))
  }

  const skills = parseSkills(formData.skills)

  return {
    header: {
      name: formData.name || "Professional",
      title: formData.target_job || formData.current_title || "Professional",
      contact: {
        email: formData.name ? `${formData.name.toLowerCase().replace(/\s+/g, ".")}@email.com` : "contact@email.com",
        phone: "+1 (555) 123-4567",
        location: formData.industry ? `${formData.industry} Professional` : "United States",
        linkedin: `linkedin.com/in/${formData.name ? formData.name.toLowerCase().replace(/\s+/g, "") : "profile"}`,
      },
    },
    summary: generateEnhancedSummary(formData, 3),
    experience: parseWorkExperience(formData.work_experience),
    education: parseEducation(formData.education),
    skills,
    projects: parseProjects(formData.projects),
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const resume = generateResumeFromUserData(formData)

    // Generate skill suggestions based on target job
    const allSkills = [
      ...(resume.skills?.technical || []),
      ...(resume.skills?.soft || []),
      ...(resume.skills?.tools || []),
    ]

    const extraSkillsSuggested = suggestSkillsForRole(
      formData.target_job || formData.current_title || "",
      formData.industry || "",
      allSkills,
    )

    // Add suggested skills to resume
    resume.extra_skills_suggested = extraSkillsSuggested

    return Response.json({
      resume,
      message: "Resume generated successfully with AI-powered enhancements!",
    })
  } catch (error: any) {
    console.error("Error processing request:", error?.message || error)
    return Response.json({ error: "Failed to generate resume. Please try again." }, { status: 500 })
  }
}
