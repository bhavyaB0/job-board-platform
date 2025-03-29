import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Briefcase, Building2, Clock, MapPin } from "lucide-react"
import type { Job } from "@/lib/types"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            {job.featured && (
              <Badge variant="secondary" className="ml-2">
                Featured
              </Badge>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              {job.type}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {job.postedAt}
            </div>
            <div className="flex items-center">
              <Badge variant="outline" className="text-xs">
                ${job.salary}
              </Badge>
            </div>
          </div>
          <p className="mt-4 text-sm line-clamp-2">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0 border-t mt-6">
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-primary hover:underline">
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

