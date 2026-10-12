const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000'

export type ProfileData = {
  first_name?: string
  last_name?: string
  work_email?: string
  role?: string
  avatar_data?: string
}

export const api = {
  async getProfile(): Promise<ProfileData | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, '')}/auth/profile/`,
        {
          credentials: 'include',
        },
      )

      if (!response.ok) {
        const cached = localStorage.getItem('greenhill_profile')
        return cached ? JSON.parse(cached) : null
      }

      const data = await response.json()
      if (data) {
        localStorage.setItem('greenhill_profile', JSON.stringify(data))
      }
      return data
    } catch {
      const cached = localStorage.getItem('greenhill_profile')
      return cached ? JSON.parse(cached) : null
    }
  },

  async updateProfile(updates: Partial<ProfileData>): Promise<ProfileData> {
    const cached = localStorage.getItem('greenhill_profile')
    const current = cached ? JSON.parse(cached) : {}
    const merged = { ...current, ...updates }
    localStorage.setItem('greenhill_profile', JSON.stringify(merged))

    try {
      const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, '')}/auth/profile/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updates),
        },
      )

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('greenhill_profile', JSON.stringify(data))
        return data
      }
    } catch {
      // Fallback to locally cached updates
    }

    return merged
  },
}
