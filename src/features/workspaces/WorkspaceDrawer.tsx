import { useEffect, useRef } from 'react'
import { FiGrid, FiHelpCircle, FiLogOut, FiSettings, FiUser, FiX } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'

type WorkspaceDrawerProps = {
  accountName: string
  activeTab?: 'workspaces' | 'profile'
  onClose: () => void
  onWorkspaces: () => void
  onProfile: () => void
  onHelp: () => void
  onSettings: () => void
  onSignOut: () => void
}

export function WorkspaceDrawer({
  accountName,
  activeTab = 'workspaces',
  onClose,
  onWorkspaces,
  onProfile,
  onSettings,
  onHelp,
  onSignOut,
}: WorkspaceDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const initials = accountName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Native modal behavior traps focus, supports Escape, and restores focus on close.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.showModal()
    const compactLayout = window.matchMedia(
      '(max-width: 600px), (max-width: 1400px) and (min-height: 700px) and (max-aspect-ratio: 31/20)',
    )
    const closeOnDesktop = () => {
      if (!compactLayout.matches) dialogRef.current?.close()
    }
    compactLayout.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      compactLayout.removeEventListener('change', closeOnDesktop)
    }
  }, [])

  function select(action: () => void) {
    dialogRef.current?.close()
    action()
  }

  const itemClass =
    'flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm text-[#cfdaee] transition-colors hover:bg-white/10'
  const activeClass =
    'border-l-[3px] border-school-yellow bg-[#294479] font-bold text-white'

  return (
    <dialog
      ref={dialogRef}
      id="workspace-drawer"
      onClose={onClose}
      aria-labelledby="drawer-title"
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          dialogRef.current?.close()
      }}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(85vw,340px)] max-w-none border-0 bg-[#122b50] p-6 text-white shadow-2xl backdrop:bg-[#071a36]/55 motion-safe:animate-[workspace-drawer-in_.2s_ease-out]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="drawer-title" className="text-lg font-bold">
          Menu
        </h2>
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-white/10"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close menu"
        >
          <FiX className="size-6" />
        </button>
      </div>
      <SchoolBrand light className="mt-6 [&_img]:h-12 [&_img]:w-10 [&_span]:text-base" />
      <div className="my-7 flex items-center gap-3 border-y border-white/10 py-5">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e4ebf5] font-bold text-navy"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="text-sm font-semibold">{accountName}</span>
      </div>
      <nav className="space-y-2" aria-label="Mobile account navigation">
        <button
          type="button"
          aria-current={activeTab === 'workspaces' ? 'page' : undefined}
          className={`${itemClass} ${activeTab === 'workspaces' ? activeClass : ''}`}
          onClick={() => select(onWorkspaces)}
        >
          <FiGrid className="size-5" aria-hidden="true" />
          My Workspace
        </button>
        <button
          type="button"
          aria-current={activeTab === 'profile' ? 'page' : undefined}
          className={`${itemClass} ${activeTab === 'profile' ? activeClass : ''}`}
          onClick={() => select(onProfile)}
        >
          <FiUser className="size-5" aria-hidden="true" />
          Profile
        </button>
        <button
          type="button"
          className={itemClass}
          onClick={() => select(onSettings)}
        >
          <FiSettings className="size-5" aria-hidden="true" />
          Settings
        </button>
        <button
          type="button"
          className={itemClass}
          onClick={() => select(onHelp)}
        >
          <FiHelpCircle className="size-5" aria-hidden="true" />
          <span>
            Need help?
            <span className="mt-1 block text-xs font-normal">
              Contact the ICT Support Team
            </span>
          </span>
        </button>
      </nav>
      <button
        type="button"
        className={`${itemClass} mt-8 border-t border-white/10 pt-5`}
        onClick={() => select(onSignOut)}
      >
        <FiLogOut className="size-5" aria-hidden="true" />
        Sign out
      </button>
    </dialog>
  )
}
