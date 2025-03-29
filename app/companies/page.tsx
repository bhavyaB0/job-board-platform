"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, MapPin, Briefcase, ExternalLink } from "lucide-react"
import { mockCompanies } from "@/lib/mock-data"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string | null>(null)

  // Get unique industries from companies
  const industries = Array.from(new Set(mockCompanies.map((company) => company.industry)))

  // Filter companies based on search term and industry filter
  const filteredCompanies = mockCompanies.filter((company) => {
    // Search term filter
    if (
      searchTerm &&
      !company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !company.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Industry filter
    if (industryFilter && company.industry !== industryFilter) {
      return false
    }

    return true
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Companies</h1>
        <p className="text-muted-foreground">Discover top companies hiring now.</p>
      </div>

      {/* Search and Filters */}
      <div className="mt-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="w-full pl-8 rounded-lg border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={industryFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setIndustryFilter(null)}
            >
              All
            </Button>
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={industryFilter === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setIndustryFilter(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">Showing {filteredCompanies.length} companies</div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{company.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {company.location}
                        </div>
                      </div>
                      <Badge variant="outline">{company.industry}</Badge>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Briefcase className="mr-1 h-4 w-4" />
                        <span>{company.jobs.length} open positions</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No companies found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setIndustryFilter(null)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

