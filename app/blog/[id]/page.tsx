import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"

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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    return {
      title: "Post Not Found - ResumeAI",
    }
  }

  return {
    title: `${post.title} - ResumeAI Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">ResumeAI</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Builder
            </Link>
            <Link href="/blog" className="text-primary transition-colors text-sm font-semibold">
              Blog
            </Link>
            <Link href="#subscribe">
              <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 md:mb-8 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <span className="inline-block text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="p-6 md:p-10 bg-card/80 backdrop-blur-sm border-border mb-8 md:mb-12">
              <div className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-sm font-semibold text-foreground">Found this helpful? Share it:</p>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </Button>
                </div>
              </div>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm"
                    >
                      <div className="p-5">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full mb-3">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                        <Link href={`/blog/${relatedPost.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 p-0">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <Card className="mt-12 p-6 md:p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Ready to Build Your Resume?</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                Apply these insights to create a professional, ATS-friendly resume with our AI-powered builder.
              </p>
              <Link href="/builder">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Building Now
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  )
}
