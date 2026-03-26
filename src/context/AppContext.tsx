'use client'

import { createContext, useContext, ReactNode } from 'react'

export type Article = {
  id: string
  title: string
  abstract: string
  doi: string
  published_at: string
  authors: string[]
  journal_title: string
  journal_slug: string
  volume?: string
  issue?: string
}

export type NewsItem = {
  date: string
  title: string
  href: string
}

export type SpecialIssue = {
  title: string
  journal: string
  deadline: string
  href: string
}

export type Subject = {
  id: string
  name: string
  slug: string
  icon_url?: string
}

export type Journal = {
  id: string
  title: string
  slug: string
  impact_factor?: number
}

export type AppData = {
  recentArticles: Article[]
  newsItems: NewsItem[]
  specialIssues: SpecialIssue[]
  subjects: Subject[]
  journals: Journal[]
}

const AppContext = createContext<AppData | undefined>(undefined)

export function AppProvider({ data, children }: { data: AppData; children: ReactNode }) {
  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppContext)
  // Return context if available, otherwise return undefined to allow graceful handling/fallbacks
  return context
}
