export async function POST(request: Request) {
  try {
    const { resumeData } = await request.json()

    if (!resumeData) {
      return Response.json({ error: "Resume data is required" }, { status: 400 })
    }

    // Generate HTML template for PDF
    const htmlTemplate = generateResumeHTML(resumeData)

    return Response.json({
      html: htmlTemplate,
      success: true,
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return Response.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateResumeHTML(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: white;
      padding: 40px;
    }
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
    }
    .header {
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      color: #1e293b;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .header .title {
      font-size: 18px;
      color: #3b82f6;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 13px;
      color: #64748b;
    }
    .contact-info span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 20px;
    }
    .summary {
      font-size: 14px;
      color: #475569;
      line-height: 1.8;
      text-align: justify;
    }
    .experience-item, .education-item, .project-item {
      margin-bottom: 25px;
      padding-left: 15px;
      border-left: 3px solid #3b82f6;
    }
    .experience-item h3, .project-item h3 {
      font-size: 17px;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .experience-item .company, .education-item .institution {
      font-size: 15px;
      color: #3b82f6;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .experience-item .meta {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 10px;
    }
    .experience-item .date-badge {
      display: inline-block;
      background: #f1f5f9;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      color: #475569;
      font-weight: 500;
      margin-top: 5px;
    }
    .experience-item ul {
      margin-top: 12px;
      padding-left: 20px;
    }
    .experience-item li {
      font-size: 14px;
      color: #475569;
      margin-bottom: 8px;
      line-height: 1.7;
    }
    .education-item h3 {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 5px;
    }
    .education-item .year {
      display: inline-block;
      background: #f1f5f9;
      padding: 3px 10px;
      border-radius: 10px;
      font-size: 12px;
      color: #475569;
      margin-top: 5px;
    }
    .skills-grid {
      margin-bottom: 20px;
    }
    .skills-category {
      margin-bottom: 18px;
    }
    .skills-category h4 {
      font-size: 14px;
      font-weight: 600;
      color: #3b82f6;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-tag {
      background: #eff6ff;
      color: #3b82f6;
      padding: 6px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid #bfdbfe;
    }
    .skill-tag.soft {
      background: #fef3c7;
      color: #d97706;
      border-color: #fde68a;
    }
    .skill-tag.tool {
      background: #f1f5f9;
      color: #64748b;
      border-color: #cbd5e1;
    }
    .suggested-skills {
      margin-top: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .suggested-skills h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 12px;
    }
    .suggested-skill-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      font-size: 13px;
      color: #475569;
    }
    .confidence-bar {
      width: 100px;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-left: 15px;
    }
    .confidence-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 3px;
    }
    .project-item .description {
      font-size: 14px;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 12px;
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .tech-tag {
      background: #eff6ff;
      color: #3b82f6;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    @media print {
      body {
        padding: 0;
      }
      .resume-container {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <!-- Header -->
    <div class="header">
      <h1>${data.header.name}</h1>
      <div class="title">${data.header.title}</div>
      <div class="contact-info">
        ${data.header.contact.email ? `<span>✉ ${data.header.contact.email}</span>` : ""}
        ${data.header.contact.phone ? `<span>☎ ${data.header.contact.phone}</span>` : ""}
        ${data.header.contact.location ? `<span>📍 ${data.header.contact.location}</span>` : ""}
        ${data.header.contact.linkedin ? `<span>🔗 ${data.header.contact.linkedin}</span>` : ""}
      </div>
    </div>

    <!-- Summary -->
    ${
      data.summary
        ? `
    <div class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary">${data.summary}</p>
    </div>
    `
        : ""
    }

    <!-- Experience -->
    ${
      data.experience && data.experience.length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Professional Experience</h2>
      ${data.experience
        .map(
          (exp: any) => `
        <div class="experience-item">
          <h3>${exp.title}</h3>
          <div class="company">${exp.company}</div>
          ${exp.location ? `<div class="meta">${exp.location}</div>` : ""}
          <span class="date-badge">${exp.start} - ${exp.end}</span>
          ${
            exp.bullets && exp.bullets.length > 0
              ? `
            <ul>
              ${exp.bullets.map((bullet: string) => `<li>${bullet}</li>`).join("")}
            </ul>
          `
              : ""
          }
        </div>
      `,
        )
        .join("")}
    </div>
    `
        : ""
    }

    <!-- Education -->
    ${
      data.education && data.education.length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Education</h2>
      ${data.education
        .map(
          (edu: any) => `
        <div class="education-item">
          <h3>${edu.degree}</h3>
          <div class="institution">${edu.institution}</div>
          ${edu.year ? `<span class="year">${edu.year}</span>` : ""}
        </div>
      `,
        )
        .join("")}
    </div>
    `
        : ""
    }

    <!-- Skills -->
    ${
      data.skills
        ? `
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">
        ${
          data.skills.technical && data.skills.technical.length > 0
            ? `
          <div class="skills-category">
            <h4>Technical Skills</h4>
            <div class="skill-tags">
              ${data.skills.technical.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }
        ${
          data.skills.soft && data.skills.soft.length > 0
            ? `
          <div class="skills-category">
            <h4>Soft Skills</h4>
            <div class="skill-tags">
              ${data.skills.soft.map((skill: string) => `<span class="skill-tag soft">${skill}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }
        ${
          data.skills.tools && data.skills.tools.length > 0
            ? `
          <div class="skills-category">
            <h4>Tools & Platforms</h4>
            <div class="skill-tags">
              ${data.skills.tools.map((skill: string) => `<span class="skill-tag tool">${skill}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }
      </div>
      
      ${
        data.extra_skills_suggested && data.extra_skills_suggested.length > 0
          ? `
        <div class="suggested-skills">
          <h4>Recommended Skills to Consider</h4>
          ${data.extra_skills_suggested
            .map(
              (skill: any) => `
            <div class="suggested-skill-item">
              <span>${skill.name}</span>
              <div style="display: flex; align-items: center;">
                <div class="confidence-bar">
                  <div class="confidence-fill" style="width: ${skill.confidence * 100}%"></div>
                </div>
                <span style="margin-left: 8px; font-size: 12px; color: #64748b;">${Math.round(skill.confidence * 100)}%</span>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }

    <!-- Projects -->
    ${
      data.projects && data.projects.length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      ${data.projects
        .map(
          (project: any) => `
        <div class="project-item">
          <h3>${project.name}</h3>
          <p class="description">${project.description}</p>
          ${
            project.tech_stack && project.tech_stack.length > 0
              ? `
            <div class="tech-stack">
              ${project.tech_stack.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
          `
              : ""
          }
        </div>
      `,
        )
        .join("")}
    </div>
    `
        : ""
    }
  </div>
</body>
</html>
  `
}
