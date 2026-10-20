import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { AdminLayout } from './AdminLayout'
import { ManageUserDrawer } from './ManageUserDrawer'
import { previewUsers, workspaceOptions, assignedWorkspaces, updateWorkspaceRole, type Workspace } from './directoryData'

const pageSize = 5
const filterClass = 'h-10 rounded-lg border-0 bg-[#eef2fa] px-3 text-[11px] font-bold text-[#152e5e]'

export function UserManagementPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [users, setUsers] = useState(previewUsers)
  const [search, setSearch] = useState('')
  const [workspace, setWorkspace] = useState('all')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selectedUser = users.find(user => user.id === selectedId)
  const [notice, setNotice] = useState('')
  const query = search.trim().toLowerCase()
  const filtered = users.filter(user =>
    (!query || `${user.name} ${user.email}`.toLowerCase().includes(query)) &&
    (workspace === 'all' || (workspace === 'unassigned' ? assignedWorkspaces(user).length === 0 : assignedWorkspaces(user).some(item => item === workspace))) &&
    (status === 'all' || user.status === status),
  )
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function saveRole(userId: number, workspace: Workspace, role: string) {
    setUsers(current => current.map(user => user.id === userId ? updateWorkspaceRole(user, workspace, role) : user))
    setNotice(`${workspace} ${role ? 'role updated' : 'access removed'} in this preview session. Other workspace access is unchanged.`)
  }

  return (
    <AdminLayout title="User Management" subtitle="Manage identities, access and workspace role assignments." active="User Management" onNavigate={onNavigate}>
      <section aria-labelledby="directory-title" className="rounded-[18px] border border-[#e1e8f3] bg-white px-6 pt-4 pb-3 shadow-[0_5px_0_#edf2fa] max-[600px]:px-4">
        <h2 id="directory-title" className="text-[22px] font-bold">Directory</h2>
        <p className="mt-1 text-xs tracking-[.15px] text-[#7e90b1]">Users from the GreenHill Google Workspace directory</p>
        <div className="mt-5 mb-6 flex flex-wrap items-center gap-3">
          <label className="relative min-w-[200px] flex-1"><span className="sr-only">Search name or email</span><FiSearch aria-hidden="true" className="absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-[#7e90b1]" /><input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search name or email..." className="h-10 w-full rounded-lg border border-[#e1e8f3] bg-[#f7f9fe] pr-3 pl-9 text-xs placeholder:text-[#7e90b1]" /></label>
          <select aria-label="Filter by workspace" value={workspace} onChange={e => { setWorkspace(e.target.value); setPage(1) }} className={filterClass}><option value="all">All workspaces</option><option value="unassigned">Unassigned</option>{workspaceOptions.map(item => <option key={item}>{item}</option>)}</select>
          <select aria-label="Filter by status" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }} className={filterClass}><option value="all">All statuses</option><option>Active</option><option>Suspended</option></select>
          <button onClick={() => setNotice('Google Workspace sync will be available when the directory backend is connected.')} className="h-10 rounded-lg bg-[#fff5d7] px-4 text-[11px] font-bold hover:bg-[#ffedb3]">Sync from Google</button>
        </div>
        {notice && <div role="status" className="mb-4 flex items-start justify-between gap-3 rounded-lg bg-[#f0f4fc] px-3 py-2 text-xs"><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')} className="font-bold">×</button></div>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[660px] border-collapse text-left text-xs">
            <caption className="sr-only">Preview user directory with workspace access and account status</caption>
            <thead><tr className="bg-[#f0f3fa] text-[10px] text-[#7e90b1]"><th scope="col" className="rounded-l-lg px-4 py-4 font-bold">USER</th><th scope="col" className="px-4 py-4 font-bold">WORKSPACES</th><th scope="col" className="px-4 py-4 font-bold">STATUS</th><th scope="col" className="rounded-r-lg px-4 py-4 font-bold">ACTION</th></tr></thead>
            <tbody>{visible.map(user => <tr key={user.id} className="border-b border-[#e9edf6] hover:bg-[#fbfcff]">
              <td className="py-3.5 pr-4 pl-2"><div className="flex items-center gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-full font-bold ${user.avatar}`}>{user.name.split(' ').map(part => part[0]).slice(0, 2).join('')}</span><div><div className="text-[13px] font-bold">{user.name}</div><div className="mt-1 text-[11px] text-[#7e90b1]">{user.email}</div></div></div></td>
              <td className="px-4 py-3.5">{assignedWorkspaces(user).length ? assignedWorkspaces(user).join(' \u00b7 ') : <span className="text-[#7e90b1]">Unassigned</span>}</td>
              <td className="px-4 py-3.5"><span className={`inline-block min-w-[88px] rounded-full px-3 py-1 text-[10px] font-bold ${user.status === 'Active' ? 'bg-[#e4f6ee] text-[#188450]' : 'bg-[#fce8eb] text-[#ce4157]'}`}>{user.status}</span></td>
              <td className="px-4 py-3.5"><button onClick={() => setSelectedId(user.id)} aria-label={`Manage ${user.name}`} className="w-32 rounded-lg border border-[#cfdbf0] px-4 py-2 text-xs font-bold hover:bg-[#eef2fa]">Manage</button></td>
            </tr>)}</tbody>
          </table>
          {!visible.length && <div className="py-12 text-center text-sm text-[#7e90b1]">No users match your search or filters.</div>}
        </div>
        <div className="flex items-center justify-between gap-4 pt-5 pb-1 text-[11px] text-[#7e90b1]"><span>Showing {visible.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} users</span><nav aria-label="Directory pages" className="flex gap-1">{Array.from({ length: pages }, (_, index) => index + 1).map(number => <button key={number} aria-label={`Page ${number}`} aria-current={number === currentPage ? 'page' : undefined} onClick={() => setPage(number)} className={`grid size-7 place-items-center rounded-md font-bold ${number === currentPage ? 'bg-[#eef2fa] text-[#152e5e]' : 'hover:bg-[#f7f9fe]'}`}>{number}</button>)}</nav></div>
      </section>
      {selectedUser && <ManageUserDrawer user={selectedUser} onSaveRole={saveRole} onClose={() => setSelectedId(null)} />}
    </AdminLayout>
  )
}
