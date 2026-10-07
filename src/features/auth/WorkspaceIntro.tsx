import { FiBarChart2, FiBriefcase, FiMessageSquare } from 'react-icons/fi'
import { IntroArtwork } from './IntroArtwork'
import crest from '../../assets/Cropped Blue Crest Emblem.png'
import { SchoolBrand } from '../../components/SchoolBrand'

const workspaces = [
  { title: 'Procurement', description: 'Purchasing, vendors & approvals', icon: FiBriefcase, position: 'left-[62%] top-[43%]', color: 'bg-[#fff9e5]' },
  { title: 'Executive Dashboard', description: 'Performance, KPIs & insights', icon: FiBarChart2, position: 'left-[57%] top-[57%]', color: 'bg-white' },
  { title: 'Incident & Service', description: 'Requests, incidents & support', icon: FiMessageSquare, position: 'left-[53.5%] top-[70.5%]', color: 'bg-white' },
]

export function WorkspaceIntro() {
  return (
    <aside className="relative min-h-0 overflow-hidden text-white mobile:basis-1/4 mobile:shrink-0 mobile-short:hidden" aria-label="Greenhill digital workspace">
      <IntroArtwork />
      {/* The crest stays separate from the stretched artwork to preserve its proportions. */}
      <img className="pointer-events-none absolute bottom-[-4%] left-0 h-[46%] w-auto max-w-none opacity-75 mobile:hidden" src={crest} alt="" aria-hidden="true" />
      <div className="absolute inset-0 z-[1]">
        <SchoolBrand light className="absolute top-[3.5%] left-[9%] mobile:top-[12%] mobile:left-[7%]" />
        <div className="absolute top-[27%] left-[9%] mobile:top-[55%] mobile:left-[7%]">
          <h1 className="mb-3 text-[clamp(25px,3vw,44px)] leading-[1.08] font-bold tracking-[-.6px] short:text-[clamp(20px,3vw,32px)] mobile:mb-0 mobile:text-[22px]">
            One account.<br /><span className="text-school-yellow">Three powerful tools.</span>
          </h1>
          <p className="text-[clamp(13px,1.5vw,20px)] leading-[1.25] text-[#d1d8e7] short:text-[clamp(11px,1.5vw,16px)] mobile:hidden">
            Access the Greenhill digital workspace<br />from one secure account.
          </p>
        </div>
        <div className="absolute inset-0 mobile:hidden">
          {workspaces.map(({ title, description, icon: Icon, position, color }) => (
            <div className={`absolute flex w-[36%] items-center gap-3 narrow:gap-2 ${position}`} key={title}>
              <span className={`grid size-[clamp(36px,8svh,75px)] shrink-0 place-items-center rounded-full text-navy ${color}`}>
                <Icon className={`size-[45%] stroke-[2.7] ${title === 'Executive Dashboard' ? 'text-[#d5a422]' : ''}`} aria-hidden="true" />
              </span>
              <div>
                <h2 className="mb-[3px] text-[clamp(11px,1.1vw,17px)] leading-[1.15] font-bold narrow:text-[11px]">{title}</h2>
                <p className="max-w-[170px] text-[clamp(10px,1vw,16px)] leading-[1.2] text-[#c6cee0] narrow:text-[10px]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
