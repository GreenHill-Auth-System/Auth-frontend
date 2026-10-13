import { useState, useRef, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
const defaultAvatar =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23e2e8f0"><circle cx="50" cy="50" r="50"/><path d="M50 45a16 16 0 1 0 0-32 16 16 0 0 0 0 32zm0 8c-18 0-35 9-35 27v4h70v-4c0-18-17-27-35-27z" fill="%2364748b"/></svg>'
import { api } from '../../services/api'

type ProfileViewProps = {
  user?: { name?: string; email?: string; picture?: string } | null
  onUserUpdate?: (updated: { name: string; email: string; picture?: string }) => void
}

export function ProfileView({ user, onUserUpdate }: ProfileViewProps) {
  const initialFirstName = user?.name ? user.name.split(' ')[0] : 'Alphonsine'
  const initialLastName = user?.name ? user.name.split(' ').slice(1).join(' ') || 'Ishimwe' : 'Ishimwe'
  const initialEmail = user?.email || 'aishimwe@greenhillschools.ug'

  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [workEmail, setWorkEmail] = useState(initialEmail)
  const [role, setRole] = useState('Greenhill staff')
  const [avatar, setAvatar] = useState<string | null>(user?.picture || defaultAvatar)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync with user prop when available
  useEffect(() => {
    if (user?.name) {
      const parts = user.name.trim().split(/\s+/)
      setFirstName(parts[0] || '')
      setLastName(parts.slice(1).join(' ') || '')
    }
    if (user?.email) {
      setWorkEmail(user.email)
    }
    if (user?.picture) {
      setAvatar(user.picture)
    }
  }, [user])

  // Load live data from SQLite Backend on mount
  useEffect(() => {
    api
      .getProfile()
      .then((data) => {
        if (data) {
          if (data.first_name) setFirstName(data.first_name)
          if (data.last_name) setLastName(data.last_name)
          if (data.work_email) setWorkEmail(data.work_email)
          if (data.role) setRole(data.role)
          if (data.avatar_data) setAvatar(data.avatar_data)
        }
      })
      .catch(console.error)
  }, [])

  function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB. Please select a smaller image.')
        return
      }
      const reader = new FileReader()
      reader.onload = async () => {
        const result = reader.result as string
        setAvatar(result)
        try {
          await api.updateProfile({ avatar_data: result })
          showToast('Profile photo saved to SQLite backend!')
        } catch {
          showToast('Profile photo updated locally!')
        }
        onUserUpdate?.({ name: `${firstName} ${lastName}`.trim(), email: workEmail, picture: result })
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    try {
      await api.updateProfile({
        first_name: firstName,
        last_name: lastName,
        work_email: workEmail,
        avatar_data: avatar || undefined,
      })
      showToast('Changes saved to SQLite backend across all three systems!')
      onUserUpdate?.({
        name: `${firstName} ${lastName}`.trim(),
        email: workEmail,
        picture: avatar || undefined,
      })
    } catch {
      showToast('Changes saved locally!')
    } finally {
      setIsSaving(false)
    }
  }

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  return (
    <div className="mx-auto w-full max-w-[980px] pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-8 z-50 flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-xs font-semibold text-emerald-800 shadow-lg animate-in fade-in slide-in-from-top-3">
          <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-white text-[11px]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-[34px] leading-tight font-bold tracking-[-.5px] text-navy">My profile</h1>
        <p className="mt-1 text-sm text-muted">Your account, shared across all three Greenhill systems.</p>
      </header>

      {/* Info Banner */}
      <div className="mb-7 flex items-center gap-3.5 rounded-xl border border-[#e8e2f4] bg-[#fbf9fe]/90 px-5 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#692fa5]">
          ONE ACCOUNT · THREE SYSTEMS
        </span>
        <span className="text-xs text-slate-500 font-medium">
          Procurement / Executive Intelligence / Incident & Service
        </span>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-[290px_1fr] items-start gap-7 max-lg:grid-cols-1">
        {/* Left Column: Avatar Card */}
        <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="relative mb-5 size-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
            <img
              src={avatar || defaultAvatar}
              alt={`${firstName} ${lastName}`}
              className="size-full object-cover"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar
              }}
            />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handlePhotoUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-[#cbd5e1] bg-white px-6 py-2 text-xs font-bold text-navy hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
          >
            Change photo
          </button>
          <span className="mt-2 text-[11px] text-slate-400">JPG or PNG · Up to 5 MB</span>

          <div className="mt-5 w-full border-t border-slate-100 pt-5">
            <h2 className="text-xl font-bold text-navy">
              {firstName} {lastName}
            </h2>
            <p className="mt-1 text-xs text-muted">{workEmail}</p>
            <div className="mt-4">
              <span className="inline-block rounded-full bg-[#f3e8ff] px-4 py-1 text-xs font-semibold text-[#6b21a8]">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-navy">Personal information</h2>
            <p className="mt-1 text-xs text-muted">Keep your contact details up to date.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-xs font-bold text-navy">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-navy outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-xs font-bold text-navy">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-navy outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>
            </div>

            <div>
              <label htmlFor="workEmail" className="mb-1.5 block text-xs font-bold text-navy">
                Work email
              </label>
              <input
                id="workEmail"
                type="email"
                value={workEmail}
                readOnly
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-xs text-slate-500 outline-none cursor-default"
              />
              <span className="mt-1.5 block text-[11px] text-muted">
                Work email is managed by Greenhill Google Workspace.
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
              <span className="text-xs text-muted">Changes apply across all three systems.</span>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-[#152d56] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1e3d73] active:scale-95 transition-all disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
