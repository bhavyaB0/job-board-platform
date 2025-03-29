import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Building2, Users, Search, Clock, Shield, Globe, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About JobBoard</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Connecting talented professionals with their dream careers and helping companies find the perfect candidates.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-24 border-t">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Our Mission</h2>
            <p className="text-muted-foreground md:text-lg">
              At JobBoard, our mission is to transform how people find jobs and how companies hire talent. We believe
              that the right job can change a person's life, and the right hire can transform a business.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg">
              We're building a platform that makes the job search and hiring process more efficient, transparent, and
              effective for everyone involved. By leveraging technology and human expertise, we're creating a better way
              to connect talent with opportunity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Briefcase className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-medium">10,000+</h3>
                <p className="text-sm text-muted-foreground">Jobs Posted</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Building2 className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-medium">5,000+</h3>
                <p className="text-sm text-muted-foreground">Companies</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Users className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-medium">1M+</h3>
                <p className="text-sm text-muted-foreground">Job Seekers</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Globe className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-medium">50+</h3>
                <p className="text-sm text-muted-foreground">Countries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 text-center">Why Choose JobBoard</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <Search className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Smart Job Matching</h3>
              <p className="text-muted-foreground">
                Our intelligent algorithm matches candidates with jobs based on skills, experience, and preferences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Clock className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Time-Saving Tools</h3>
              <p className="text-muted-foreground">
                Streamlined application process and powerful search filters save time for both job seekers and
                employers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Shield className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Verified Companies</h3>
              <p className="text-muted-foreground">
                We verify all employers on our platform to ensure a safe and legitimate job search experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Users className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Career Resources</h3>
              <p className="text-muted-foreground">
                Access to career advice, resume tips, interview preparation, and professional development resources.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 text-center">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Co-Founder",
              bio: "With over 15 years of experience in HR and recruitment, Sarah founded JobBoard to revolutionize the hiring process.",
            },
            {
              name: "Michael Chen",
              role: "CTO & Co-Founder",
              bio: "A tech veteran with a passion for creating intuitive user experiences and scalable platforms.",
            },
            {
              name: "David Rodriguez",
              role: "Head of Product",
              bio: "David leads our product team, ensuring JobBoard meets the evolving needs of job seekers and employers.",
            },
            {
              name: "Emily Williams",
              role: "Head of Marketing",
              bio: "Emily brings creative strategies to connect our platform with job seekers and companies worldwide.",
            },
            {
              name: "James Wilson",
              role: "Head of Customer Success",
              bio: "James ensures our users have the best possible experience with JobBoard's platform and services.",
            },
            {
              name: "Priya Patel",
              role: "Head of Engineering",
              bio: "Priya leads our engineering team, building robust and innovative solutions for the job market.",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 border-t">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Get in Touch</h2>
            <p className="text-muted-foreground md:text-lg mb-6">
              Have questions or feedback? We'd love to hear from you. Reach out to our team and we'll get back to you as
              soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span>contact@jobboard.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                <span>www.jobboard.com</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary" />
                <span>123 Recruitment Street, San Francisco, CA 94103</span>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Contact Us</h3>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                    placeholder="Your message"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 border-t text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Ready to Find Your Next Opportunity?</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
          Join thousands of job seekers and employers who trust JobBoard for their career and hiring needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

