import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx"

export async function POST(request: Request) {
  try {
    const { resumeData } = await request.json()

    if (!resumeData) {
      return Response.json({ error: "Resume data is required" }, { status: 400 })
    }

    // Generate Word document
    const doc = generateWordDocument(resumeData)

    // Generate buffer
    const buffer = await Packer.toBuffer(doc)

    // Return the document as a downloadable file
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${resumeData.header.name.replace(/\s+/g, "_")}_Resume.docx"`,
      },
    })
  } catch (error) {
    console.error("DOCX generation error:", error)
    return Response.json({ error: "Failed to generate DOCX" }, { status: 500 })
  }
}

function generateWordDocument(data: any): Document {
  const children: Paragraph[] = []

  // Header - Name
  children.push(
    new Paragraph({
      text: data.header.name,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
  )

  // Header - Title
  children.push(
    new Paragraph({
      text: data.header.title,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      style: "Title",
    }),
  )

  // Contact Information
  const contactParts = []
  if (data.header.contact.email) contactParts.push(data.header.contact.email)
  if (data.header.contact.phone) contactParts.push(data.header.contact.phone)
  if (data.header.contact.location) contactParts.push(data.header.contact.location)
  if (data.header.contact.linkedin) contactParts.push(data.header.contact.linkedin)

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        text: contactParts.join(" | "),
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    )
  }

  // Professional Summary
  if (data.summary) {
    children.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        border: {
          bottom: {
            color: "3b82f6",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    )
    children.push(
      new Paragraph({
        text: data.summary,
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED,
      }),
    )
  }

  // Professional Experience
  if (data.experience && data.experience.length > 0) {
    children.push(
      new Paragraph({
        text: "PROFESSIONAL EXPERIENCE",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        border: {
          bottom: {
            color: "3b82f6",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    )

    data.experience.forEach((exp: any, index: number) => {
      // Job Title
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.title,
              bold: true,
              size: 24,
            }),
          ],
          spacing: { before: index > 0 ? 200 : 0, after: 50 },
        }),
      )

      // Company
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company,
              bold: true,
              color: "3b82f6",
            }),
          ],
          spacing: { after: 50 },
        }),
      )

      // Location and Date
      const metaParts = []
      if (exp.location) metaParts.push(exp.location)
      metaParts.push(`${exp.start} - ${exp.end}`)

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: metaParts.join(" | "),
              italics: true,
            }),
          ],
          spacing: { after: 100 },
        }),
      )

      // Bullets
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach((bullet: string) => {
          children.push(
            new Paragraph({
              text: bullet,
              bullet: {
                level: 0,
              },
              spacing: { after: 80 },
            }),
          )
        })
      }
    })
  }

  // Education
  if (data.education && data.education.length > 0) {
    children.push(
      new Paragraph({
        text: "EDUCATION",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        border: {
          bottom: {
            color: "3b82f6",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    )

    data.education.forEach((edu: any) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
            }),
          ],
          spacing: { after: 50 },
        }),
      )

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution,
              color: "3b82f6",
            }),
          ],
          spacing: { after: 50 },
        }),
      )

      if (edu.year) {
        children.push(
          new Paragraph({
            text: edu.year,
            spacing: { after: 150 },
          }),
        )
      }
    })
  }

  // Skills
  if (data.skills) {
    children.push(
      new Paragraph({
        text: "SKILLS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        border: {
          bottom: {
            color: "3b82f6",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    )

    if (data.skills.technical && data.skills.technical.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Technical Skills: ",
              bold: true,
              color: "3b82f6",
            }),
            new TextRun({
              text: data.skills.technical.join(", "),
            }),
          ],
          spacing: { after: 100 },
        }),
      )
    }

    if (data.skills.soft && data.skills.soft.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Soft Skills: ",
              bold: true,
              color: "3b82f6",
            }),
            new TextRun({
              text: data.skills.soft.join(", "),
            }),
          ],
          spacing: { after: 100 },
        }),
      )
    }

    if (data.skills.tools && data.skills.tools.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Tools & Platforms: ",
              bold: true,
              color: "3b82f6",
            }),
            new TextRun({
              text: data.skills.tools.join(", "),
            }),
          ],
          spacing: { after: 100 },
        }),
      )
    }

    // Suggested Skills
    if (data.extra_skills_suggested && data.extra_skills_suggested.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Recommended Skills to Consider: ",
              bold: true,
              italics: true,
            }),
            new TextRun({
              text: data.extra_skills_suggested
                .map((skill: any) => `${skill.name} (${Math.round(skill.confidence * 100)}%)`)
                .join(", "),
              italics: true,
            }),
          ],
          spacing: { after: 200 },
        }),
      )
    }
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    children.push(
      new Paragraph({
        text: "PROJECTS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        border: {
          bottom: {
            color: "3b82f6",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    )

    data.projects.forEach((project: any) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.name,
              bold: true,
            }),
          ],
          spacing: { after: 50 },
        }),
      )

      children.push(
        new Paragraph({
          text: project.description,
          spacing: { after: 80 },
        }),
      )

      if (project.tech_stack && project.tech_stack.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Technologies: ",
                bold: true,
              }),
              new TextRun({
                text: project.tech_stack.join(", "),
              }),
            ],
            spacing: { after: 150 },
          }),
        )
      }
    })
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  })
}
