import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Building2, MapPin } from "lucide-react"
import JobCard from "@/components/job-card"
import { mockJobs } from "@/lib/mock-data"

export default function Home() {
  // Display only featured jobs on the homepage
  const featuredJobs = mockJobs.slice(0, 6)

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find Your Dream Job Today
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Browse thousands of job listings from top companies and apply in minutes.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="w-full bg-background pl-8 rounded-lg border border-input"
                />
              </div>
              <Button className="w-full">Search Jobs</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Popular Job Categories</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore jobs by category and find the perfect role for your skills and experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Briefcase, name: "Technology", count: 1204 },
                { icon: Building2, name: "Marketing", count: 768 },
                { icon: MapPin, name: "Design", count: 492 },
                { icon: Briefcase, name: "Finance", count: 346 },
                { icon: Building2, name: "Healthcare", count: 621 },
                { icon: MapPin, name: "Education", count: 284 },
                { icon: Briefcase, name: "Sales", count: 578 },
                { icon: Building2, name: "Customer Service", count: 327 },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/jobs?category=${category.name.toLowerCase()}`}
                  className="flex flex-col items-center p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <category.icon className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Jobs</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover top opportunities from leading companies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Button asChild className="mt-8">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Companies Hiring</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join these industry-leading organizations and advance your career.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center p-4">
                  <div className="h-16 w-16 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xl font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to take the next step in your career?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Create an account to save jobs, get personalized recommendations, and apply with just one click.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent" asChild>
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

