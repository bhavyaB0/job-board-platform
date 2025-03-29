"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import JobCard from "@/components/job-card"
import { mockJobs } from "@/lib/mock-data"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    salary: "",
    remote: false,
    featured: false,
  })

  // Filter jobs based on search term and filters
  const filteredJobs = mockJobs.filter((job) => {
    // Search term filter
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Job type filter
    if (filters.jobType && job.type !== filters.jobType) {
      return false
    }

    // Location filter
    if (filters.location && !job.location.includes(filters.location)) {
      return false
    }

    // Remote filter
    if (filters.remote && !job.location.toLowerCase().includes("remote")) {
      return false
    }

    // Featured filter
    if (filters.featured && !job.featured) {
      return false
    }

    return true
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Find Jobs</h1>
        <p className="text-muted-foreground">Browse through thousands of full-time and part-time jobs.</p>
      </div>

      {/* Search and Filters */}
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_3fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select value={filters.jobType} onValueChange={(value) => setFilters({ ...filters, jobType: value })}>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Select value={filters.salary} onValueChange={(value) => setFilters({ ...filters, salary: value })}>
                  <SelectTrigger id="salary">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Salaries</SelectItem>
                    <SelectItem value="0-50K">$0 - $50K</SelectItem>
                    <SelectItem value="50K-100K">$50K - $100K</SelectItem>
                    <SelectItem value="100K-150K">$100K - $150K</SelectItem>
                    <SelectItem value="150K+">$150K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={filters.remote}
                    onCheckedChange={(checked) => setFilters({ ...filters, remote: checked === true })}
                  />
                  <Label htmlFor="remote">Remote Only</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featured}
                    onCheckedChange={(checked) => setFilters({ ...filters, featured: checked === true })}
                  />
                  <Label htmlFor="featured">Featured Jobs</Label>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() =>
                  setFilters({
                    jobType: "",
                    location: "",
                    salary: "",
                    remote: false,
                    featured: false,
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs by title, company, or keywords..."
              className="w-full pl-8 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="text-sm text-muted-foreground">Showing {filteredJobs.length} jobs</div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setFilters({
                    jobType: "",
                    location: "",
                    salary: "",
                    remote: false,
                    featured: false,
                  })
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

