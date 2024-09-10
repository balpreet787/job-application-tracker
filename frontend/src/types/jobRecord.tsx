export type JobRecord = {
    date: Date
    title: string
    company: string
    status: string // "applied" | "pending" | "rejected" | "offered"
    id: string
  }