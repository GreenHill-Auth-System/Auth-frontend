export type WorkspaceId = 'procurement' | 'executive' | 'service'

export type Workspace = {
  id: WorkspaceId
  title: string
  description: string
  accent: string
  background: string
  arrow: string
}

// Keep workspace content and visual accents together, outside the page layout.
export const workspaces: Workspace[] = [
  {
    id: 'procurement',
    title: 'Procurement Management System',
    description: 'Purchasing, vendors & approvals.',
    accent: 'bg-[#f8c731]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#fff4cf)]',
    arrow: 'bg-[#183b69]',
  },
  {
    id: 'executive',
    title: 'Executive Intelligence Dashboard',
    description: 'Performance, KPIs & insights.',
    accent: 'bg-[#7832ae]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#f3f0ff)]',
    arrow: 'bg-[#7832ae]',
  },
  {
    id: 'service',
    title: 'Incident & Service Management Platform',
    description: 'Requests, incidents & support.',
    accent: 'bg-[#a469c5]',
    background: 'bg-[linear-gradient(135deg,#fff_30%,#f4eafa)]',
    arrow: 'bg-[#183b69]',
  },
]
