"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Calendar, Globe, Briefcase } from "lucide-react"
import { mockCompanies } from "@/lib/mock-data"
import JobCard from "@/components/job-card"

export default function CompanyPage({ params }: { params: { id: string } }) {
  // Find the company by ID
  const company = mockCompanies.find((company) => company.id === params.id)

  // If company not found, return 404
  if (!company) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Company Header */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <div className="h-48 bg-muted flex items-center justify-center">
            <Building2 className="h-24 w-24 text-muted-foreground/50" />
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-muted-foreground flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {company.location}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {company.size}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Founded {company.founded}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Badge variant="outline">{company.industry}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Content */}
      <Tabs defaultValue="about">
        <TabsList className="mb-6">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="jobs">Open Positions ({company.jobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {company.description}

                {/* Extended description for demo purposes */}
                {`\n\nAt ${company.name}, we're committed to innovation and excellence in everything we do. Our team of talented professionals works together to create solutions that make a difference in the world.

We believe in fostering a collaborative and inclusive work environment where diverse perspectives are valued and everyone has the opportunity to grow and succeed.

Our core values:
• Innovation: We constantly seek new and better ways to solve problems
• Excellence: We strive for the highest quality in all our work
• Integrity: We act with honesty and transparency
• Collaboration: We believe the best results come from working together
• Customer Focus: We put our customers at the center of everything we do

Join our team and be part of something special!`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{company.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Company Size</h3>
                    <p className="text-sm text-muted-foreground">{company.size}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Founded</h3>
                    <p className="text-sm text-muted-foreground">{company.founded}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Competitive salary",
                  "Health insurance",
                  "Flexible work hours",
                  "Remote work options",
                  "Professional development",
                  "401(k) matching",
                  "Paid time off",
                  "Parental leave",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Open Positions at {company.name}</h2>
            <Button asChild>
              <Link href="/jobs">
                <Briefcase className="mr-2 h-4 w-4" />
                View All Jobs
              </Link>
            </Button>
          </div>

          {company.jobs.length > 0 ? (
            <div className="grid gap-6">
              {company.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No open positions at the moment.</p>
                <Button asChild>
                  <Link href="/jobs">Browse All Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

