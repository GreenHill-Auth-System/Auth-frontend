import { FiArrowRight } from 'react-icons/fi'
import type { Workspace } from './workspaces'
import { WorkspaceIcon } from './WorkspaceIcon'

type WorkspaceCardProps = { workspace: Workspace; onSelect: (workspace: Workspace) => void }

export function WorkspaceCard({ workspace, onSelect }: WorkspaceCardProps) {
  return (
    <button type="button" onClick={() => onSelect(workspace)}
      className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-[10px] border border-[#eceef4] px-7 py-6 mobile:sm:px-4 text-left shadow-[0_8px_18px_#16315c0d] hover:-translate-y-1 hover:shadow-[0_12px_24px_#16315c18] motion-safe:transition-[transform,box-shadow] max-sm:min-h-[clamp(88px,16dvh,112px)] max-sm:rounded-[18px] max-sm:p-[clamp(8px,1.3dvh,16px)] ${workspace.background}`}>
      <span className="pointer-events-none absolute -top-9 -left-[70%] h-[125%] w-[160%] rounded-full bg-white max-sm:-top-[65%] max-sm:left-[72%] max-sm:h-[200%] max-sm:w-3/4 max-sm:rotate-[35deg] max-sm:bg-white/40" />
      <span className="relative z-[1] flex h-full w-full flex-col max-sm:flex-row max-sm:items-center max-sm:gap-3 max-[360px]:gap-2">
        <span className={`block shrink-0 max-sm:grid max-sm:place-items-center max-sm:rounded-2xl max-sm:size-[52px] max-[360px]:size-10 max-sm:[&_svg]:size-9 ${workspace.iconBackground}`}>
          <WorkspaceIcon workspace={workspace.id} />
        </span>
        <span className="my-4 block h-px w-12 bg-[#e9edf5] max-sm:hidden" />
        <span className="block min-w-0 flex-1">
          <span className="block min-h-10 text-base leading-[1.2] font-bold text-navy max-sm:min-h-0 max-sm:text-[14px] max-[360px]:text-xs">{workspace.title}</span>
          <span className="mt-3 block max-w-[165px] text-sm leading-[1.4] text-muted max-sm:max-w-none max-sm:mt-1 max-sm:text-xs max-[360px]:text-[11px]">{workspace.description}</span>
        </span>
        <span className={`mt-5 grid size-11 shrink-0 place-items-center rounded-full text-xl text-white max-sm:mt-0 max-sm:size-9 max-[360px]:size-7 ${workspace.arrow}`}><FiArrowRight aria-hidden="true" /></span>
      </span>
      <span className={`absolute inset-x-0 bottom-0 h-[6px] max-sm:inset-y-0 max-sm:right-auto max-sm:h-auto max-sm:w-[5px] ${workspace.accent} ${workspace.mobileAccent}`} />
    </button>
  )
}




