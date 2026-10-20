import { useState, type ReactNode } from 'react'
import { FiBell, FiCheck, FiGlobe, FiGrid, FiRefreshCw, FiSave, FiSettings, FiShield, FiUsers, FiArrowUpRight, FiClock, FiMail, FiFolder, FiBarChart2, FiMessageCircle } from 'react-icons/fi'
import crest from '../../assets/Greenhill Schools White Crest Logo.png'
import { AdminLayout } from './AdminLayout'
import { defaultSystemSettings, loadSystemSettings, saveSystemSettings, type SystemSettings } from './systemSettings'

const sections = [
  { id: 'general', title: 'General', description: 'Organization & region', icon: FiSettings },
  { id: 'directory', title: 'Google Workspace', description: 'Directory & synchronization', icon: FiUsers },
  { id: 'security', title: 'Security & sessions', description: 'Sign-in & access policies', icon: FiShield },
  { id: 'notifications', title: 'Notifications', description: 'Alerts & reminders', icon: FiBell },
] as const
type Section = typeof sections[number]['id']
const inputClass = 'mt-2.5 h-12 w-full rounded-xl border border-[#dce4f3] bg-white px-3.5 text-[13px] text-[#152e5e] shadow-xs transition-colors hover:border-[#b8c9e2] focus:border-[#6588bd] focus:outline-3 focus:outline-[#e5edf9]'

function SettingsCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const Icon = title.includes('Organization') ? FiGrid : title.includes('Region') ? FiGlobe : title.includes('Google') || title.includes('Directory') ? FiUsers : title.includes('notification') ? FiBell : title.includes('Sessions') ? FiClock : FiShield
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e1e8f3] bg-white shadow-[0_3px_12px_#172f6405]">
      <header className="flex items-start gap-3.5 border-b border-[#edf1f8] px-6 py-5 max-[500px]:px-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#e6ecf7] bg-[#f5f8fe] text-[#31558f]"><Icon className="size-[19px]" /></span>
        <div><h2 className="text-[17px] font-bold tracking-tight">{title}</h2><p className="mt-1.5 max-w-lg text-xs leading-relaxed text-[#7e90b1]">{description}</p></div>
      </header>
      <div className="px-6 py-2 max-[500px]:px-4">{children}</div>
    </section>
  )
}

function ToggleRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-center justify-between gap-6 border-b border-[#edf1f8] py-5 last:border-0"><span><span className="block text-sm font-semibold">{title}</span><span className="mt-1.5 block max-w-md text-xs leading-relaxed text-[#7e90b1]">{description}</span></span><span className="relative inline-flex shrink-0"><input type="checkbox" role="switch" checked={checked} onChange={event => onChange(event.target.checked)} className="peer sr-only" /><span aria-hidden="true" className="h-7 w-12 rounded-full bg-[#dce4f1] transition-colors peer-checked:bg-[#19396f] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#d7a826]" /><span aria-hidden="true" className="absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" /></span></label>
}

