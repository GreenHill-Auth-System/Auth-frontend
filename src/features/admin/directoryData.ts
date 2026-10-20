export const workspaceOptions = ['PMS', 'EID', 'ISMP'] as const
export type Workspace = typeof workspaceOptions[number]
export type DirectoryUser = {
  id: number
  name: string
  email: string
  roles: Partial<Record<Workspace, string>>
  status: 'Active' | 'Suspended'
  avatar: string
}

export const previewUsers: DirectoryUser[] = [
  { id: 1, name: 'Sarah Nankya', email: 'sarah.n@greenhillschools.ug', roles: { PMS: 'Procurement Officer', ISMP: 'Incident Reviewer' }, status: 'Active', avatar: 'bg-[#e9def9]' },
  { id: 2, name: 'David Kato', email: 'david.k@greenhillschools.ug', roles: { PMS: 'Approver', EID: 'Viewer', ISMP: 'Service Agent' }, status: 'Active', avatar: 'bg-[#dfe9fd]' },
  { id: 3, name: 'Carol Namusoke', email: 'carol.n@greenhillschools.ug', roles: { EID: 'Viewer' }, status: 'Active', avatar: 'bg-[#fce9d5]' },
  { id: 4, name: 'Peter Ouma', email: 'peter.o@greenhillschools.ug', roles: { PMS: 'Procurement Officer' }, status: 'Suspended', avatar: 'bg-[#e0f2ea]' },
  { id: 5, name: 'Amina Nsubuga', email: 'amina.n@greenhillschools.ug', roles: {}, status: 'Active', avatar: 'bg-[#f0e3fa]' },
]

// Role choices are frontend examples pending the final permission model.
export const workspaceDetails = {
  PMS: { name: 'Procurement Management System', roles: ['Procurement Officer', 'Approver', 'Viewer', 'Administrator'] },
  EID: { name: 'Executive Intelligence Dashboard', roles: ['Viewer', 'Analyst', 'Administrator'] },
  ISMP: { name: 'Incident & Service Platform', roles: ['Incident Reviewer', 'Service Agent', 'Viewer', 'Administrator'] },
} satisfies Record<Workspace, { name: string; roles: string[] }>

export function assignedWorkspaces(user: DirectoryUser): Workspace[] {
  return workspaceOptions.filter(workspace => Boolean(user.roles[workspace]))
}

export function updateWorkspaceRole(user: DirectoryUser, workspace: Workspace, role: string): DirectoryUser {
  const roles = { ...user.roles }
  if (role) roles[workspace] = role
  else delete roles[workspace]
  return { ...user, roles }
}
