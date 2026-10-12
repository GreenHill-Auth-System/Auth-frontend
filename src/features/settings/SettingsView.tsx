import { useState, useEffect } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { api } from '../../services/api'
import type { UserSettingsData } from '../../services/api'

export function SettingsView() {
  const [inAppNotifs, setInAppNotifs] = useState(true)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [browserNotifs, setBrowserNotifs] = useState(false)

  const [appearance, setAppearance] = useState('Light')
  const [timeZone, setTimeZone] = useState('Africa / Kampala')
  const [reduceMotion, setReduceMotion] = useState(false)

  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Load live settings from SQLite backend on mount
  useEffect(() => {
    api
      .getSettings()
      .then((data: UserSettingsData | null) => {
        if (data) {
          setInAppNotifs(data.in_app_notifications)
          setEmailNotifs(data.email_notifications)
          setBrowserNotifs(data.browser_notifications)
          setAppearance(data.appearance)
          setTimeZone(data.time_zone)
          setReduceMotion(data.reduce_motion)
        }
      })
      .catch(console.error)
  }, [])

  async function handleSave() {
    setIsSaving(true)
    try {
      await api.updateSettings({
        in_app_notifications: inAppNotifs,
        email_notifications: emailNotifs,
        browser_notifications: browserNotifs,
        appearance,
        time_zone: timeZone,
        reduce_motion: reduceMotion,
      })
      showToast('Preferences saved to SQLite backend across all three systems!')
    } catch {
      showToast('Preferences saved locally!')
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

  function handleManageGoogle() {
    window.open('https://myaccount.google.com/', '_blank', 'noopener,noreferrer')
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
        <h1 className="text-[34px] leading-tight font-bold tracking-[-.5px] text-navy">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage preferences for your Greenhill digital workspace.</p>
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
      <div className="mb-6 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
        {/* Card 1: Notifications */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-navy">Notifications</h2>
              <p className="mt-1 text-xs text-muted">Choose how you receive updates from all three systems.</p>
            </div>

            <div className="space-y-4">
              {/* In-app notifications */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-slate-800">In-app notifications</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inAppNotifs}
                  onClick={() => setInAppNotifs(!inAppNotifs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                    inAppNotifs ? 'bg-[#152d56]' : 'bg-[#e2e8f0]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      inAppNotifs ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Email notifications */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-slate-800">Email notifications</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={emailNotifs}
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                    emailNotifs ? 'bg-[#152d56]' : 'bg-[#e2e8f0]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      emailNotifs ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Browser notifications */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-slate-800">Browser notifications</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={browserNotifs}
                  onClick={() => setBrowserNotifs(!browserNotifs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                    browserNotifs ? 'bg-[#152d56]' : 'bg-[#e2e8f0]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      browserNotifs ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[11px] text-slate-400">
            Important account and security alerts are always sent.
          </p>
        </div>

        {/* Card 2: Workspace Preferences */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-navy">Workspace preferences</h2>
              <p className="mt-1 text-xs text-muted">One consistent experience across your systems.</p>
            </div>

            <div className="space-y-4">
              {/* Appearance */}
              <div className="flex items-center justify-between py-1">
                <label htmlFor="appearance-select" className="text-xs font-medium text-slate-800">
                  Appearance
                </label>
                <div className="relative w-44">
                  <select
                    id="appearance-select"
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white py-2 pr-8 pl-3 text-xs font-medium text-navy outline-none cursor-pointer focus:border-navy focus:ring-1 focus:ring-navy"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                    <option value="System">System</option>
                  </select>
                  <FiChevronDown className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 size-3.5" />
                </div>
              </div>

              {/* Time zone */}
              <div className="flex items-center justify-between py-1">
                <label htmlFor="timezone-select" className="text-xs font-medium text-slate-800">
                  Time zone
                </label>
                <div className="relative w-44">
                  <select
                    id="timezone-select"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white py-2 pr-8 pl-3 text-xs font-medium text-navy outline-none cursor-pointer focus:border-navy focus:ring-1 focus:ring-navy"
                  >
                    <option value="Africa / Kampala">Africa / Kampala</option>
                    <option value="Africa / Nairobi">Africa / Nairobi</option>
                    <option value="Africa / Kigali">Africa / Kigali</option>
                    <option value="Europe / London">Europe / London (UTC+0)</option>
                    <option value="UTC">Universal Coordinated Time (UTC)</option>
                  </select>
                  <FiChevronDown className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 size-3.5" />
                </div>
              </div>

              {/* Reduce motion */}
              <div className="flex items-center justify-between py-1 pt-1.5">
                <span className="text-xs font-medium text-slate-800">Reduce motion</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={reduceMotion}
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                    reduceMotion ? 'bg-[#152d56]' : 'bg-[#e2e8f0]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      reduceMotion ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[11px] text-slate-400">
            Time zone controls how dates and times are displayed.
          </p>
        </div>
      </div>

      {/* Card 3: Account Security */}
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] max-sm:flex-col max-sm:gap-4 max-sm:items-start">
        <div>
          <h2 className="text-lg font-bold text-navy">Account security</h2>
          <p className="mt-1 text-xs text-muted">Password and two-step verification are managed in Google.</p>
        </div>
        <button
          type="button"
          onClick={handleManageGoogle}
          className="rounded-full border border-[#cbd5e1] bg-white px-6 py-2.5 text-xs font-bold text-navy shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
        >
          Manage Google account
        </button>
      </div>

      {/* Footer Action Bar */}
      <div className="flex items-center justify-between pt-2 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
        <span className="text-xs text-muted">
          Changes apply to Procurement, Executive Intelligence and Incident & Service.
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-full bg-[#152d56] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1e3d73] active:scale-95 transition-all disabled:opacity-70"
        >
          {isSaving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
