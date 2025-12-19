import { generateText } from "ai"

// Mock resume data for demo purposes
const getMockResume = (formData: any) => ({
  header: {
    name: formData.name || "Alex Johnson",
    title: formData.current_title || "Senior Software Engineer",
    contact: {
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
    },
  },
  summary:
    "Results-driven software engineer with 8+ years of experience building scalable web applications and leading cross-functional teams. Proven expertise in full-stack development, cloud architecture, and agile methodologies. Passionate about mentoring junior developers and driving technical excellence.",
  experience: [
    {
      company: "Tech Innovations Inc.",
      title: "Senior Software Engineer",
      start: "2021",
      end: "Present",
      location: "San Francisco, CA",
      bullets: [
        "Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%",
        "Mentored team of 5 junior engineers, conducting code reviews and technical training sessions",
        "Implemented CI/CD pipeline using GitHub Actions and Docker, reducing deployment time from 2 hours to 15 minutes",
        "Architected real-time data processing system using Apache Kafka, handling 100K+ events per second",
      ],
    },
    {
      company: "Digital Solutions Ltd.",
      title: "Full Stack Developer",
      start: "2018",
      end: "2021",
      location: "New York, NY",
      bullets: [
        "Developed and maintained 15+ production web applications using React, Node.js, and PostgreSQL",
        "Optimized database queries and implemented caching strategies, improving application performance by 35%",
        "Collaborated with product and design teams to deliver features on schedule, maintaining 98% on-time delivery",
        "Established coding standards and best practices, reducing bug reports by 25%",
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      year: "2016",
    },
    {
      institution: "Coursera",
      degree: "AWS Solutions Architect Professional Certification",
      year: "2022",
    },
  ],
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Project Management"],
    tools: ["Git", "GitHub", "Jira", "VS Code", "Figma", "Postman", "Jenkins"],
  },
  extra_skills_suggested: [
    { name: "GraphQL", confidence: 0.85 },
    { name: "Machine Learning Basics", confidence: 0.72 },
    { name: "Terraform", confidence: 0.78 },
  ],
  projects: [
    {
      name: "Real-time Analytics Dashboard",
      description:
        "Built a comprehensive analytics platform for tracking user behavior and system metrics in real-time",
      tech_stack: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis"],
      link: "github.com/alexjohnson/analytics-dashboard",
    },
    {
      name: "Open Source CLI Tool",
      description: "Created and maintained a popular command-line tool for developers with 5K+ GitHub stars",
      tech_stack: ["TypeScript", "Node.js", "Commander.js"],
      link: "github.com/alexjohnson/dev-cli",
    },
  ],
})

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const prompt = `You are an expert career consultant and professional resume writer.
You create modern, ATS-friendly, and visually appealing resumes and CVs based on minimal user input.
Always return a JSON object with clean data that can be used directly by a web app to render a resume.

Here is the user's information for CV generation:

{
  "name": "${formData.name}",
  "title": "${formData.current_title}",
  "summary_or_bio": "${formData.summary_or_bio}",
  "education": "${formData.education}",
  "experience": "${formData.work_experience}",
  "skills": "${formData.skills}",
  "projects": "${formData.projects}",
  "target_job": "${formData.target_job}",
  "industry": "${formData.industry}",
  "language": "${formData.language}"
}

Now, generate a complete resume JSON with the following structure:

{
  "header": {
    "name": "",
    "title": "",
    "contact": {
      "email": "",
      "phone": "",
      "location": "",
      "linkedin": ""
    }
  },
  "summary": "",
  "experience": [
    {
      "company": "",
      "title": "",
      "start": "",
      "end": "",
      "location": "",
      "bullets": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "year": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": [],
    "tools": []
  },
  "extra_skills_suggested": [
    { "name": "", "confidence": 0.8 }
  ],
  "projects": [
    { "name": "", "description": "", "tech_stack": [], "link": "" }
  ]
}

### Rules:
- Output **only** valid JSON.
- Infer realistic and industry-appropriate details when fields are missing.
- Keep the language natural, short, and professional.
- Include 3–5 concise bullet points per experience item.
- Group skills logically (technical / soft / tools).
- Keep formatting consistent.

Return ONLY valid JSON. No explanations, no text outside the JSON.`

    let resume
    let isDemo = false

    try {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        prompt,
        temperature: 0.7,
      })

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Invalid JSON response from AI")
      }

      resume = JSON.parse(jsonMatch[0])
    } catch (aiError: any) {
      console.log("[v0] AI generation failed, using demo mode:", aiError?.message || aiError)
      resume = getMockResume(formData)
      isDemo = true
    }

    return Response.json({
      resume,
      ...(isDemo && {
        demo: true,
        message: "Demo mode active. Add a credit card to your Vercel account to unlock AI-powered resume generation.",
      }),
    })
  } catch (error: any) {
    console.error("[v0] Error processing request:", error?.message || error)
    return Response.json({ error: "Failed to generate resume. Please try again." }, { status: 500 })
  }
}
