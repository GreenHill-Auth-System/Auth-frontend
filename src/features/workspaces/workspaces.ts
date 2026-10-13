export type WorkspaceId = 'procurement' | 'executive' | 'service'

export type Workspace = {
  id: WorkspaceId
  title: string
  description: string
  accent: string
  background: string
  arrow: string
  mobileAccent: string
  iconBackground: string
}

// Keep workspace content and visual accents together, outside the page layout.
export const workspaces: Workspace[] = [
  {
    id: 'procurement',
    title: 'Procurement Management System',
    description: 'Purchasing, vendors & approvals.',
    accent: 'bg-[#f8c731]',
    mobileAccent: 'max-sm:bg-[#f8c731]',
    iconBackground: 'max-sm:bg-[#fff5d9]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#fff4cf)]',
    arrow: 'bg-[#183b69]',
  },
  {
    id: 'executive',
    title: 'Executive Intelligence Dashboard',
    description: 'Performance, KPIs & insights.',
    accent: 'bg-[#7832ae]',
    mobileAccent: 'max-sm:bg-[#7832ae]',
    iconBackground: 'max-sm:bg-[#f1e8ff]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#f3f0ff)]',
    arrow: 'bg-[#7832ae]',
  },
  {
    id: 'service',
    title: 'Incident & Service Management Platform',
    description: 'Requests, incidents & support.',
    accent: 'bg-[#a469c5]',
    mobileAccent: 'max-sm:bg-[#2874ee]',
    iconBackground: 'max-sm:bg-[#e5f2ff]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#f4eafa)] max-sm:bg-[linear-gradient(135deg,#fff_30%,#e3f0ff)]',
    arrow: 'bg-[#183b69]',
  },
]

