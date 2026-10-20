import { useState } from 'react'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import { AdminLayout } from './AdminLayout'
import { SupportRequestDrawer } from './SupportRequestDrawer'
import { previewTickets, requestsCsv, statusStyles, ticketStatuses, type SupportTicket, type TicketStatus } from './supportData'

export function SupportRequestsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [tickets, setTickets] = useState(previewTickets)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<TicketStatus | 'All tickets'>('All tickets')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const selected = tickets.find(ticket => ticket.id === selectedId)
  const query = search.trim().toLowerCase()
  const filtered = tickets.filter(ticket => (filter === 'All tickets' || ticket.status === filter) &&
    `${ticket.id} ${ticket.title} ${ticket.name} ${ticket.email}`.toLowerCase().includes(query))
  const counts = ticketStatuses.map(status => tickets.filter(ticket => ticket.status === status).length)
  const metrics = [
    { title: 'New requests', value: String(counts[0]).padStart(2, '0'), description: 'Needs attention', color: 'bg-[#ffca35]' },
    { title: 'In progress', value: String(counts[1]).padStart(2, '0'), description: 'Being investigated', color: 'bg-[#6978e7]' },
    { title: 'Resolved this month', value: String(counts[2]).padStart(2, '0'), description: 'Closed successfully · preview', color: 'bg-[#32aa90]' },
    { title: 'Avg. response', value: '2.4h', description: 'Illustrative metric', color: 'bg-[#7c35b5]' },
  ]

  function updateTicket(ticket: SupportTicket) {
    setTickets(current => current.map(item => item.id === ticket.id ? ticket : item))
  }

  function exportRequests() {
    const url = URL.createObjectURL(new Blob(['\uFEFF', requestsCsv(filtered)], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'greenhill-support-requests.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice(`Exported ${filtered.length} ${filtered.length === 1 ? 'request' : 'requests'} matching the current filters.`)
  }

  return (
    <AdminLayout title="Support Requests" subtitle="Help staff regain secure access to their workspaces." active="Support Requests" onNavigate={onNavigate}>
      <section aria-label="Support request statistics" className="mb-6 grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[400px]:grid-cols-1">
        {metrics.map(metric => <article key={metric.title} className="relative min-h-28 rounded-2xl border border-[#e1e8f3] bg-white p-5"><span aria-hidden="true" className={`absolute top-3.5 right-3.5 size-7 rounded-full ${metric.color}`} /><h2 className="pr-10 text-[13px] text-[#7e90b1]">{metric.title}</h2><strong className="mt-2 block text-[32px] leading-tight">{metric.value}</strong><p className="mt-1 text-[11px] text-[#7e90b1]">{metric.description}</p></article>)}
      </section>
      <section aria-labelledby="support-list-title" className="rounded-2xl border border-[#e1e8f3] bg-white p-5 max-[600px]:p-4">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 id="support-list-title" className="text-xl font-bold">All support requests</h2><p className="mt-1 text-xs text-[#7e90b1]">Track and resolve authentication problems reported by users.</p></div><button onClick={exportRequests} className="rounded-lg bg-[#132d5d] px-8 py-3 text-xs font-bold text-white hover:bg-[#29477b]">Export requests</button></div>
        <div className="mt-5 mb-4 grid grid-cols-[minmax(220px,1fr)_auto] items-center gap-4 max-[1100px]:grid-cols-1"><label className="relative block min-w-0"><span className="sr-only">Search requests by name, email or ticket ID</span><FiSearch aria-hidden="true" className="absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-[#7e90b1]" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name, email or ticket ID" className="h-10 w-full rounded-lg border border-[#e1e8f3] bg-[#f7f9fe] pr-3 pl-10 text-xs placeholder:text-[#7e90b1]" /></label><div role="group" aria-label="Filter requests by status" className="grid grid-cols-4 gap-3 max-[450px]:grid-cols-2">{(['All tickets', ...ticketStatuses] as const).map(status => <button key={status} aria-pressed={filter === status} onClick={() => setFilter(status)} className={`h-10 min-w-0 rounded-lg px-4 whitespace-nowrap text-[11px] font-bold transition-shadow ${status === 'All tickets' ? 'bg-[#eaf0fd]' : statusStyles[status]} ${filter === status ? 'ring-2 ring-[#152e5e]/30 ring-offset-2' : 'hover:ring-2 hover:ring-[#152e5e]/10'}`}>{status}</button>)}</div></div>
        {notice && <p role="status" className="mb-3 rounded-lg bg-[#f0f4fc] px-3 py-2 text-xs">{notice}</p>}
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] table-fixed border-collapse text-left text-xs"><caption className="sr-only">Preview support requests</caption><colgroup><col className="w-[36%]" /><col className="w-[16%]" /><col className="w-[15%]" /><col className="w-[21%]" /><col className="w-[12%]" /></colgroup><thead><tr className="bg-[#f2f5fb] text-[10px] text-[#7e90b1]"><th scope="col" className="rounded-l-md px-4 py-3">TICKET / ISSUE</th><th scope="col" className="px-4 py-3">USER</th><th scope="col" className="px-4 py-3">STATUS</th><th scope="col" className="px-4 py-3">RECEIVED</th><th scope="col" className="rounded-r-md px-4 py-3 text-right">ACTION</th></tr></thead><tbody>{filtered.map(ticket => <tr key={ticket.id} className="border-b border-[#e8edf6] hover:bg-[#fbfcff]"><td className="px-4 py-4"><span className="text-[11px] font-bold text-[#7e90b1]">{ticket.id}</span><div className="mt-1 text-[13px] font-bold">{ticket.title}</div></td><td className="px-4 py-4">{ticket.name}</td><td className="px-4 py-4"><span className={`inline-block min-w-[102px] rounded-full px-4 py-1.5 text-center text-[11px] font-bold ${statusStyles[ticket.status]}`}>{ticket.status}</span></td><td className="whitespace-nowrap px-4 py-4 text-[11px] text-[#7e90b1]">{ticket.received}</td><td className="px-4 py-4 text-right"><button onClick={() => setSelectedId(ticket.id)} aria-label={`Manage request ${ticket.id}`} className="inline-flex items-center gap-1 rounded px-1 py-2 font-bold text-[#8037c7] hover:text-[#59258d]">Manage<FiArrowRight aria-hidden="true" /></button></td></tr>)}</tbody></table>{!filtered.length && <p className="py-12 text-center text-sm text-[#7e90b1]">No support requests match your search or filters.</p>}</div>
      </section>
      {selected && <SupportRequestDrawer key={selected.id} ticket={selected} onUpdate={updateTicket} onClose={() => setSelectedId(null)} />}
    </AdminLayout>
  )
}
