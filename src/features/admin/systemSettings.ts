export type SystemSettings = {
  organization: string
  supportEmail: string
  timezone: string
  dateFormat: string
  syncFrequency: string
  importNewUsers: boolean
  suspendMissingUsers: boolean
  requireMfa: boolean
  sessionHours: string
  idleMinutes: string
  requireReauth: boolean
  temporaryDays: string
  reviewReminder: string
  newRequests: boolean
  failedSignIns: boolean
  expiringAccess: boolean
  weeklySummary: boolean
}

export const defaultSystemSettings: SystemSettings = {
  organization: 'GreenHill Schools', supportEmail: 'ict@greenhillschools.ug',
  timezone: 'Africa/Kampala', dateFormat: 'day-first', syncFrequency: '60',
  importNewUsers: true, suspendMissingUsers: true, requireMfa: true,
  sessionHours: '8', idleMinutes: '30', requireReauth: true,
  temporaryDays: '14', reviewReminder: '3',
  newRequests: true, failedSignIns: true, expiringAccess: true, weeklySummary: false,
}

const storageKey = 'greenhill_admin_settings_preview_v1'

export function loadSystemSettings(): SystemSettings {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (!stored || typeof stored !== 'object') return { ...defaultSystemSettings }
    const result = { ...defaultSystemSettings }
    for (const key of Object.keys(result) as (keyof SystemSettings)[]) {
      const value = (stored as Record<string, unknown>)[key]
      if (typeof value === typeof result[key]) Object.assign(result, { [key]: value })
    }
    return result
  } catch { return { ...defaultSystemSettings } }
}

export function saveSystemSettings(settings: SystemSettings) {
  localStorage.setItem(storageKey, JSON.stringify(settings))
}
