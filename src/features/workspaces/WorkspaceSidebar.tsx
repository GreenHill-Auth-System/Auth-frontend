import { FiGrid, FiSettings, FiUser } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import crest from '../../assets/Cropped Blue Crest Emblem.png'

type WorkspaceSidebarProps = { onProfile: () => void; onSettings: () => void }

export function WorkspaceSidebar({ onProfile, onSettings }: WorkspaceSidebarProps) {
  const itemClass = 'relative flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-xs text-[#c6d1e9] hover:bg-white/10 max-lg:w-auto max-lg:px-3'
  return (
    <aside className="relative z-10 w-[202px] shrink-0 overflow-hidden bg-[#152d56] max-lg:w-full">
      <div className="relative z-10 px-5 pt-7 max-lg:flex max-lg:items-center max-lg:justify-between max-lg:gap-4 max-lg:px-4 max-lg:py-3">
        <SchoolBrand light className="gap-2 [&_img]:h-[58px] [&_img]:w-[47px] [&_span]:text-lg max-lg:[&_img]:h-10 max-lg:[&_img]:w-8 max-lg:[&_span]:text-sm" />
        <nav className="mt-12 space-y-2 max-lg:mt-0 max-lg:flex max-lg:gap-1 max-lg:space-y-0" aria-label="Account navigation">
          <a href="/workspaces" aria-current="page" className={`${itemClass} bg-[#294479] font-bold text-white before:absolute before:inset-y-0 before:-left-1 before:w-[3px] before:rounded-full before:bg-school-yellow`}>
            <FiGrid className="size-4 shrink-0" aria-hidden="true" /><span className="max-[480px]:sr-only">My Workspace</span>
          </a>
          <button type="button" className={itemClass} onClick={onProfile}><FiUser className="size-4 shrink-0" aria-hidden="true" /><span className="max-lg:sr-only">Profile</span></button>
          <button type="button" className={itemClass} onClick={onSettings}><FiSettings className="size-4 shrink-0" aria-hidden="true" /><span className="max-lg:sr-only">Settings</span></button>
        </nav>
      </div>
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full max-lg:hidden" viewBox="0 0 202 450" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0C175 25 238 174 202 450H0Z" fill="#29447c" />
        <path d="M0 0C175 25 238 174 202 450" fill="none" stroke="#bea436" />
        <circle cx="195" cy="140" r="8" fill="#ffd43b" />
      </svg>
      <img src={crest} alt="" className="pointer-events-none absolute bottom-[-6%] left-0 h-[43%] w-auto max-w-none opacity-65 max-lg:hidden" />
    </aside>
  )
}
