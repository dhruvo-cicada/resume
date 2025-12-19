import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Calendar, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 ATS-Friendly Resume Tips That Actually Work",
    excerpt:
      "Learn the proven strategies to make your resume pass through Applicant Tracking Systems and land more interviews.",
    content: `Applicant Tracking Systems (ATS) are used by 99% of Fortune 500 companies to screen resumes. Here are 10 proven tips to ensure your resume gets through:

1. Use standard fonts like Arial, Calibri, or Times New Roman
2. Avoid graphics, images, and complex formatting
3. Use standard section headings like "Experience" and "Education"
4. Include relevant keywords from the job description
5. Use bullet points instead of paragraphs
6. Keep it to one page if you have less than 5 years of experience
7. Use standard date formats (MM/YYYY)
8. Avoid tables and text boxes
9. Save as PDF or Word document
10. Test your resume with an ATS checker before submitting

By following these guidelines, you'll significantly increase your chances of getting past the initial screening process.`,
    author: "Sarah Chen",
    date: "2025-01-15",
    category: "Resume Tips",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Tailor Your Resume for Each Job Application",
    excerpt: "Discover why generic resumes don't work and how to customize yours for maximum impact.",
    content: `Sending the same resume to every job application is a missed opportunity. Here's why tailoring matters and how to do it effectively:

Why Tailor Your Resume?
- Recruiters spend an average of 6 seconds reviewing a resume
- Tailored resumes are 40% more likely to get an interview
- Keywords from the job description help pass ATS screening

How to Tailor Your Resume:
1. Read the job description carefully
2. Identify key skills and requirements
3. Reorder your experience to highlight relevant roles
4. Use the same language and keywords from the job posting
5. Adjust your professional summary to match the role
6. Highlight achievements that align with the position

Pro Tips:
- Create a master resume with all your experiences
- Use it as a template to create tailored versions
- Focus on impact and results, not just duties
- Keep the tailoring process to 15-20 minutes per application

Remember, quality over quantity. One tailored application is worth more than ten generic ones.`,
    author: "Michael Rodriguez",
    date: "2025-01-10",
    category: "Career Advice",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "The Power of Action Verbs in Your Resume",
    excerpt: "Transform your resume from passive to powerful with the right action verbs.",
    content: `Action verbs are the secret weapon of high-impact resumes. They transform passive descriptions into compelling achievements.

Why Action Verbs Matter:
- They grab attention immediately
- They convey confidence and competence
- They help your resume stand out from competitors
- They improve ATS keyword matching

Top Action Verbs by Category:

Leadership:
- Directed, Managed, Oversaw, Spearheaded, Championed

Achievement:
- Accomplished, Exceeded, Surpassed, Delivered, Achieved

Problem-Solving:
- Resolved, Troubleshot, Optimized, Streamlined, Enhanced

Communication:
- Presented, Articulated, Negotiated, Collaborated, Facilitated

Examples:
Instead of: "Responsible for managing social media accounts"
Write: "Spearheaded social media strategy, increasing engagement by 150%"

Instead of: "Worked on improving customer satisfaction"
Write: "Implemented customer feedback system, boosting satisfaction scores by 35%"

The key is to pair action verbs with quantifiable results. This combination creates a powerful narrative of your professional impact.`,
    author: "Emily Watson",
    date: "2025-01-05",
    category: "Resume Tips",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Career Transition: How to Position Yourself for a New Industry",
    excerpt: "Making a career change? Learn how to reframe your experience to appeal to new employers.",
    content: `Career transitions can be challenging, but with the right resume strategy, you can successfully pivot to a new industry.

Understanding the Challenge:
- Employers worry about your commitment to the new field
- Your experience may seem irrelevant at first glance
- You're competing with industry veterans

Strategies for Success:

1. Highlight Transferable Skills
- Leadership, project management, communication
- Problem-solving, analytical thinking, creativity
- These skills are valuable in any industry

2. Reframe Your Experience
- Focus on outcomes, not just job titles
- Use industry-specific language from your target field
- Show how your background brings unique value

3. Address the Transition
- Include a strong professional summary explaining your move
- Mention relevant certifications or courses
- Show genuine interest in the new field

4. Build Credibility
- Include volunteer work in the new industry
- Highlight any side projects or freelance work
- Mention industry-specific skills you've developed

5. Network Strategically
- Connect with people in your target industry
- Attend industry events and conferences
- Seek informational interviews

Remember, your unique background is an asset, not a liability. Frame it as bringing fresh perspectives to the new industry.`,
    author: "David Park",
    date: "2024-12-28",
    category: "Career Advice",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Resume Formatting: Modern vs. Traditional - Which Should You Choose?",
    excerpt: "Explore the pros and cons of different resume formats and find the best one for your career.",
    content: `The resume format you choose can significantly impact how your qualifications are perceived. Let's explore the main options:

Chronological Format:
Pros:
- Shows clear career progression
- Easy for recruiters to follow
- Best for traditional industries

Cons:
- Highlights employment gaps
- May not showcase skills effectively
- Can seem outdated

Functional Format:
Pros:
- Emphasizes skills over experience
- Great for career changers
- Hides employment gaps

Cons:
- Some recruiters distrust it
- May not pass ATS screening well
- Less common in traditional fields

Combination Format:
Pros:
- Balances skills and experience
- Shows both growth and capabilities
- Increasingly popular

Cons:
- Can be longer
- Requires careful organization
- May confuse some recruiters

Hybrid/Modern Format:
Pros:
- Contemporary and visually appealing
- Showcases personality
- Great for creative fields

Cons:
- May not pass ATS screening
- Can be harder to read
- Not suitable for conservative industries

Recommendation:
For most job seekers, a combination format works best. It shows your career progression while highlighting relevant skills. Always ensure it's ATS-friendly and easy to read.`,
    author: "Jessica Martinez",
    date: "2024-12-20",
    category: "Resume Tips",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "The Ultimate Guide to LinkedIn and Resume Alignment",
    excerpt: "Keep your LinkedIn profile and resume in sync to create a cohesive professional brand.",
    content: `Recruiters often cross-reference your resume with your LinkedIn profile. Here's how to keep them aligned:

Why Alignment Matters:
- Inconsistencies raise red flags
- Recruiters verify information
- Your professional brand should be consistent
- It increases credibility and trust

Key Areas to Align:

1. Contact Information
- Ensure email and phone are current
- Use the same professional email on both
- Keep location information consistent

2. Job Titles and Dates
- Match exactly between resume and LinkedIn
- Use the same date format
- Include the same companies

3. Professional Summary
- LinkedIn headline should complement resume summary
- Use similar language and keywords
- Highlight the same key achievements

4. Experience Descriptions
- Use similar bullet points
- Maintain consistent tone
- Highlight the same accomplishments

5. Skills Section
- List the same core skills
- Prioritize skills similarly
- Keep the order consistent

6. Education
- Match degrees and institutions
- Use the same graduation dates
- Include the same certifications

Pro Tips:
- Update both simultaneously when making changes
- Use your resume as the source of truth
- Add more detail to LinkedIn (it allows more space)
- Keep your LinkedIn profile current even when not job hunting

A cohesive professional brand across platforms makes you more memorable and trustworthy to potential employers.`,
    author: "Alex Thompson",
    date: "2024-12-15",
    category: "Career Advice",
    readTime: "6 min read",
  },
]

export const metadata = {
  title: "Blog - ResumeAI",
  description: "Read expert tips and career advice to land your dream job.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ResumeAI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Builder
            </a>
            <a href="/blog" className="text-primary transition-colors text-sm font-semibold">
              Blog
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Pricing
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              About
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Career Insights & Tips</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">Resume & Career Blog</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert advice, tips, and strategies to help you create a standout resume and advance your career.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Build Your Resume?</h3>
              <p className="text-muted-foreground mb-6">
                Apply these insights to create a professional, ATS-friendly resume with our AI-powered builder.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Building Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
