import { useState } from 'react'
import { FiGrid, FiMenu, FiSettings, FiUser } from 'react-icons/fi'
import { WorkspaceDrawer } from './WorkspaceDrawer'
import { SchoolBrand } from '../../components/SchoolBrand'
import crest from '../../assets/Cropped Blue Crest Emblem.png'

type WorkspaceSidebarProps = { accountName: string; onProfile: () => void; onSettings: () => void; onHelp: () => void; onSignOut: () => void }

export function WorkspaceSidebar({ accountName, onProfile, onSettings, onHelp, onSignOut }: WorkspaceSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const itemClass = 'relative flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-xs text-[#c6d1e9] hover:bg-white/10 mobile:w-auto mobile:px-3'
  return (
    <aside className="relative z-10 w-[202px] shrink-0 overflow-hidden bg-[#152d56] mobile:w-full mobile:bg-[linear-gradient(110deg,#17385e,#0c2548)] mobile:shadow-lg">
      <div className="relative z-10 px-5 pt-7 mobile:flex mobile:items-center mobile:justify-between mobile:gap-4 mobile:px-6 mobile:py-3">
        <SchoolBrand light className="gap-2 [&_img]:h-[58px] [&_img]:w-[47px] [&_span]:text-lg mobile:gap-3 mobile:[&_img]:h-[50px] mobile:[&_img]:w-10 mobile:[&_span]:text-[18px]" />
        <button type="button" className="hidden rounded-xl p-3 text-white hover:bg-white/10 mobile:block" aria-label="Open navigation menu" aria-expanded={drawerOpen} aria-controls="workspace-drawer" onClick={() => setDrawerOpen(true)}><FiMenu className="size-7" aria-hidden="true" /></button>
        <nav className="mt-12 space-y-2 mobile:hidden" aria-label="Account navigation">
          <a href="/workspaces" aria-current="page" className={`${itemClass} bg-[#294479] font-bold text-white before:absolute before:inset-y-0 before:-left-1 before:w-[3px] before:rounded-full before:bg-school-yellow mobile:before:top-auto mobile:before:-bottom-1 mobile:before:left-0 mobile:before:right-0 mobile:before:h-[3px] mobile:before:w-auto`}>
            <FiGrid className="size-4 shrink-0" aria-hidden="true" /><span className="max-[480px]:sr-only">My Workspace</span>
          </a>
          <button type="button" className={itemClass} onClick={onProfile}><FiUser className="size-4 shrink-0" aria-hidden="true" /><span className="mobile:sr-only">Profile</span></button>
          <button type="button" className={itemClass} onClick={onSettings}><FiSettings className="size-4 shrink-0" aria-hidden="true" /><span className="mobile:sr-only">Settings</span></button>
        </nav>
      </div>
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full mobile:hidden" viewBox="0 0 202 450" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0C175 25 238 174 202 450H0Z" fill="#29447c" />
        <path d="M0 0C175 25 238 174 202 450" fill="none" stroke="#bea436" />
        <circle cx="195" cy="140" r="8" fill="#ffd43b" />
      </svg>
      <img src={crest} alt="" className="pointer-events-none absolute bottom-[-6%] left-0 h-[43%] w-auto max-w-none opacity-65 mobile:hidden" />
      {drawerOpen && <WorkspaceDrawer accountName={accountName} onClose={() => setDrawerOpen(false)} onProfile={onProfile} onSettings={onSettings} onHelp={onHelp} onSignOut={onSignOut} />}
    </aside>
  )
}


