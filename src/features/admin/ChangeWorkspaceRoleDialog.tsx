import { useEffect, useRef, useState } from 'react'
import { FiAlertCircle, FiFolder, FiX } from 'react-icons/fi'
import { workspaceDetails, type DirectoryUser, type Workspace } from './directoryData'

type Props = {
  user: DirectoryUser
  workspace: Workspace
  onSave: (role: string) => void
  onClose: () => void
}

export function ChangeWorkspaceRoleDialog({ user, workspace, onSave, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [role, setRole] = useState(user.roles[workspace] ?? '')
  const details = workspaceDetails[workspace]
  useEffect(() => { ref.current?.showModal() }, [])

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="role-dialog-title" className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-32px)] max-w-[460px] overflow-y-auto rounded-[18px] border border-[#e1e8f3] bg-white font-[Arial,Helvetica,sans-serif] text-[#152e5e] shadow-xl backdrop:bg-[#11254b]/45">
      <header className="flex items-center justify-between gap-4 bg-[#f7f9fe] px-7 py-5"><h2 id="role-dialog-title" className="text-xl font-bold">Change workspace role</h2><button onClick={onClose} aria-label="Close role editor" className="rounded-full p-1 text-[#7e90b1] hover:bg-[#eaf0fa]"><FiX /></button></header>
      <form onSubmit={event => { event.preventDefault(); onSave(role) }} className="space-y-6 p-7">
        <div><h3 className="text-[10px] font-bold text-[#7e90b1]">USER</h3><p className="mt-2 text-sm font-bold">{user.name}</p><p className="mt-1 text-xs text-[#7e90b1]">{user.email}</p></div>
        <div><h3 className="text-[10px] font-bold text-[#7e90b1]">WORKSPACE</h3><div className="mt-2 flex items-center gap-3 rounded-lg border border-[#e1e8f3] bg-[#f4f6fc] px-3 py-2.5 text-xs font-bold"><FiFolder className="size-5 shrink-0" />{details.name}</div></div>
        <div><label htmlFor="workspace-role" className="text-[10px] font-bold text-[#7e90b1]">ASSIGN ROLE</label><select id="workspace-role" value={role} onChange={event => setRole(event.target.value)} className="mt-2 w-full rounded-lg border border-[#afc3e8] bg-white px-3 py-3 text-xs font-bold"><option value="">No access</option>{details.roles.map(option => <option key={option}>{option}</option>)}</select>
          <div className="mt-2 flex items-start gap-3 rounded-xl bg-[#fff8e6] p-3 text-xs"><FiAlertCircle className="mt-0.5 size-4 shrink-0 text-[#d89a00]" /><div><p className="font-bold">{role ? 'Changing this role updates access permissions' : 'This removes access to this workspace only'}</p><p className="mt-2 leading-relaxed text-[#7e90b1]">For {workspace} after saving. Other workspace roles stay the same.</p></div></div>
        </div>
        <div className="flex gap-3"><button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#e1e8f3] px-3 py-3 text-xs font-bold hover:bg-[#f7f9fe]">Cancel</button><button type="submit" className="flex-1 rounded-lg bg-[#132d5d] px-3 py-3 text-xs font-bold text-white hover:bg-[#29477b]">Save role change</button></div>
      </form>
    </dialog>
  )
}
