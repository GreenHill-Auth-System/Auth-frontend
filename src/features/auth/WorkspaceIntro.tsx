import { FiBarChart2, FiBriefcase } from 'react-icons/fi'
import { IntroArtwork } from './IntroArtwork'
import { MobileIntroArtwork } from './MobileIntroArtwork'
import crest from '../../assets/Cropped Blue Crest Emblem.png'
import ismpLogo from '../../assets/Ismp logo.jpeg'
import { SchoolBrand } from '../../components/SchoolBrand'

type WorkspaceIntroItem = {
  title: string
  description: string
  icon?: typeof FiBriefcase
  image?: string
  position: string
  color: string
}

const workspaces: WorkspaceIntroItem[] = [
  { title: 'Procurement', description: 'Purchasing, vendors & approvals', icon: FiBriefcase, position: 'left-[62%] top-[43%]', color: 'bg-[#fff9e5]' },
  { title: 'Executive Dashboard', description: 'Performance, KPIs & insights', icon: FiBarChart2, position: 'left-[57%] top-[57%]', color: 'bg-white' },
  { title: 'Incident & Service', description: 'Requests, incidents & support', image: ismpLogo, position: 'left-[53.5%] top-[70.5%]', color: 'bg-white' },
]

export function WorkspaceIntro() {
  return (
    <aside className="relative min-h-0 overflow-hidden text-white mobile:min-h-[350px] mobile:basis-auto mobile:shrink-0 mobile:tablet-roomy:min-h-[480px]" aria-label="Greenhill digital workspace">
      <IntroArtwork />
      <MobileIntroArtwork />
      {/* The crest stays separate from the stretched artwork to preserve its proportions. */}
      <img className="pointer-events-none absolute bottom-[-4%] left-0 h-[46%] w-auto max-w-none opacity-75 mobile:hidden" src={crest} alt="" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] mobile:relative mobile:flex mobile:flex-col mobile:gap-3 mobile:px-5 mobile:pt-4 mobile:pb-14 mobile-tight:gap-2 mobile-tight:pt-3 mobile-tight:pb-7 mobile:tablet-roomy:gap-5 mobile:tablet-roomy:px-12 mobile:tablet-roomy:pt-7 mobile:tablet-roomy:pb-20">
        <SchoolBrand light className="absolute top-[3.5%] left-[9%] mobile:static" />
        <div className="absolute top-[27%] left-[9%] mobile:static">
          <h1 className="mb-3 text-[clamp(25px,3vw,44px)] leading-[1.08] font-bold tracking-[-.6px] short:text-[clamp(20px,3vw,32px)] mobile:mb-0 mobile:text-[22px] mobile-tight:text-[20px] mobile:tablet-roomy:text-[30px]">
            One account.<br /><span className="text-school-yellow">Three powerful tools.</span>
          </h1>
          <p className="text-[clamp(13px,1.5vw,20px)] leading-[1.25] text-[#d1d8e7] short:text-[clamp(11px,1.5vw,16px)] mobile:mt-1 mobile:text-[13px] mobile-tight:text-[11px] mobile:tablet-roomy:text-base">
            Access the Greenhill digital workspace<br />from one secure account.
          </p>
        </div>
        <div className="absolute inset-0 mobile:static mobile:grid mobile:grid-cols-3 mobile:gap-2">
          {workspaces.map(({ title, description, icon: Icon, image, position, color }) => (
            <div className={`absolute flex w-[36%] items-center gap-3 narrow:gap-2 mobile:static mobile:w-auto mobile:flex-col mobile:gap-1 mobile:text-center ${position}`} key={title}>
              <span className={`grid size-[clamp(36px,8svh,75px)] shrink-0 place-items-center rounded-full text-navy mobile:size-9 mobile-tight:size-6 mobile:tablet-roomy:size-12 ${color} overflow-hidden`}>
                {image ? (
                  <img src={image} alt="" className="size-[70%] object-contain rounded-sm" />
                ) : Icon ? (
                  <Icon className={`size-[45%] stroke-[2.7] ${title === 'Executive Dashboard' ? 'text-[#d5a422]' : ''}`} aria-hidden="true" />
                ) : null}
              </span>
              <div>
                <h2 className="mb-[3px] text-[clamp(11px,1.1vw,17px)] leading-[1.15] font-bold narrow:text-[11px] mobile:mb-1 mobile:text-[11px] mobile-tight:mb-0.5 mobile-tight:text-[10px] mobile:tablet-roomy:text-sm">{title}</h2>
                <p className="max-w-[170px] text-[clamp(10px,1vw,16px)] leading-[1.2] text-[#c6cee0] narrow:text-[10px] mobile:text-[10px] mobile-tight:text-[9px] mobile:tablet-roomy:text-xs">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
