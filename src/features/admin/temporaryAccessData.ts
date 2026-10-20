import type { Workspace } from './directoryData'

export type TemporaryGrant = {
  id: string
  name: string
  email: string
  workspace: Workspace
  role: string
  reason: string
  expires: string
  reviewed: boolean
  revoked: boolean
}

export function kampalaDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const value = (type: string) => parts.find(part => part.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}`
}

export function grantStatus(grant: TemporaryGrant, today: string): 'Active' | 'Expired' | 'Revoked' {
  return grant.revoked ? 'Revoked' : grant.expires < today ? 'Expired' : 'Active'
}

export function accessCounts(grants: TemporaryGrant[], today: string) {
  return {
    active: grants.filter(grant => grantStatus(grant, today) === 'Active').length,
    due: grants.filter(grant => !grant.revoked && !grant.reviewed).length,
    expired: grants.filter(grant => grantStatus(grant, today) === 'Expired').length,
  }
}

export function createPreviewGrants(): TemporaryGrant[] {
  const names = ['Sarah Nankya', 'David Kato', 'Carol Namusoke', 'Peter Ouma', 'Amina Nsubuga', 'Grace Nsubuga', 'Peter Okello', 'Mary Atim', 'Sarah Namuli', 'James Mugisha', 'Ruth Nakato', 'Paul Ssemanda', 'Esther Akello', 'Daniel Kintu', 'Jane Nambi', 'Joseph Ochieng', 'Faith Namutebi', 'Michael Ssewankambo']
  const today = kampalaDate()
  return names.map((name, index) => {
    const date = new Date(`${today}T12:00:00Z`)
    date.setUTCDate(date.getUTCDate() + (index < 4 ? index - 4 : index - 3))
    return {
      id: `TA-${1001 + index}`, name, email: `${name.toLowerCase().replaceAll(' ', '.')}@greenhillschools.ug`,
      workspace: index % 3 === 0 ? 'PMS' : index % 3 === 1 ? 'EID' : 'ISMP',
      role: index % 3 === 0 ? 'Evaluation Committee Member' : index % 3 === 1 ? 'Analyst' : 'Incident Reviewer',
      reason: index % 3 === 0 ? 'Term procurement evaluation committee' : index % 3 === 1 ? 'Quarterly reporting assignment' : 'Temporary incident review cover',
      expires: date.toISOString().slice(0, 10), reviewed: false, revoked: false,
    }
  })
}
