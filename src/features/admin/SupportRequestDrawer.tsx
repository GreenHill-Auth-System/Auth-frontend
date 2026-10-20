import { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { statusStyles, type SupportTicket, type TicketStatus } from './supportData'

type Props = { ticket: SupportTicket; onUpdate: (ticket: SupportTicket) => void; onClose: () => void }

export function SupportRequestDrawer({ ticket, onUpdate, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [note, setNote] = useState(ticket.note)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.showModal()
    return () => { document.body.style.overflow = previous }
  }, [])

  function changeStatus(status: TicketStatus) {
    if (status === 'Resolved' && !note.trim()) {
      setNotice('Add a resolution note before resolving this request.')
      return
    }
    onUpdate({ ...ticket, status, note: note.trim() })
    setNotice(`${ticket.id} marked ${status.toLowerCase()}. Saved in this preview session.`)
  }

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="support-drawer-title" onClick={event => {
      if (event.target !== event.currentTarget) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }} className="fixed inset-y-0 right-0 left-auto m-0 h-svh max-h-none w-[700px] max-w-full overflow-y-auto border-0 border-t-[5px] border-[#ffca35] bg-white font-[Arial,Helvetica,sans-serif] text-[#152e5e] shadow-xl backdrop:bg-[#11254b]/40">
      <div className="flex min-h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-[#e8edf6] px-8 py-6 max-[500px]:px-5"><h2 id="support-drawer-title" className="text-2xl font-bold max-[500px]:text-xl">Manage support request</h2><button aria-label="Close support request" onClick={onClose} className="rounded-full p-2 text-[#7e90b1] hover:bg-[#eef2fa]"><FiX /></button></header>
        <div className="flex-1 space-y-5 px-8 py-5 max-[500px]:px-5">
          <div><div className="mb-3 flex flex-wrap gap-3"><span className="rounded-full bg-[#eef2fa] px-5 py-1 text-[11px] font-bold">{ticket.id}</span><span className={`rounded-full px-5 py-1 text-[11px] font-bold ${statusStyles[ticket.status]}`}>{ticket.status}</span>{ticket.assignee && <span className="rounded-full bg-[#eef2fa] px-3 py-1 text-[11px]">Assigned to {ticket.assignee}</span>}</div><h3 className="text-xl font-bold">{ticket.title}</h3><p className="mt-3 text-xs text-[#7e90b1]">Reported by {ticket.name} &middot; {ticket.received}</p></div>
          <section className="rounded-xl border border-[#e1e8f3] bg-[#f7f9fe] p-4"><h4 className="text-[10px] font-bold text-[#7e90b1]">USER DETAILS</h4><p className="mt-2 break-all text-sm font-bold">{ticket.email}</p><p className="mt-2 text-xs text-[#7e90b1]">Requested workspace: {ticket.workspace}</p></section>
          <section><h4 className="mb-2 text-base font-bold">Issue description</h4><p className="min-h-24 rounded-lg border border-[#e1e8f3] p-4 text-sm leading-relaxed">{ticket.description}</p></section>
          <section><h4 className="mb-2 text-base font-bold">Relevant account checks</h4><dl className="px-4 text-sm">{[['Google Workspace account', ticket.account], ['Workspace role assignment', ticket.role], ['Recent login', ticket.login]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-[#e8edf6] py-3"><dt>{label}</dt><dd className={`text-right text-xs font-bold ${['Active', 'Successful', 'Assigned'].includes(value) ? 'text-[#008e6b]' : 'text-[#bd8000]'}`}>{value}</dd></div>)}</dl><p className="mt-2 text-[10px] text-[#93a2bc]">Sample account checks for this frontend preview.</p></section>
          <div><label htmlFor="support-note" className="text-sm font-bold">Reply / resolution note</label><textarea id="support-note" value={note} onChange={event => setNote(event.target.value)} placeholder="Write a response to the user..." rows={3} className="mt-2 w-full resize-y rounded-lg border border-[#e1e8f3] p-4 text-xs leading-relaxed placeholder:text-[#7e90b1]" /><p className="mt-1 text-[10px] text-[#93a2bc]">Notes are stored in this preview session. No message is sent.</p></div>
          {notice && <p role="status" className="rounded-lg bg-[#f0f4fc] p-3 text-xs">{notice}</p>}
        </div>
        <footer className="flex flex-wrap gap-3 bg-[#f6f8fd] px-8 py-5 max-[500px]:px-5">
          <button disabled={ticket.assignee === 'ICT'} onClick={() => { onUpdate({ ...ticket, assignee: 'ICT', note: note.trim() }); setNotice('Assigned to ICT in this preview session.') }} className="rounded-lg bg-[#e7ecf6] px-5 py-3 text-xs font-bold hover:bg-[#dce4f3] disabled:cursor-default disabled:opacity-60">{ticket.assignee === 'ICT' ? 'Assigned to ICT' : 'Assign to ICT'}</button>
          <button disabled={ticket.status === 'In progress'} onClick={() => changeStatus('In progress')} className="rounded-lg bg-[#7c35b5] px-5 py-3 text-xs font-bold text-white hover:bg-[#68299b] disabled:cursor-default disabled:opacity-60">Mark in progress</button>
          <button disabled={ticket.status === 'Resolved'} onClick={() => changeStatus('Resolved')} className="rounded-lg bg-[#132d5d] px-6 py-3 text-xs font-bold text-white hover:bg-[#29477b] disabled:cursor-default disabled:opacity-60">{ticket.status === 'Resolved' ? 'Resolved' : 'Resolve request'}</button>
        </footer>
      </div>
    </dialog>
  )
}
