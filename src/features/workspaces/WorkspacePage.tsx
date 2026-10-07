import { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiHelpCircle, FiLogOut } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import { InfoDialog } from '../../components/InfoDialog'
import { WorkspaceCard } from './WorkspaceCard'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { workspaces } from './workspaces'
import type { Workspace } from './workspaces'

type WorkspacePageProps = { onSignOut: () => void }
type DialogContent = { title: string; message: string }

export function WorkspacePage({ onSignOut }: WorkspacePageProps) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [dialog, setDialog] = useState<DialogContent | null>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false)
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function selectWorkspace(workspace: Workspace) {
    setDialog({ title: workspace.title, message: 'This workspace will be available once its system is connected.' })
  }

  return (
    <main className="relative flex min-h-svh overflow-hidden bg-[#152d56] max-lg:flex-col">
      <WorkspaceSidebar
        onProfile={() => setDialog({ title: 'Profile', message: 'Your account profile will be available once authentication is connected.' })}
        onSettings={() => setDialog({ title: 'Settings', message: 'Account settings will be available once account management is connected.' })}
      />
      <section className="relative isolate flex min-w-0 flex-1 flex-col overflow-hidden [border-bottom-left-radius:150px_360px] bg-white px-[6%] pb-12 max-lg:px-7 max-lg:rounded-none max-sm:px-5 max-sm:pb-5" aria-labelledby="workspace-heading">
        <svg className="pointer-events-none absolute inset-0 -z-10 size-full" viewBox="0 0 950 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H205Q70 60 0 185Z" fill="#fff8df" opacity=".85" />
          <path d="M950 624Q720 680 575 760H950Z" fill="#eee5f7" />
          <path d="M950 716Q797 665 605 760H950Z" fill="#b69ace" opacity=".9" />
          <path d="M904 64C865 140 861 181 902 212L950 239M700 750Q817 664 950 711" fill="none" stroke="#f7ca54" strokeWidth=".8" />
          <circle cx="901" cy="198" r="7.5" fill="#f8c731" />
          <circle cx="28" cy="61" r="1.5" fill="#7b94b4" />
        </svg>
        <header className="flex h-[82px] shrink-0 items-center justify-end max-sm:h-[52px]">
          <div ref={accountRef} className="relative">
            <button type="button" className="flex items-center gap-3 rounded-full p-1 text-xs font-bold text-navy hover:bg-slate-50" aria-expanded={accountOpen} aria-controls="account-actions" onClick={() => setAccountOpen(!accountOpen)}>
              <span className="grid size-10 place-items-center rounded-full border-2 border-white bg-[#e9edf4] text-sm text-[#304b75] shadow-sm" aria-hidden="true">AI</span>
              <span>Alphonsine Ishimwe</span><FiChevronDown className="ml-1 size-4" aria-hidden="true" />
            </button>
            {accountOpen && <div id="account-actions" className="absolute top-full right-0 z-20 mt-2 w-44 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
              <button type="button" onClick={onSignOut} className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-navy hover:bg-slate-50"><FiLogOut aria-hidden="true" />Sign out</button>
            </div>}
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-[930px] flex-1 flex-col items-center justify-center pb-4 max-sm:justify-start">
          <SchoolBrand className="justify-center gap-3 max-sm:hidden [&_img]:h-[74px] [&_img]:w-[60px] [&_span]:text-[23px] max-sm:[&_img]:h-14 max-sm:[&_img]:w-11 max-sm:[&_span]:text-lg" />
          <div className="mt-12 text-center max-sm:mt-4">
            <h1 id="workspace-heading" className="text-[32px] leading-tight font-bold tracking-[-.5px] text-navy max-lg:text-[28px] max-sm:text-[25px]">Choose your workspace</h1>
            <p className="mt-1 text-base tracking-[.2px] text-muted max-sm:text-sm">Select the system you want to access.</p>
          </div>
          <div className="mt-9 grid w-full grid-cols-3 gap-7 max-lg:gap-4 max-sm:mt-5 max-sm:grid-cols-1 max-sm:gap-3">
            {workspaces.map(workspace => <WorkspaceCard key={workspace.id} workspace={workspace} onSelect={selectWorkspace} />)}
          </div>
          <button type="button" onClick={() => setDialog({ title: 'Need help?', message: 'Contact the ICT Support Team for help accessing your workspace.' })} className="mt-12 flex items-center gap-4 rounded-lg px-3 py-2 text-left hover:bg-white/70 max-sm:mt-4">
            <FiHelpCircle className="size-6 shrink-0 text-navy" aria-hidden="true" />
            <span className="border-l border-[#e8ecf3] pl-3"><span className="block text-xs font-bold text-navy">Need help?</span><span className="mt-1 block text-xs text-muted">Contact the ICT Support Team</span></span>
          </button>
        </div>
      </section>
      {dialog && <InfoDialog {...dialog} onClose={() => setDialog(null)} />}
    </main>
  )
}
