import { FiArrowRight } from 'react-icons/fi'
import type { Workspace } from './workspaces'
import { WorkspaceIcon } from './WorkspaceIcon'

type WorkspaceCardProps = { workspace: Workspace; onSelect: (workspace: Workspace) => void }

export function WorkspaceCard({ workspace, onSelect }: WorkspaceCardProps) {
  return (
    <button type="button" onClick={() => onSelect(workspace)}
      className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-[10px] border border-[#eceef4] px-7 py-6 text-left shadow-[0_8px_18px_#16315c0d] hover:-translate-y-1 hover:shadow-[0_12px_24px_#16315c18] motion-safe:transition-[transform,box-shadow] max-sm:min-h-0 max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:p-3 ${workspace.background}`}>
      <span className="pointer-events-none absolute -top-9 -left-[70%] h-[125%] w-[160%] rounded-full bg-white max-sm:hidden" />
      <span className="relative z-[1] flex h-full w-full flex-col max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:[&>svg]:size-9">
        <WorkspaceIcon workspace={workspace.id} />
        <span className="my-4 block h-px w-12 bg-[#e9edf5] max-sm:hidden" />
        <span className="block flex-1">
          <span className="block min-h-10 text-base leading-[1.2] font-bold text-navy max-sm:min-h-0 max-sm:text-[13px]">{workspace.title}</span>
          <span className="mt-3 block max-w-[165px] text-sm leading-[1.4] text-muted max-sm:mt-1 max-sm:max-w-none max-sm:text-[11px]">{workspace.description}</span>
        </span>
        <span className={`mt-5 grid size-11 shrink-0 place-items-center rounded-full text-xl text-white max-sm:mt-0 max-sm:size-8 ${workspace.arrow}`}><FiArrowRight aria-hidden="true" /></span>
      </span>
      <span className={`absolute inset-x-0 bottom-0 h-[6px] ${workspace.accent}`} />
    </button>
  )
}
