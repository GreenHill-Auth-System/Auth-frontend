import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiClock, FiSearch, FiShield, FiX } from 'react-icons/fi'
import { workspaceDetails, workspaceOptions } from './directoryData'
import { accessCounts, grantStatus, kampalaDate, type TemporaryGrant } from './temporaryAccessData'

type Props = { grants: TemporaryGrant[]; onUpdate: (grant: TemporaryGrant) => void; onClose: () => void }
const inputClass = 'h-10 rounded-lg border border-[#e1e8f3] bg-[#f7f9fe] px-3 text-xs'
const statusColors = { Active: 'bg-[#e4f6ee] text-[#188450]', Expired: 'bg-[#fff3cf] text-[#a57600]', Revoked: 'bg-[#fce8eb] text-[#c64557]' }

export function TemporaryAccessDrawer({ grants, onUpdate, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [search, setSearch] = useState('')
  const [workspace, setWorkspace] = useState('all')
  const [filter, setFilter] = useState('Pending review')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expiry, setExpiry] = useState('')
  const [confirmRevoke, setConfirmRevoke] = useState(false)
  const [notice, setNotice] = useState('')
  const [today, setToday] = useState(kampalaDate)
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.showModal()
    const timer = window.setInterval(() => setToday(kampalaDate()), 30000)
    return () => { document.body.style.overflow = previous; window.clearInterval(timer) }
  }, [])
  const counts = accessCounts(grants, today)
  const query = search.trim().toLowerCase()
  const visible = grants.filter(grant => {
    const status = grantStatus(grant, today)
    return (workspace === 'all' || grant.workspace === workspace) &&
      `${grant.name} ${grant.email} ${grant.id}`.toLowerCase().includes(query) &&
      (filter === 'All grants' || (filter === 'Pending review' ? !grant.reviewed && !grant.revoked : status === filter))
  }).sort((a, b) => a.expires.localeCompare(b.expires))

  function save(grant: TemporaryGrant, action: 'keep' | 'extend' | 'revoke') {
    if (action === 'extend' && (!expiry || expiry <= today || expiry <= grant.expires)) {
      setNotice('Choose an expiry later than today and the current expiry.')
      return
    }
    onUpdate({ ...grant, reviewed: true, revoked: action === 'revoke', expires: action === 'extend' ? expiry : grant.expires })
    setNotice(`${grant.name}: ${action === 'revoke' ? 'access revoked' : action === 'extend' ? 'access extended' : 'access retained'} for ${grant.workspace}. Other workspace access is unchanged.`)
    setEditingId(null)
  }

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="access-review-title" onClick={event => {
      if (event.target !== event.currentTarget) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }} className="fixed inset-y-0 right-0 left-auto m-0 h-svh max-h-none w-[820px] max-w-full overflow-y-auto border-0 border-t-4 border-[#ffca35] bg-[#f7f9fe] font-[Arial,Helvetica,sans-serif] text-[#152e5e] shadow-xl backdrop:bg-[#11254b]/40">
      <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#e1e8f3] bg-white px-7 py-6 max-[500px]:px-4"><div><span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#7e90b1]"><FiShield />ACCESS &amp; SECURITY</span><h2 id="access-review-title" className="text-2xl font-bold">Temporary access reviews</h2><p className="mt-2 text-xs leading-relaxed text-[#7e90b1]">Keep access intentional. Review, extend or remove a workspace grant.</p></div><button onClick={onClose} aria-label="Close access reviews" className="rounded-full bg-[#eef2fa] p-2"><FiX /></button></header>
      <div className="space-y-5 p-7 max-[500px]:p-4">
        <div className="grid grid-cols-3 gap-3">{[{ label: 'Awaiting review', value: counts.due, color: 'text-[#a57600]' }, { label: 'Active grants', value: counts.active, color: 'text-[#7e35b6]' }, { label: 'Expired grants', value: counts.expired, color: 'text-[#c64557]' }].map(item => <div key={item.label} className="rounded-xl border border-[#e1e8f3] bg-white p-4 max-[450px]:p-3"><strong className={`block text-2xl ${item.color}`}>{item.value}</strong><span className="mt-1 block text-[11px] text-[#7e90b1]">{item.label}</span></div>)}</div>
        <div className="rounded-lg border border-[#e4e9f5] bg-[#eef2fb] px-4 py-3 text-xs leading-relaxed text-[#64799e]">Each review applies to one workspace only. Expired grants have no active access. Changes are saved only for this frontend preview.</div>
        <div className="grid grid-cols-[1fr_auto] gap-3 max-[550px]:grid-cols-1"><label className="relative"><span className="sr-only">Search temporary access</span><FiSearch className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7e90b1]" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email or grant ID" className={`${inputClass} w-full pl-9`} /></label><select aria-label="Filter by workspace" value={workspace} onChange={e => setWorkspace(e.target.value)} className={inputClass}><option value="all">All workspaces</option>{workspaceOptions.map(item => <option key={item}>{item}</option>)}</select></div>
        <div role="group" aria-label="Filter access reviews" className="flex flex-wrap gap-2">{['Pending review', 'All grants', 'Active', 'Expired', 'Revoked'].map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-lg px-3 py-2 text-[11px] font-bold ${filter === item ? 'bg-[#152e5e] text-white' : 'border border-[#e1e8f3] bg-white text-[#7e90b1] hover:bg-[#eef2fa]'}`}>{item}</button>)}</div>
        {notice && <p role="status" className="rounded-lg border border-[#cddcf2] bg-white p-3 text-xs leading-relaxed">{notice}</p>}
        <div className="flex items-center justify-between text-xs"><h3 className="font-bold">{filter}</h3><span className="text-[#7e90b1]">{visible.length} {visible.length === 1 ? 'grant' : 'grants'}</span></div>
        <div className="space-y-3">{visible.map(grant => {
          const status = grantStatus(grant, today)
          const editing = editingId === grant.id
          return <article key={grant.id} className="overflow-hidden rounded-xl border border-[#e1e8f3] bg-white">
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h4 className="text-sm font-bold">{grant.name}</h4><p className="mt-1 break-all text-[11px] text-[#7e90b1]">{grant.email}</p></div><span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold ${statusColors[status]}`}>{status}</span></div>
              <div className="mt-4 flex flex-wrap items-center gap-2"><span className="rounded-md bg-[#eef2fa] px-2 py-1 text-[10px] font-bold" title={workspaceDetails[grant.workspace].name}>{grant.workspace}</span><span className="text-xs font-semibold">{grant.role}</span></div><p className="mt-2 text-xs text-[#7e90b1]">{grant.reason}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2fa] pt-3"><span className={`flex items-center gap-1.5 text-[11px] ${status === 'Expired' ? 'text-[#a57600]' : 'text-[#7e90b1]'}`}><FiClock />{status === 'Expired' ? 'Expired' : 'Expires'} {new Date(`${grant.expires}T12:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'Africa/Kampala', day: 'numeric', month: 'short', year: 'numeric' })}</span><div className="flex items-center gap-3">{grant.reviewed && <span className="flex items-center gap-1 text-[10px] text-[#188450]"><FiCheck />Reviewed</span>}{status !== 'Revoked' && <button onClick={() => { setEditingId(editing ? null : grant.id); setExpiry(''); setConfirmRevoke(false); setNotice('') }} aria-expanded={editing} className="rounded-lg bg-[#f0e9fb] px-4 py-2 text-[11px] font-bold text-[#7e35b6]">{editing ? 'Close review' : 'Review access'}</button>}</div></div>
            </div>
            {editing && <div className="space-y-4 border-t border-[#e1e8f3] bg-[#fafbfe] p-4">
              <div><label htmlFor={`expiry-${grant.id}`} className="text-xs font-bold">Extend access until</label><div className="mt-2 flex flex-wrap gap-2"><input id={`expiry-${grant.id}`} type="date" min={grant.expires > today ? grant.expires : today} value={expiry} onChange={e => setExpiry(e.target.value)} className={`${inputClass} bg-white`} /><button disabled={!expiry} onClick={() => save(grant, 'extend')} className="rounded-lg bg-[#152e5e] px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Save extension</button></div></div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e1e8f3] pt-3">{status === 'Active' && <button onClick={() => save(grant, 'keep')} className="flex items-center gap-1.5 rounded-lg border border-[#c9e6da] bg-white px-4 py-2 text-xs font-bold text-[#188450]"><FiCheck />Keep current access</button>}<button onClick={() => setConfirmRevoke(true)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#c64557]">Revoke workspace access</button></div>
              {confirmRevoke && <div className="rounded-lg border border-[#f1ccd2] bg-[#fff4f5] p-3"><p className="text-xs leading-relaxed">Remove {grant.name}'s temporary {grant.workspace} access? Their other workspace roles will remain unchanged.</p><div className="mt-3 flex gap-3"><button onClick={() => save(grant, 'revoke')} className="rounded-md bg-[#bd4054] px-3 py-2 text-xs font-bold text-white">Confirm revocation</button><button onClick={() => setConfirmRevoke(false)} className="px-3 py-2 text-xs font-bold">Cancel</button></div></div>}
            </div>}
          </article>
        })}</div>
        {!visible.length && <div className="rounded-xl border border-dashed border-[#d5deed] bg-white px-5 py-12 text-center"><FiCheck className="mx-auto mb-3 size-7 text-[#188450]" /><h3 className="text-sm font-bold">No grants to show</h3><p className="mt-2 text-xs text-[#7e90b1]">Try another filter or search. Completed reviews appear under All grants.</p></div>}
      </div>
      <footer className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-[#e1e8f3] bg-white px-7 py-4"><span className="text-[11px] text-[#7e90b1]">{counts.due} reviews remaining</span><button onClick={onClose} className="rounded-lg bg-[#152e5e] px-8 py-3 text-xs font-bold text-white">Done</button></footer>
    </dialog>
  )
}
