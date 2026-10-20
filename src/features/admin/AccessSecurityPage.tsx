import { useState } from 'react'
import { AdminLayout } from './AdminLayout'
import { TemporaryAccessDrawer } from './TemporaryAccessDrawer'
import { accessCounts, createPreviewGrants, kampalaDate, type TemporaryGrant } from './temporaryAccessData'

const previewMetrics = [
  { title: 'Successful sign-ins', value: '1,842', color: 'bg-[#198c75]' },
  { title: 'Failed sign-ins', value: '27', color: 'bg-[#bf5759]' },
  { title: 'Temporary access', value: '14', color: 'bg-[#7e35b6]' },
  { title: 'Access reviews due', value: '18', color: 'bg-[#c28b00]' },
]

const securityEvents = [
  { title: 'Role changed', detail: 'Sarah Nankya · PMS Procurement Officer', date: '20 Oct 2026, 09:42', color: 'bg-[#7e35b6]' },
  { title: 'Successful sign-in', detail: 'David Kato · Google Workspace', date: '20 Oct 2026, 09:12', color: 'bg-[#198c75]' },
  { title: 'Temporary access expired', detail: 'Evaluation committee · PMS', date: '19 Oct 2026, 18:00', color: 'bg-[#cc9215]' },
  { title: 'Account suspended', detail: 'Peter Ouma · Administrator', date: '19 Oct 2026, 15:26', color: 'bg-[#bf5759]' },
  { title: 'Successful sign-in', detail: 'Carol Namusoke · Google Workspace', date: '19 Oct 2026, 13:10', color: 'bg-[#198c75]' },
]

const panelClass = 'rounded-2xl border border-[#e1e8f3] bg-white shadow-[0_5px_0_#edf2fa]'

export function AccessSecurityPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [reviewOpen, setReviewOpen] = useState(false)
  const [grants, setGrants] = useState(createPreviewGrants)
  const counts = accessCounts(grants, kampalaDate())
  const metrics = previewMetrics.map(metric => ({ ...metric, value: metric.title === 'Temporary access' ? String(counts.active) : metric.title === 'Access reviews due' ? String(counts.due) : metric.value }))
  function updateGrant(updated: TemporaryGrant) {
    setGrants(current => current.map(grant => grant.id === updated.id ? updated : grant))
  }

  return (
    <AdminLayout title="Access & Security" subtitle="Monitor sign-ins, privileged changes and temporary access." active="Access & Security" onNavigate={onNavigate}>
      <section aria-label="Security statistics" className="mb-6 grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[400px]:grid-cols-1">
        {metrics.map(metric => (
          <article key={metric.title} className={`${panelClass} relative min-h-28 p-5`}>
            <span aria-hidden="true" className={`absolute top-5 right-5 size-[22px] rounded-full ${metric.color}`} />
            <h2 className="pr-8 text-xs font-semibold text-[#7e90b1]">{metric.title}</h2>
            <strong className="mt-3 block text-[34px] leading-none">{metric.value}</strong>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] items-stretch gap-4 max-[1100px]:grid-cols-1">
        <section aria-labelledby="security-events-title" className={`${panelClass} px-6 pt-5 pb-9 max-[500px]:px-4`}>
          <h2 id="security-events-title" className="text-xl font-bold">Recent security events</h2>
          <p className="mt-1 text-xs text-[#7e90b1]">Sign-ins and administrative access changes</p>
          <ul className="mt-4 divide-y divide-[#e8edf6] border-b border-[#e8edf6]">
            {securityEvents.map((event, index) => (
              <li key={index} className="flex min-h-[76px] items-center gap-3 py-4">
                <span aria-hidden="true" className={`size-[17px] shrink-0 rounded-full ${event.color}`} />
                <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <div><h3 className="text-sm font-bold">{event.title}</h3><p className="mt-2 text-xs leading-relaxed text-[#7e90b1]">{event.detail}</p></div>
                  <span className="shrink-0 text-[11px] text-[#7e90b1]">{event.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-4 min-[1101px]:grid-rows-[1fr_auto] max-[1100px]:grid-cols-2 max-[650px]:grid-cols-1">
          <section aria-labelledby="access-controls-title" className={`${panelClass} p-6 max-[500px]:p-4`}>
            <h2 id="access-controls-title" className="text-xl font-bold">Access controls</h2>
            <dl className="mt-3 divide-y divide-[#e8edf6] text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 py-3"><dt className="font-bold">Multi-factor authentication</dt><dd className="min-w-[92px] rounded-full bg-[#e4f6ee] px-3 py-1.5 text-[10px] font-bold text-[#188450]">Enabled</dd></div>
              <div className="flex flex-wrap items-center justify-between gap-3 py-3"><dt className="font-bold">Google Workspace SSO</dt><dd className="min-w-[92px] rounded-full bg-[#e4f6ee] px-3 py-1.5 text-[10px] font-bold text-[#188450]">Connected</dd></div>
              <div className="flex items-center justify-between gap-3 py-4"><dt className="font-bold">Session policy</dt><dd className="text-[#7e90b1]">8 hours</dd></div>
            </dl>
          </section>

          <section aria-labelledby="temporary-access-title" className={`${panelClass} p-6 max-[500px]:p-4`}>
            <h2 id="temporary-access-title" className="text-xl font-bold">Temporary access</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#7e90b1]">Review time-limited workspace roles and expiring evaluation committee access.</p>
            <p className="mt-7 rounded-lg bg-[#f4f6fc] px-4 py-3 text-sm font-bold">{counts.active} active temporary grants</p>
            <button onClick={() => setReviewOpen(true)} className="mt-4 w-full rounded-lg bg-[#132d5d] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#29477b]">Review access</button>
          </section>
        </div>
      </div>
      {reviewOpen && <TemporaryAccessDrawer grants={grants} onUpdate={updateGrant} onClose={() => setReviewOpen(false)} />}
    </AdminLayout>
  )
}
