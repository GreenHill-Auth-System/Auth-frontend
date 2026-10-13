import type { WorkspaceId } from './workspaces'
import ismpLogo from '../../assets/Ismp logo.jpeg'

export function WorkspaceIcon({ workspace }: { workspace: WorkspaceId }) {
  if (workspace === 'service') {
    return (
      <img
        src={ismpLogo}
        alt="Incident & Service Management"
        className="size-12 shrink-0 rounded-lg object-contain max-sm:size-9"
      />
    )
  }

  return (
    <svg viewBox="0 0 48 48" className="size-12 shrink-0" fill="none" aria-hidden="true">
      {workspace === 'procurement' && <>
        <path d="M5 5h15l7 7h15a3 3 0 0 1 3 3v29H5Z" fill="#18345f" />
        <rect x="14" y="21" width="27" height="19" rx="1.5" fill="white" />
        <path d="M24 31h8" stroke="#f8c731" strokeWidth="3" strokeLinecap="round" />
      </>}
      {workspace === 'executive' && <>
        <rect x="5" y="28" width="10" height="16" rx="1.5" fill="#f8c731" />
        <rect x="20" y="17" width="10" height="27" rx="1.5" fill="#885acc" />
        <rect x="35" y="5" width="10" height="39" rx="1.5" fill="#373581" />
      </>}
    </svg>
  )
}
