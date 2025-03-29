export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  postedAt: string
  tags: string[]
  featured: boolean
  companyDescription?: string
  companyWebsite?: string
  applicationUrl?: string
  applicationEmail?: string
}

export interface Company {
  id: string
  name: string
  logo?: string
  description: string
  website: string
  location: string
  industry: string
  size: string
  founded: string
  jobs: Job[]
}

export interface User {
  id: string
  name: string
  email: string
  role: "jobseeker" | "employer"
  savedJobs?: string[]
  applications?: string[]
  company?: Company
}