export function SystemSettingsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [saved, setSaved] = useState(loadSystemSettings)
  const [draft, setDraft] = useState(saved)
  const [section, setSection] = useState<Section>('general')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState(false)
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)
  function update<K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) {
    setDraft(current => ({ ...current, [key]: value }))
    setNotice('')
  }
  function save() {
    if (!draft.organization.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.supportEmail)) {
      setSection('general'); setError(true); setNotice('Enter an organization name and valid support email.'); return
    }
    if (Number(draft.idleMinutes) > Number(draft.sessionHours) * 60) {
      setSection('security'); setError(true); setNotice('The idle timeout must fit within the session duration.'); return
    }
    try {
      saveSystemSettings(draft)
      setSaved({ ...draft }); setError(false); setNotice('Settings saved in this browser. Live system policies have not changed.')
    } catch { setError(true); setNotice('Browser storage is unavailable. Your edits are still here; try saving again.') }
  }

  return (
    <AdminLayout title="System Settings" subtitle="Configure your shared identity and access workspace." active="System Settings" onNavigate={onNavigate}>
      <section className="relative mb-6 overflow-hidden rounded-[20px] bg-[#142e60] px-7 py-7 text-white max-[600px]:px-5">
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 right-12 size-80 rounded-full border border-white/8" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full border border-[#ffce36]/35" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4"><span className="grid size-[72px] shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5"><img src={crest} alt="GreenHill Schools" className="h-14 w-12 object-contain" /></span><div><p className="mb-2 text-[10px] font-bold tracking-[.18em] text-[#ffce36]">GREENHILL ADMINISTRATION</p><h2 className="text-[26px] font-bold tracking-tight max-[600px]:text-xl">A connected school starts here.</h2><p className="mt-2 max-w-md text-xs leading-relaxed text-[#b9cbea]">One place to shape your organization, secure access and keep your teams connected.</p></div></div>
          <div className="relative rounded-xl border border-white/15 bg-white/5 px-4 py-3"><span className="text-[10px] text-[#b9cbea]">SHARED WORKSPACE</span><div className="mt-2 flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#ffce36]" /><span className="text-sm font-bold">3 GreenHill systems</span></div></div>
        </div>
        <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">{[{ label: 'Procurement', Icon: FiFolder, color: 'text-[#ffce36]' }, { label: 'Executive Intelligence', Icon: FiBarChart2, color: 'text-[#b9a0ff]' }, { label: 'Incident & Service', Icon: FiMessageCircle, color: 'text-[#8cc6ff]' }].map(({ label, Icon, color }) => <span key={label} className="flex items-center gap-2 rounded-lg bg-white/7 px-3 py-2 text-[11px] text-[#dce6f8]"><Icon className={color} />{label}</span>)}<span className="ml-auto rounded-full border border-[#ffce36]/25 px-3 py-1.5 text-[10px] text-[#ffdf7e]">Preview environment</span></div>
      </section>
      <nav aria-label="Settings categories" className="mb-6 grid grid-cols-4 gap-3 max-[1050px]:grid-cols-2 max-[450px]:grid-cols-1">
        {sections.map(item => <button key={item.id} onClick={() => setSection(item.id)} aria-current={section === item.id ? 'page' : undefined} className={`group relative flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all ${section === item.id ? 'border-[#b8c9e7] bg-white shadow-[0_3px_0_#ffce36]' : 'border-[#e3e9f3] bg-[#f9fbff] hover:border-[#b8c9e7] hover:bg-white'}`}><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${section === item.id ? 'bg-[#152e5e] text-[#ffce36]' : 'bg-[#eaf0fa] text-[#7e90b1]'}`}><item.icon className="size-[18px]" /></span><span className="min-w-0"><span className="block text-xs font-bold">{item.title}</span><span className="mt-1 block text-[10px] text-[#7e90b1]">{item.description}</span></span></button>)}
      </nav>
      <div className="grid grid-cols-[minmax(0,1fr)_270px] items-start gap-5 max-[1150px]:grid-cols-1">
        <div className="min-w-0 space-y-5">
          {section === 'general' && <>
            <SettingsCard title="Organization details" description="The identity shown across your administration workspace."><div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f5f8fe] p-4"><span className="grid size-11 place-items-center rounded-xl bg-[#152e5e] text-sm font-bold text-[#ffce36]">GH</span><div><p className="text-sm font-bold">{draft.organization || 'Your organization'}</p><p className="mt-1 text-[11px] text-[#7e90b1]">Central identity &amp; access administration</p></div></div><div className="grid grid-cols-2 gap-5 py-5 max-[600px]:grid-cols-1"><label className="text-xs font-semibold">Organization name<input value={draft.organization} onChange={event => update('organization', event.target.value)} className={inputClass} /></label><label className="text-xs font-semibold">Support email<input type="email" value={draft.supportEmail} onChange={event => update('supportEmail', event.target.value)} className={inputClass} /></label></div></SettingsCard>
            <SettingsCard title="Region & display" description="Choose the default region and date format for your organization."><div className="grid grid-cols-2 gap-5 py-5 max-[600px]:grid-cols-1"><label className="text-xs font-semibold">Time zone<select value={draft.timezone} onChange={event => update('timezone', event.target.value)} className={inputClass}><option value="Africa/Kampala">Kampala · East Africa Time (UTC+3)</option><option value="Africa/Nairobi">Nairobi · East Africa Time (UTC+3)</option><option value="UTC">Coordinated Universal Time (UTC)</option></select></label><label className="text-xs font-semibold">Date format<select value={draft.dateFormat} onChange={event => update('dateFormat', event.target.value)} className={inputClass}><option value="day-first">20 Oct 2026 (day first)</option><option value="month-first">Oct 20, 2026 (month first)</option><option value="iso">2026-10-20 (ISO)</option></select></label></div><p className="flex items-center gap-2 border-t border-[#edf1f8] py-4 text-[11px] text-[#7e90b1]"><FiGlobe />English (United Kingdom) · Default language</p></SettingsCard>
          </>}
          {section === 'directory' && <>
            <SettingsCard title="Google Workspace directory" description="Your source of staff identities. Names and email addresses are managed in Google Workspace."><div className="flex flex-wrap items-center justify-between gap-4 py-5"><div><p className="text-sm font-bold">greenhillschools.ug</p><p className="mt-1.5 text-xs text-[#7e90b1]">Directory integration will be connected with the backend.</p></div><span className="rounded-full bg-[#fff4d3] px-3 py-1.5 text-[10px] font-bold text-[#9c7400]">Awaiting connection</span></div><div className="border-t border-[#edf1f8] py-5"><label className="text-xs font-semibold">Sync frequency<select value={draft.syncFrequency} onChange={event => update('syncFrequency', event.target.value)} className={inputClass}><option value="15">Every 15 minutes</option><option value="60">Every hour</option><option value="1440">Daily</option><option value="manual">Manual only</option></select></label></div></SettingsCard>
            <SettingsCard title="Directory behavior" description="Prepare the defaults for when Google Workspace synchronization is enabled."><ToggleRow title="Import new staff automatically" description="New directory users appear as Unassigned until workspace roles are granted." checked={draft.importNewUsers} onChange={value => update('importNewUsers', value)} /><ToggleRow title="Suspend access for removed accounts" description="When a Google Workspace account is removed or suspended, suspend its GreenHill sign-in access." checked={draft.suspendMissingUsers} onChange={value => update('suspendMissingUsers', value)} /></SettingsCard>
          </>}
          {section === 'security' && <>
            <SettingsCard title="Authentication policy" description="Set defaults for how staff sign in and confirm sensitive changes."><ToggleRow title="Require multi-factor authentication" description="Require an additional verification step for administrator sign-ins." checked={draft.requireMfa} onChange={value => update('requireMfa', value)} /><ToggleRow title="Re-authenticate for sensitive changes" description="Ask administrators to verify their identity before privileged role or security changes." checked={draft.requireReauth} onChange={value => update('requireReauth', value)} /></SettingsCard>
            <SettingsCard title="Sessions & temporary access" description="Limit idle sessions and define time-limited workspace access."><div className="grid grid-cols-2 gap-5 py-5 max-[600px]:grid-cols-1"><label className="text-xs font-semibold">Maximum session duration<select value={draft.sessionHours} onChange={event => update('sessionHours', event.target.value)} className={inputClass}>{['1', '4', '8', '12', '24'].map(value => <option key={value} value={value}>{value} {value === '1' ? 'hour' : 'hours'}</option>)}</select></label><label className="text-xs font-semibold">Idle timeout<select value={draft.idleMinutes} onChange={event => update('idleMinutes', event.target.value)} className={inputClass}>{['15', '30', '60', '120'].map(value => <option key={value} value={value}>{value} minutes</option>)}</select></label><label className="text-xs font-semibold">Default temporary access<select value={draft.temporaryDays} onChange={event => update('temporaryDays', event.target.value)} className={inputClass}>{['7', '14', '30', '90'].map(value => <option key={value} value={value}>{value} days</option>)}</select></label><label className="text-xs font-semibold">Expiry reminder<select value={draft.reviewReminder} onChange={event => update('reviewReminder', event.target.value)} className={inputClass}>{['1', '3', '7'].map(value => <option key={value} value={value}>{value} {value === '1' ? 'day' : 'days'} before expiry</option>)}</select></label></div></SettingsCard>
          </>}
          {section === 'notifications' && <SettingsCard title="Administrator notifications" description="Choose the events to include in administrator alerts once notifications are connected."><ToggleRow title="New support requests" description="Receive an alert when a staff member reports a sign-in or workspace access issue." checked={draft.newRequests} onChange={value => update('newRequests', value)} /><ToggleRow title="Repeated failed sign-ins" description="Highlight unusual sign-in failures that may need investigation." checked={draft.failedSignIns} onChange={value => update('failedSignIns', value)} /><ToggleRow title="Expiring workspace access" description="Remind administrators to review temporary grants before they expire." checked={draft.expiringAccess} onChange={value => update('expiringAccess', value)} /><ToggleRow title="Weekly access summary" description="Include sign-in activity, role changes and outstanding reviews in a weekly digest." checked={draft.weeklySummary} onChange={value => update('weeklySummary', value)} /></SettingsCard>}
          {notice && <p role={error ? 'alert' : 'status'} className={`flex items-start gap-2 rounded-xl border p-4 text-xs leading-relaxed ${error ? 'border-[#f0cdd4] bg-[#fff4f5] text-[#b63e51]' : 'border-[#cde8db] bg-[#eff9f3] text-[#188450]'}`}>{!error && <FiCheck className="mt-0.5 shrink-0" />}{notice}</p>}
          <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d7e1f0] bg-white p-4 shadow-[0_8px_30px_#17356412]"><div><p className="text-xs font-bold">{dirty ? 'You have unsaved changes' : 'All changes saved'}</p><p className="mt-1 text-[10px] text-[#7e90b1]">Preview settings are stored in this browser only.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => { setDraft({ ...defaultSystemSettings }); setNotice('Default values restored. Save changes to keep them.'); setError(false) }} className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-bold text-[#7e90b1] hover:bg-[#f4f6fc]"><FiRefreshCw />Defaults</button><button disabled={!dirty} onClick={() => { setDraft({ ...saved }); setNotice(''); setError(false) }} className="rounded-lg border border-[#dce4f3] px-3 py-2.5 text-xs font-bold disabled:opacity-40">Discard</button><button disabled={!dirty} onClick={save} className="flex items-center gap-2 rounded-lg bg-[#132d5d] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#29477b] disabled:opacity-40"><FiSave />Save changes</button></div></div>
        </div>
        <aside aria-label="Settings preview" className="space-y-4 min-[1151px]:sticky min-[1151px]:top-28">
          <section className="overflow-hidden rounded-2xl border border-[#e1e8f3] bg-white">
            <div className="border-b border-[#edf1f8] px-5 py-4"><p className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#7e90b1]"><span className="size-1.5 rounded-full bg-[#7e35b6]" />YOUR CONFIGURATION</p></div>
            <div className="p-5"><h2 className="text-lg font-bold">{draft.organization || 'Your organization'}</h2><p className="mt-1 text-[11px] text-[#7e90b1]">Organization profile preview</p><dl className="mt-5 space-y-4 text-xs">
              <div className="flex items-start gap-2.5"><FiMail className="mt-0.5 shrink-0 text-[#8b9dbb]" /><div><dt className="text-[10px] text-[#7e90b1]">Support contact</dt><dd className="mt-1 break-all font-semibold">{draft.supportEmail || 'Not set'}</dd></div></div>
              <div className="flex items-start gap-2.5"><FiGlobe className="mt-0.5 shrink-0 text-[#8b9dbb]" /><div><dt className="text-[10px] text-[#7e90b1]">Organization time zone</dt><dd className="mt-1 font-semibold">{draft.timezone.replace('_', ' ')}</dd></div></div>
              <div className="flex items-start gap-2.5"><FiClock className="mt-0.5 shrink-0 text-[#8b9dbb]" /><div><dt className="text-[10px] text-[#7e90b1]">Session duration</dt><dd className="mt-1 font-semibold">{draft.sessionHours} hours <span className="font-normal text-[#7e90b1]">/ {draft.idleMinutes} min idle</span></dd></div></div>
            </dl></div>
            <div className="mx-5 mb-5 flex items-center justify-between rounded-lg bg-[#f3f6fc] px-3 py-2.5 text-[10px]"><span className="text-[#7e90b1]">Administrator MFA</span><span className={`font-bold ${draft.requireMfa ? 'text-[#188450]' : 'text-[#a57800]'}`}>{draft.requireMfa ? 'Required' : 'Optional'}</span></div>
          </section>
          <section className="rounded-2xl border border-[#e3e9f3] bg-[#edf3fc] p-5"><span className="mb-3 grid size-9 place-items-center rounded-xl bg-white text-[#496da3]"><FiShield className="size-[18px]" /></span><h2 className="text-sm font-bold">The right access. For every team.</h2><p className="mt-2 text-xs leading-relaxed text-[#7e90b1]">Global preferences live here. Individual workspace roles are managed separately, so every person gets exactly the access they need.</p><button onClick={() => onNavigate('/super-admin/users')} className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#31558f]">Manage user access<FiArrowUpRight /></button></section>
          <p className="px-2 text-[10px] leading-relaxed text-[#93a2bc]">This is a frontend preview. Your preferences are saved in this browser; live authentication policies remain unchanged.</p>
        </aside>
      </div>
    </AdminLayout>
  )
}
