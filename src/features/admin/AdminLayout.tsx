import { useEffect, useState, type ReactNode } from 'react'
import { FiGrid, FiUser, FiHelpCircle, FiShield, FiSettings, FiMenu, FiX, FiCalendar } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import { InfoDialog } from '../../components/InfoDialog'

const navigation = [
  { title: 'Overview', icon: FiGrid },
  { title: 'User Management', icon: FiUser },
  { title: 'Support Requests', icon: FiHelpCircle, count: 5 },
  { title: 'Access & Security', icon: FiShield },
  { title: 'System Settings', icon: FiSettings },
]

type AdminLayoutProps = {
  title: string
  subtitle: string
  active: 'Overview' | 'User Management'
  onNavigate: (path: string) => void
  children: ReactNode
}

export function AdminLayout({ title, subtitle, active, onNavigate, children }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(null)
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const updateDate = () => setToday(new Date())
    const interval = window.setInterval(updateDate, 1000)
    window.addEventListener('focus', updateDate)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', updateDate)
    }
  }, [])
  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Kampala', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(today)
  const dateValue = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Kampala', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(today)
  function openScreen(screen: string) {
    setMenuOpen(false)
    if (screen === 'Overview') return onNavigate('/super-admin')
    if (screen === 'User Management') return onNavigate('/super-admin/users')
    setDialog({ title: screen, message: `${screen} is planned for an upcoming screen.` })
  }
  return (
    <div className="min-h-svh bg-[#f7f9fe] font-[Arial,Helvetica,sans-serif] text-sm text-[#152e5e] [&_button:focus-visible]:outline-3 [&_button:focus-visible]:outline-[#e2ad21] [&_button:focus-visible]:outline-offset-3 [&_select:focus-visible]:outline-3 [&_select:focus-visible]:outline-[#e2ad21] [&_select:focus-visible]:outline-offset-3">
      {menuOpen && <button className="fixed inset-0 z-[29] hidden bg-[#0d1c43]/50 max-[700px]:block" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-[232px] flex-col overflow-hidden bg-[#11254b] text-[#b9c6df] max-[1200px]:w-[202px] max-[700px]:w-[232px] max-[700px]:transition-transform ${menuOpen ? 'max-[700px]:translate-x-0' : 'max-[700px]:-translate-x-full'}`} aria-label="Super admin sidebar">
        <SchoolBrand light className="mx-7 mt-7 mb-12 gap-3 [&_img]:h-[58px]! [&_img]:w-[52px]! [&_span]:text-[19px]! [&_span]:leading-[1.02]! max-[1200px]:ml-6 max-[1200px]:mr-5 max-[1200px]:[&_span]:text-[17px]! max-[1200px]:[&_img]:w-[45px]! max-[1200px]:[&_img]:h-[52px]!" />
        <button className="absolute right-2 top-[7px] hidden place-items-center rounded-md p-1.5 text-[22px] max-[700px]:grid" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><FiX /></button>
        <nav className="relative z-20 px-3.5" aria-label="Administration">
          {navigation.map(({ title, icon: Icon, count }) => (
            <button key={title} className={`relative mb-3 flex min-h-[47px] w-full items-center gap-[15px] rounded-[11px] px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#243e6c] [&_svg]:shrink-0 [&_svg]:text-[23px] [&_svg]:stroke-[1.5] [&_span]:whitespace-nowrap [&_b]:ml-auto [&_b]:grid [&_b]:h-[21px] [&_b]:min-w-[21px] [&_b]:place-items-center [&_b]:rounded-full [&_b]:bg-[#ffce36] [&_b]:text-[11px] [&_b]:text-[#11254b] max-[1200px]:gap-3 max-[1200px]:pl-3.5 max-[1200px]:text-xs ${title === active ? 'bg-[#2b467c] font-bold text-white before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-[3px] before:bg-[#ffce36] [&_svg]:text-[#ffce36]' : ''}`} aria-current={title === active ? 'page' : undefined} onClick={() => openScreen(title)}>
              <Icon aria-hidden="true" /><span>{title}</span>{count && <b>{count}</b>}
            </button>
          ))}
        </nav>
        <div className="absolute -bottom-[165px] -left-[158px] h-[490px] w-[400px] -rotate-[25deg] rounded-full bg-[#1d3d76] before:absolute before:inset-x-5 before:top-[69px] before:bottom-0 before:rounded-full before:border before:border-[#c59c31] after:absolute after:inset-x-[60px] after:top-[108px] after:bottom-2.5 after:rounded-full after:border-4 after:border-[#607fae]" aria-hidden="true" />
        <div className="relative z-10 mx-[25px] mt-auto mb-[35px] flex items-center gap-2.5 border-t border-white/8 pt-[25px] [&_strong]:block [&_strong]:whitespace-nowrap [&_strong]:text-[11px] [&_strong]:text-white [&_small]:mt-[3px] [&_small]:block [&_small]:text-[10px] max-[1200px]:mr-5"><span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#eaf0fc] text-xs font-bold text-[#183460]">SA</span><div><strong>Super Administrator</strong><small>GreenHill Auth</small></div></div>
      </aside>
      <div className="ml-[232px] flex min-h-svh flex-col max-[1200px]:ml-[202px] max-[700px]:ml-0">
        <header className="sticky top-0 z-20 flex h-[86px] items-center gap-[15px] border-b border-[#e8edf6] bg-white px-[42px] [&_h1]:mb-[5px] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-[1.2] [&_p]:text-xs [&_p]:tracking-[.15px] [&_p]:text-[#7e90b1] max-[1200px]:h-[74px] max-[1200px]:px-[37px] max-[1200px]:[&_h1]:text-[22px] max-[1000px]:px-6 max-[1000px]:[&_h1]:text-xl max-[700px]:h-20 max-[700px]:gap-[9px] max-[700px]:px-[15px] max-[700px]:[&_h1]:text-lg max-[700px]:[&_p]:max-w-[220px] max-[700px]:[&_p]:text-[10px]">
          <button className="hidden place-items-center rounded-md p-1.5 text-[22px] max-[700px]:grid" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><FiMenu /></button>
          <div><h1>{title}</h1><p>{subtitle}</p><time dateTime={dateValue} title="Current date in Kampala (East Africa Time)" className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#7e90b1] max-[700px]:text-[10px]"><FiCalendar aria-hidden="true" className="size-3 shrink-0" />{dateLabel}</time></div>
          <div className="ml-auto flex items-center gap-[11px] text-xs max-[700px]:gap-[5px] max-[700px]:[&_strong]:hidden"><span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#eaf0fc] text-xs font-bold text-[#183460]">SA</span><strong>Admin</strong></div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] flex-1 px-[27px] pt-[19px] pb-4 min-[1450px]:pt-7 max-[1200px]:px-[23px] max-[1200px]:pt-4 max-[700px]:p-4">
          {children}
        </main>
        <footer className="mx-auto flex w-full max-w-[1500px] flex-wrap justify-between gap-2 px-10 py-4 text-[9px] text-[#93a2bc] max-[700px]:px-4">
          <span>GREENHILL SCHOOLS &middot; AUTHENTICATION ADMINISTRATION</span>
          <span>Preview &middot; Sample data</span>
        </footer>
      </div>
      {dialog && <InfoDialog {...dialog} onClose={() => setDialog(null)} />}
    </div>
  )
}
