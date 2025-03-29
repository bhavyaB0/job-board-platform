import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Job } from "./types"

interface JobStore {
  savedJobs: Job[]
  addSavedJob: (job: Job) => void
  removeSavedJob: (jobId: string) => void
  isSaved: (jobId: string) => boolean

  appliedJobs: string[]
  addAppliedJob: (jobId: string) => void
  isApplied: (jobId: string) => boolean

  searchHistory: string[]
  addSearchTerm: (term: string) => void
  clearSearchHistory: () => void
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      // Saved jobs
      savedJobs: [],
      addSavedJob: (job) => {
        const { savedJobs } = get()
        if (!savedJobs.some((j) => j.id === job.id)) {
          set({ savedJobs: [...savedJobs, job] })
        }
      },
      removeSavedJob: (jobId) => {
        const { savedJobs } = get()
        set({ savedJobs: savedJobs.filter((job) => job.id !== jobId) })
      },
      isSaved: (jobId) => {
        return get().savedJobs.some((job) => job.id === jobId)
      },

      // Applied jobs
      appliedJobs: [],
      addAppliedJob: (jobId) => {
        const { appliedJobs } = get()
        if (!appliedJobs.includes(jobId)) {
          set({ appliedJobs: [...appliedJobs, jobId] })
        }
      },
      isApplied: (jobId) => {
        return get().appliedJobs.includes(jobId)
      },

      // Search history
      searchHistory: [],
      addSearchTerm: (term) => {
        if (!term.trim()) return

        const { searchHistory } = get()
        const newHistory = [term, ...searchHistory.filter((t) => t !== term)].slice(0, 5) // Keep only the 5 most recent searches

        set({ searchHistory: newHistory })
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "job-board-storage",
    },
  ),
)

