export const ticketStatuses = ['New', 'In progress', 'Resolved'] as const
export type TicketStatus = typeof ticketStatuses[number]
export type SupportTicket = {
  id: string
  title: string
  name: string
  email: string
  workspace: string
  description: string
  status: TicketStatus
  received: string
  account: string
  role: string
  login: string
  assignee?: string
  note: string
}

export const statusStyles: Record<TicketStatus, string> = {
  New: 'bg-[#fff4ce] text-[#a57800]',
  'In progress': 'bg-[#eee8ff] text-[#8037c7]',
  Resolved: 'bg-[#e4f7f0] text-[#008e6b]',
}

// Illustrative directory requests. No backend calls or outgoing messages.
export const previewTickets: SupportTicket[] = [
  { id: 'GH-1042', title: 'Cannot access Procurement workspace', name: 'Sarah Namuli', email: 'sarah.namuli@greenhillschools.ug', workspace: 'Procurement Management System', description: 'I can sign in using Google, but the Procurement card does not appear on my workspace selection page.', status: 'New', received: '20 Oct 2026, 09:42', account: 'Active', role: 'No active role', login: 'Successful', note: '' },
  { id: 'GH-1041', title: 'Google sign-in redirects to login', name: 'David Kato', email: 'david.k@greenhillschools.ug', workspace: 'All workspaces', description: 'After choosing my Google account, I am redirected to the login page instead of the workspace selection page.', status: 'In progress', received: '20 Oct 2026, 08:16', account: 'Active', role: 'Assigned', login: 'Redirect reported', note: '' },
  { id: 'GH-1040', title: 'Account suspended unexpectedly', name: 'Grace Nsubuga', email: 'grace.n@greenhillschools.ug', workspace: 'Executive Intelligence Dashboard', description: 'My account shows as suspended and I cannot open the Executive Intelligence Dashboard.', status: 'New', received: '19 Oct 2026, 15:24', account: 'Suspended', role: 'Viewer', login: 'Blocked', note: '' },
  { id: 'GH-1039', title: 'Workspace card missing after login', name: 'Peter Okello', email: 'peter.o@greenhillschools.ug', workspace: 'Incident & Service Platform', description: 'I can sign in, but the Incident & Service workspace card is missing.', status: 'In progress', received: '19 Oct 2026, 11:05', account: 'Active', role: 'No active role', login: 'Successful', note: '' },
  { id: 'GH-1038', title: 'Cannot complete sign-in', name: 'Mary Atim', email: 'mary.a@greenhillschools.ug', workspace: 'All workspaces', description: 'Google sign-in could not be completed on my device.', status: 'Resolved', received: '17 Oct 2026, 10:32', account: 'Active', role: 'Assigned', login: 'Successful', note: 'Sign-in restored after clearing the expired browser session.' },
]

export function requestsCsv(tickets: SupportTicket[]): string {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
  return [
    ['Ticket ID', 'Issue', 'User', 'Email', 'Workspace', 'Status', 'Received', 'Assigned to', 'Resolution note'],
    ...tickets.map(ticket => [ticket.id, ticket.title, ticket.name, ticket.email, ticket.workspace, ticket.status, ticket.received, ticket.assignee ?? '', ticket.note]),
  ].map(row => row.map(escape).join(',')).join('\r\n')
}
