import crest from '../assets/Greenhill Schools Crest Emblem.png'
import whiteCrest from '../assets/Greenhill Schools White Crest Logo.png'

type SchoolBrandProps = { light?: boolean; className?: string }

export function SchoolBrand({ light = false, className = '' }: SchoolBrandProps) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-white' : 'text-navy'} ${className}`}>
      <img
        className="h-[70px] w-[57px] object-contain compact:h-[52px] compact:w-[43px] short:h-[43px] short:w-[35px] mobile:h-[45px] mobile:w-[37px] mobile-tight:h-[34px] mobile-tight:w-7"
        src={light ? whiteCrest : crest}
        alt="Greenhill Schools crest"
      />
      <span className="text-xl leading-[.96] font-[750] compact:text-[17px] short:text-sm mobile:text-[17px] mobile-tight:text-sm">
        GREENHILL<br />SCHOOLS
      </span>
    </div>
  )
}