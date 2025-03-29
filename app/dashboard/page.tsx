"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockJobs } from "@/lib/mock-data"
import JobCard from "@/components/job-card"

// Form schema for job posting
const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.string().min(1, { message: "Job type is required" }),
  salary: z.string().min(1, { message: "Salary range is required" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  requirements: z.string().min(20, { message: "Requirements must be at least 20 characters" }),
  responsibilities: z.string().min(20, { message: "Responsibilities must be at least 20 characters" }),
  applicationEmail: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  applicationUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  remote: z.boolean().default(false),
})

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [jobSubmitted, setJobSubmitted] = useState(false)

  // Mock company jobs
  const companyJobs = mockJobs.slice(0, 3)

  // Setup form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "TechCorp",
      location: "",
      type: "",
      salary: "",
      description: "",
      requirements: "",
      responsibilities: "",
      applicationEmail: "",
      applicationUrl: "",
      featured: false,
      remote: false,
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof jobFormSchema>) {
    console.log(values)
    setJobSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset()
      setJobSubmitted(false)
    }, 3000)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground">Manage your job listings and applications.</p>
      </div>

      <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        {/* My Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Active Job Listings</h2>
            <Button onClick={() => setActiveTab("post")}>Post New Job</Button>
          </div>

          {companyJobs.length > 0 ? (
            <div className="grid gap-6">
              {companyJobs.map((job) => (
                <div key={job.id} className="relative">
                  <JobCard job={job} />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">You don't have any active job listings.</p>
                <Button onClick={() => setActiveTab("post")}>Post Your First Job</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Post a Job Tab */}
        <TabsContent value="post" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post a New Job</CardTitle>
              <CardDescription>Fill out the form below to create a new job listing.</CardDescription>
            </CardHeader>
            <CardContent>
              {jobSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <svg
                      className="h-6 w-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Job Posted Successfully!</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Your job listing has been created and is now live.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company*</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. San Francisco, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salary Range*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 100K - 130K" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-end space-x-4">
                        <FormField
                          control={form.control}
                          name="remote"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Remote Position</FormLabel>
                                <FormDescription>This job can be done remotely</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Featured Job</FormLabel>
                                <FormDescription>Highlight this job in search results</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the role, responsibilities, and ideal candidate"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requirements*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List the skills, experience, and qualifications required"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Enter each requirement on a new line</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsibilities*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List the key responsibilities for this role"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Enter each responsibility on a new line</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="applicationEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Application Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="e.g. careers@company.com" {...field} />
                            </FormControl>
                            <FormDescription>Email where applications will be sent</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="applicationUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Application URL</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. https://company.com/careers/job" {...field} />
                            </FormControl>
                            <FormDescription>External URL where candidates can apply</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                      </Button>
                      <Button type="submit">Post Job</Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
              <CardDescription>View and manage applications for your job listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b p-4 font-medium">
                  <div>Applicant</div>
                  <div>Job</div>
                  <div>Applied</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="grid grid-cols-5 items-center p-4 hover:bg-muted/50">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm">Senior Frontend Developer</div>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                        Review
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 3 of 3 applications</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

