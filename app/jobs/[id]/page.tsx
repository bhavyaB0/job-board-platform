"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Share2,
  Bookmark,
  CheckCircle,
} from "lucide-react"
import { mockJobs } from "@/lib/mock-data"
import JobCard from "@/components/job-card"

export default function JobPage({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  // Find the job by ID
  const job = mockJobs.find((job) => job.id === params.id)

  // If job not found, return 404
  if (!job) {
    notFound()
  }

  // Get similar jobs (same tags, excluding current job)
  const similarJobs = mockJobs
    .filter((j) => j.id !== job.id && j.tags.some((tag) => job.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Job Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Link
                        href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline"
                      >
                        {job.company}
                      </Link>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Posted {job.postedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Job Type</span>
                  <span className="font-medium flex items-center mt-1">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.type}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Salary</span>
                  <span className="font-medium mt-1">${job.salary}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="font-medium mt-1">3+ years</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="font-medium mt-1">24 applicants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => setIsApplied(true)} disabled={isApplied}>
                  {isApplied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Applied Successfully
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
                {job.applicationUrl && (
                  <Button variant="outline" className="flex-1 gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Apply on Company Site
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="more">More Jobs</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6 pt-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="company" className="space-y-6 pt-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About {job.company}</h2>
                    <p className="text-muted-foreground">{job.companyDescription}</p>
                  </div>

                  {job.companyWebsite && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {job.companyWebsite}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>

                  <Button asChild>
                    <Link href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Company Profile
                    </Link>
                  </Button>
                </TabsContent>

                <TabsContent value="more" className="space-y-6 pt-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">More Jobs at {job.company}</h2>
                    <div className="grid gap-4">
                      {mockJobs
                        .filter((j) => j.company === job.company && j.id !== job.id)
                        .slice(0, 2)
                        .map((j) => (
                          <JobCard key={j.id} job={j} />
                        ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Application Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Application Deadline</h3>
                    <p className="text-sm text-muted-foreground">30 days from posting</p>
                  </div>
                </div>

                {job.applicationEmail && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Email Application</h3>
                      <a href={`mailto:${job.applicationEmail}`} className="text-sm text-primary hover:underline">
                        {job.applicationEmail}
                      </a>
                    </div>
                  </div>
                )}

                {job.applicationUrl && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Apply Online</h3>
                      <a
                        href={job.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit company website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>

              <div className="space-y-4">
                {similarJobs.map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">
                      <Link href={`/jobs/${job.id}`} className="hover:text-primary hover:underline">
                        {job.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building2 className="h-3 w-3 mr-1" />
                      {job.company}
                      <span className="mx-1">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.type}
                      <span className="mx-1">•</span>
                      <span>${job.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

