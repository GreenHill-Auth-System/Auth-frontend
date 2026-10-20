import { useEffect, useRef, useState } from 'react'
import { FiBarChart2, FiFolder, FiMessageCircle, FiX } from 'react-icons/fi'
import { ChangeWorkspaceRoleDialog } from './ChangeWorkspaceRoleDialog'
import { workspaceDetails, workspaceOptions, type DirectoryUser, type Workspace } from './directoryData'

type Props = {
  user: DirectoryUser
  onSaveRole: (userId: number, workspace: Workspace, role: string) => void
  onClose: () => void
}
const icons = { PMS: FiFolder, EID: FiBarChart2, ISMP: FiMessageCircle }
const iconColors = { PMS: 'text-[#ffc72e]', EID: 'text-[#7c35b5]', ISMP: 'text-[#287bd0]' }

export function ManageUserDrawer({ user, onSaveRole, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return (
    <dialog ref={ref} onClose={onClose}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          onClose()
        }
      }}
      aria-labelledby="manage-user-title" className="fixed inset-y-0 right-0 left-auto m-0 h-svh max-h-none w-[700px] max-w-full overflow-y-auto border-0 border-l border-[#e1e8f3] bg-white font-[Arial,Helvetica,sans-serif] text-[#152e5e] shadow-xl backdrop:bg-[#11254b]/35">
      <div className="flex min-h-full flex-col px-7 py-6 max-[500px]:px-4">
        <header className="mb-6 flex items-start justify-between gap-4"><div><h2 id="manage-user-title" className="text-2xl font-bold">Manage user</h2><p className="mt-1.5 text-xs text-[#7e90b1]">Review identity, workspace roles and access status.</p></div><button onClick={onClose} aria-label="Close manage user" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eef2fa] hover:bg-[#e1e8f3]"><FiX /></button></header>
        <section aria-label="User identity" className="flex items-center gap-3 rounded-2xl border border-[#e1e8f3] p-5 shadow-[0_5px_0_#f1f4fa]">
          <span className={`grid size-14 shrink-0 place-items-center rounded-full text-lg font-bold ${user.avatar}`}>{user.name.split(' ').map(part => part[0]).slice(0, 2).join('')}</span>
          <div className="min-w-0"><h3 className="text-lg font-bold">{user.name}</h3><p className="mt-1 break-all text-xs text-[#7e90b1]">{user.email}</p><div className="mt-3 flex flex-wrap gap-3"><span className={`rounded-full px-3 py-1 text-[10px] font-bold ${user.status === 'Active' ? 'bg-[#e4f6ee] text-[#188450]' : 'bg-[#fce8eb] text-[#ce4157]'}`}>{user.status} account</span><span className="rounded-full bg-[#eef2fa] px-3 py-1 text-[10px] font-bold">Google Workspace</span></div></div>
        </section>
        <section aria-labelledby="workspace-roles-title" className="mt-6"><h3 id="workspace-roles-title" className="text-lg font-bold">Workspace roles</h3><p className="mt-1 text-xs text-[#7e90b1]">A user can hold different roles in each authorized workspace.</p>
          <div className="mt-5 space-y-3">{workspaceOptions.map(workspace => {
            const Icon = icons[workspace]
            return <article key={workspace} className="flex items-center gap-3 rounded-2xl border border-[#e1e8f3] px-3 py-4 shadow-[0_5px_0_#f1f4fa] max-[500px]:flex-wrap">
              <span className={`grid size-12 shrink-0 place-items-center rounded-full bg-[#f1f4fb] ${iconColors[workspace]}`}><Icon className="size-6" /></span>
              <div className="min-w-0 flex-1"><h4 className="text-sm font-bold">{workspaceDetails[workspace].name}</h4><p className="mt-2 text-xs text-[#7e90b1]">Current role: {user.roles[workspace] ?? 'No access'}</p></div>
              <button onClick={() => setEditingWorkspace(workspace)} aria-label={`Change ${workspace} role for ${user.name}`} className="w-32 shrink-0 rounded-lg border border-[#e1e8f3] bg-[#f5f7fd] px-3 py-2.5 text-[11px] font-bold hover:bg-[#eaf0fa] max-[500px]:ml-auto">Change role</button>
            </article>
          })}</div>
        </section>
        {notice && <p role="status" className="mt-5 text-xs text-[#188450]">{notice}</p>}
        <section aria-label="Security and access" className="mt-8 rounded-xl bg-[#f6f8fd] p-4"><h3 className="text-sm font-bold">Security &amp; access</h3><p className="mt-2 text-xs leading-relaxed text-[#7e90b1]">Last sign-in: Not available &middot; MFA status: Not available</p><p className="mt-2 text-[10px] text-[#93a2bc]">Frontend preview. Identity and security details will come from Google Workspace.</p></section>
        <div className="mt-auto flex justify-end pt-4"><button onClick={onClose} className="w-56 rounded-lg bg-[#132d5d] px-5 py-3 text-xs font-bold text-white hover:bg-[#29477b]">Done</button></div>
      </div>
      {editingWorkspace && <ChangeWorkspaceRoleDialog key={editingWorkspace} user={user} workspace={editingWorkspace} onClose={() => setEditingWorkspace(null)} onSave={role => {
        onSaveRole(user.id, editingWorkspace, role)
        setNotice(`${editingWorkspace}: ${role || 'No access'} saved for this preview session.`)
        setEditingWorkspace(null)
      }} />}
    </dialog>
  )
}
