import { useEffect, useState } from 'react'
import { FiGrid, FiUser, FiHelpCircle, FiShield, FiSettings, FiCrosshair, FiMenu, FiX, FiCalendar } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import { InfoDialog } from '../../components/InfoDialog'
import { AccessActivityChart } from './AccessActivityChart'

const navigation = [
  { title: 'Overview', icon: FiGrid },
  { title: 'User Management', icon: FiUser },
  { title: 'Support Requests', icon: FiHelpCircle, count: 5 },
  { title: 'Access & Security', icon: FiShield },
  { title: 'System Settings', icon: FiSettings },
]
const workspaces = [
  { name: 'Procurement Management', users: 742, color: '#ffca35' },
  { name: 'Executive Intelligence', users: 384, color: '#7c35b5' },
  { name: 'Incident & Service', users: 896, color: '#287bd0' },
]
const statColors: Record<string, string> = {
  navy: '',
  teal: '[&>span]:text-[#008f85] [&_p]:text-[#008f85]',
  purple: '[&>span]:text-[#842dd1] [&_p]:text-[#842dd1]',
  amber: '[&>span]:text-[#d58b00] [&_p]:text-[#d58b00]',
}
const stats = [
  { title: 'Total users', value: '1,284', detail: '+8.2% this month', icon: FiUser, color: 'navy' },
  { title: 'Active accounts', value: '1,196', detail: '93% of total', icon: FiShield, color: 'teal' },
  { title: 'Role assignments', value: '2,431', detail: 'Across 3 workspaces', icon: FiGrid, color: 'purple' },
  { title: 'Pending reviews', value: '18', detail: 'Requires attention', icon: FiCrosshair, color: 'amber' },
]

export function SuperAdminOverview() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(null)
  const [period, setPeriod] = useState('7')
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
  function openScreen(title: string) {
    setMenuOpen(false)
    if (title === 'Overview') return
    setDialog({ title, message: `${title} is planned for an upcoming screen. This overview currently displays sample data for the three GreenHill workspaces.` })
  }
  return (
    <div className="min-h-svh bg-[#f7f9fe] font-[Arial,Helvetica,sans-serif] text-sm text-[#152e5e] [&_button:focus-visible]:outline-3 [&_button:focus-visible]:outline-[#e2ad21] [&_button:focus-visible]:outline-offset-3 [&_select:focus-visible]:outline-3 [&_select:focus-visible]:outline-[#e2ad21] [&_select:focus-visible]:outline-offset-3">
      {menuOpen && <button className="fixed inset-0 z-[29] hidden bg-[#0d1c43]/50 max-[700px]:block" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-[232px] flex-col overflow-hidden bg-[#11254b] text-[#b9c6df] max-[1200px]:w-[202px] max-[700px]:w-[232px] max-[700px]:transition-transform ${menuOpen ? 'max-[700px]:translate-x-0' : 'max-[700px]:-translate-x-full'}`} aria-label="Super admin sidebar">
        <SchoolBrand light className="mx-7 mt-7 mb-12 gap-3 [&_img]:h-[58px]! [&_img]:w-[52px]! [&_span]:text-[19px]! [&_span]:leading-[1.02]! max-[1200px]:ml-6 max-[1200px]:mr-5 max-[1200px]:[&_span]:text-[17px]! max-[1200px]:[&_img]:w-[45px]! max-[1200px]:[&_img]:h-[52px]!" />
        <button className="absolute right-2 top-[7px] hidden place-items-center rounded-md p-1.5 text-[22px] max-[700px]:grid" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><FiX /></button>
        <nav className="relative z-20 px-3.5" aria-label="Administration">
          {navigation.map(({ title, icon: Icon, count }) => (
            <button key={title} className={`relative mb-3 flex min-h-[47px] w-full items-center gap-[15px] rounded-[11px] px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#243e6c] [&_svg]:shrink-0 [&_svg]:text-[23px] [&_svg]:stroke-[1.5] [&_span]:whitespace-nowrap [&_b]:ml-auto [&_b]:grid [&_b]:h-[21px] [&_b]:min-w-[21px] [&_b]:place-items-center [&_b]:rounded-full [&_b]:bg-[#ffce36] [&_b]:text-[11px] [&_b]:text-[#11254b] max-[1200px]:gap-3 max-[1200px]:pl-3.5 max-[1200px]:text-xs ${title === 'Overview' ? 'bg-[#2b467c] font-bold text-white before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-[3px] before:bg-[#ffce36] [&_svg]:text-[#ffce36]' : ''}`} aria-current={title === 'Overview' ? 'page' : undefined} onClick={() => openScreen(title)}>
              <Icon aria-hidden="true" /><span>{title}</span>{count && <b>{count}</b>}
            </button>
          ))}
        </nav>
        <div className="absolute -bottom-[165px] -left-[158px] h-[490px] w-[400px] -rotate-[25deg] rounded-full bg-[#1d3d76] before:absolute before:inset-x-5 before:top-[69px] before:bottom-0 before:rounded-full before:border before:border-[#c59c31] after:absolute after:inset-x-[60px] after:top-[108px] after:bottom-2.5 after:rounded-full after:border-4 after:border-[#607fae]" aria-hidden="true" />
        <div className="relative z-10 mx-[25px] mt-auto mb-[35px] flex items-center gap-2.5 border-t border-white/8 pt-[25px] [&_strong]:block [&_strong]:whitespace-nowrap [&_strong]:text-[11px] [&_strong]:text-white [&_small]:mt-[3px] [&_small]:block [&_small]:text-[10px] max-[1200px]:mr-5"><span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#eaf0fc] text-xs font-bold text-[#183460]">SA</span><div><strong>Super Administrator</strong><small>GreenHill Auth</small></div></div>
      </aside>
      <div className="ml-[232px] max-[1200px]:ml-[202px] max-[700px]:ml-0">
        <header className="sticky top-0 z-20 flex h-[86px] items-center gap-[15px] border-b border-[#e8edf6] bg-white px-[42px] [&_h1]:mb-[5px] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-[1.2] [&_p]:text-xs [&_p]:tracking-[.15px] [&_p]:text-[#7e90b1] max-[1200px]:h-[74px] max-[1200px]:px-[37px] max-[1200px]:[&_h1]:text-[22px] max-[1000px]:px-6 max-[1000px]:[&_h1]:text-xl max-[700px]:h-20 max-[700px]:gap-[9px] max-[700px]:px-[15px] max-[700px]:[&_h1]:text-lg max-[700px]:[&_p]:max-w-[220px] max-[700px]:[&_p]:text-[10px]">
          <button className="hidden place-items-center rounded-md p-1.5 text-[22px] max-[700px]:grid" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><FiMenu /></button>
          <div><h1>Super Admin Overview</h1><p>One identity. Three connected GreenHill systems.</p><time dateTime={dateValue} title="Current date in Kampala (East Africa Time)" className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#7e90b1] max-[700px]:text-[10px]"><FiCalendar aria-hidden="true" className="size-3 shrink-0" />{dateLabel}</time></div>
          <div className="ml-auto flex items-center gap-[11px] text-xs max-[700px]:gap-[5px] max-[700px]:[&_strong]:hidden"><span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#eaf0fc] text-xs font-bold text-[#183460]">SA</span><strong>Admin</strong></div>
        </header>
        <main className="mx-auto max-w-[1500px] px-[27px] pt-[19px] pb-4 min-[1450px]:pt-7 max-[1200px]:px-[23px] max-[1200px]:pt-4 max-[700px]:p-4">
          <section className="relative flex min-h-[177px] items-center justify-between gap-5 overflow-hidden bg-[#263f80] px-8 py-[22px] before:absolute before:-top-[29%] before:-left-[19%] before:h-[350px] before:w-[90%] before:rounded-full before:bg-[#172f64] min-[1450px]:min-h-[200px] max-[1200px]:min-h-[153px] max-[1200px]:px-7 max-[1200px]:py-4 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[23px] max-[700px]:rounded-md max-[700px]:p-[23px] max-[700px]:before:w-[140%] max-[700px]:before:-left-[45%]" aria-labelledby="greeting">
            <div className="absolute -top-[15px] right-[12%] h-[200px] w-[450px] rotate-[22deg] rounded-full border-2 border-[#ffce35] after:absolute after:right-[7px] after:bottom-7 after:size-3.5 after:rounded-full after:bg-[#ffce35]" aria-hidden="true" />
            <div className="relative text-white [&_h2]:mb-[7px] [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_p]:text-[15px] [&_p]:text-[#c8d5ee] [&_button]:mt-[25px] [&_button]:rounded-[9px] [&_button]:bg-[#ffca35] [&_button]:px-[45px] [&_button]:py-[13px] [&_button]:text-[13px] [&_button]:font-bold [&_button]:text-[#0e2a59] [&_button]:transition-colors [&_button:hover]:bg-[#ffda66] max-[1200px]:[&_h2]:text-[25px] max-[1200px]:[&_p]:text-sm max-[1200px]:[&_button]:mt-[23px] max-[1200px]:[&_button]:px-10 max-[1200px]:[&_button]:py-[11px] max-[1000px]:[&_h2]:text-[22px] max-[1000px]:[&_p]:max-w-[280px] max-[700px]:[&_h2]:max-w-[300px] max-[700px]:[&_h2]:text-[23px] max-[700px]:[&_p]:text-[13px] max-[700px]:[&_p]:leading-[1.6] max-[700px]:[&_button]:mt-[18px]"><h2 id="greeting">Good afternoon, Administrator</h2><p>Manage staff access and keep every workspace secure.</p><button onClick={() => openScreen('User Management')}>Manage users</button></div>
            <div className="relative mr-2 min-w-[204px] rounded-2xl bg-[#344f89] px-[22px] py-[17px] [&>span]:text-[11px] [&>span]:font-bold [&>span]:text-[#c4d5f9] [&>div]:mt-0.5 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-5 [&_strong]:text-[42px] [&_strong]:leading-[1.2] [&_strong]:text-white [&_b]:rounded-[20px] [&_b]:bg-[#e5f5ee] [&_b]:px-[13px] [&_b]:py-1.5 [&_b]:text-[10px] [&_b]:text-[#158247] max-[1200px]:min-w-[178px] max-[1200px]:px-[19px] max-[1200px]:py-[15px] max-[1200px]:[&_strong]:text-[38px] max-[1200px]:[&>span]:text-[10px] max-[1000px]:mr-0 max-[1000px]:min-w-[155px] max-[1000px]:p-3.5 max-[1000px]:[&>div]:gap-2.5 max-[1000px]:[&_b]:px-[9px] max-[1000px]:[&_b]:py-[5px] max-[700px]:min-w-[180px] max-[700px]:self-end"><span>SYSTEMS CONNECTED</span><div><strong>03</strong><b>Operational</b></div></div>
          </section>
          <section className="mt-[19px] mb-[22px] grid grid-cols-4 gap-4 max-[1200px]:mt-[17px] max-[1200px]:mb-[19px] max-[1200px]:gap-[13px] max-[1000px]:grid-cols-2 max-[700px]:gap-3" aria-label="Access statistics">
            {stats.map(({ title, value, detail, icon: Icon, color }) => <article className={`relative min-h-[127px] rounded-[18px] border border-[#e1e8f3] bg-white px-4 pt-[21px] pb-[18px] shadow-[0_5px_0_#edf2fa] [&_h2]:mb-3 [&_h2]:text-[13px] [&_h2]:font-semibold [&_h2]:text-[#7f90af] [&>strong]:block [&>strong]:text-[35px] [&>strong]:font-bold [&>strong]:leading-none [&>strong]:tracking-[.2px] [&_p]:mt-[9px] [&_p]:text-[11px] [&_p]:font-bold max-[1200px]:min-h-[110px] max-[1200px]:px-3.5 max-[1200px]:pt-[18px] max-[1200px]:pb-3.5 max-[1200px]:[&_h2]:text-xs max-[1200px]:[&>strong]:text-[31px] max-[700px]:min-h-[122px] max-[700px]:px-3 max-[700px]:py-[18px] max-[700px]:[&_h2]:max-w-[100px] max-[700px]:[&_h2]:text-[11px] max-[700px]:[&>strong]:text-[30px] max-[700px]:[&_p]:text-[10px] ${statColors[color]}`} key={title}><span className="absolute top-2.5 right-[13px] grid size-[41px] place-items-center rounded-full bg-[#f1f4fb] [&_svg]:text-[25px] [&_svg]:stroke-[1.5] max-[1200px]:size-9 max-[700px]:right-[9px] max-[700px]:size-[29px] max-[700px]:[&_svg]:text-xl"><Icon aria-hidden="true" /></span><h2>{title}</h2><strong>{value}</strong><p>{detail}</p></article>)}
          </section>
          <div className="grid grid-cols-[1.62fr_1fr] gap-4 max-[1000px]:grid-cols-1">
            <section className="min-h-[287px] min-w-0 rounded-[18px] border border-[#e1e8f3] bg-white px-[21px] pt-[17px] pb-[23px] shadow-[0_5px_0_#edf2fa] [&_h2]:mb-1 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-xs [&_p]:tracking-[.15px] [&_p]:text-[#7e90b1] min-[1450px]:min-h-[320px] max-[1200px]:min-h-[250px] max-[1200px]:px-[18px] max-[1200px]:pt-[15px] max-[1200px]:pb-5 max-[1200px]:[&_h2]:text-lg max-[700px]:min-h-[230px] max-[700px]:px-[15px] max-[700px]:py-[19px] max-[700px]:[&_p]:text-[11px]" aria-labelledby="activity-title">
              <div className="flex items-start justify-between gap-2.5 [&_select]:max-w-[120px] [&_select]:cursor-pointer [&_select]:rounded-[20px] [&_select]:border-0 [&_select]:bg-[#eef2fb] [&_select]:px-[11px] [&_select]:py-[5px] [&_select]:text-[11px] [&_select]:font-bold max-[700px]:gap-1 max-[700px]:[&_select]:max-w-[105px] max-[700px]:[&_select]:text-[10px]"><div><h2 id="activity-title">Access activity</h2><p>Successful sign-ins across the last {period} days</p></div><select aria-label="Activity period" value={period} onChange={e => setPeriod(e.target.value)}><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></div>
              <AccessActivityChart key={period} period={period} />
            </section>
            <section className="min-h-[287px] min-w-0 rounded-[18px] border border-[#e1e8f3] bg-white px-[21px] pt-[17px] pb-[23px] shadow-[0_5px_0_#edf2fa] [&_h2]:mb-1 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-xs [&_p]:tracking-[.15px] [&_p]:text-[#7e90b1] min-[1450px]:min-h-[320px] max-[1200px]:min-h-[250px] max-[1200px]:px-[18px] max-[1200px]:pt-[15px] max-[1200px]:pb-5 max-[1200px]:[&_h2]:text-lg max-[700px]:min-h-[230px] max-[700px]:px-[15px] max-[700px]:py-[19px] max-[700px]:[&_p]:text-[11px]" aria-labelledby="workspace-title"><h2 id="workspace-title">Workspace access</h2><p>Users with access to each platform</p><div className="mt-7 grid gap-[26px] max-[1200px]:mt-[25px] max-[1200px]:gap-[23px] max-[1000px]:mb-2">{workspaces.map(workspace => <div className="grid grid-cols-[17px_1fr] gap-[9px]" key={workspace.name}><span className="mt-px size-4 rounded-full" style={{ background: workspace.color }} /><div><div className="mb-2 flex items-center justify-between gap-2 [&_h3]:text-xs [&_h3]:font-bold [&_strong]:text-sm"><h3>{workspace.name}</h3><strong>{workspace.users}</strong></div><div className="h-[7px] overflow-hidden rounded-[10px] bg-[#e8edf7] [&_span]:block [&_span]:h-full [&_span]:rounded-[10px]" role="meter" aria-label={workspace.name} aria-valuenow={workspace.users} aria-valuemin={0} aria-valuemax={1050}><span style={{ width: `${workspace.users / 10.5}%`, background: workspace.color }} /></div></div></div>)}</div></section>
          </div>
          <section className="mt-[22px] flex min-h-[75px] items-center gap-3 rounded-[18px] border border-[#e1e8f3] bg-white px-[19px] py-[15px] shadow-[0_5px_0_#edf2fa] [&_h2]:mb-[5px] [&_h2]:text-sm [&_h2]:font-bold [&_p]:text-xs [&_p]:tracking-[.15px] [&_p]:text-[#7e90b1] [&_button]:ml-auto [&_button]:rounded-lg [&_button]:px-[17px] [&_button]:py-3 [&_button]:text-xs [&_button]:font-bold [&_button]:text-[#852bd0] [&_button:hover]:bg-[#f7f0fc] max-[1200px]:mt-[19px] max-[1200px]:min-h-[65px] max-[700px]:gap-[9px] max-[700px]:px-3 max-[700px]:[&_h2]:text-xs max-[700px]:[&_p]:text-[11px] max-[700px]:[&_p]:leading-[1.6] max-[700px]:[&_button]:px-[3px] max-[700px]:[&_button]:py-[9px]"><span className="grid size-[33px] shrink-0 place-items-center rounded-full bg-[#fff4cf] text-lg text-[#c48b00] max-[700px]:size-7" aria-hidden="true">!</span><div><h2>18 access reviews need attention</h2><p>Review temporary access, expired assignments and pending approvals.</p></div><button onClick={() => openScreen('Access reviews')}>Review</button></section>
          <footer className="mx-[15px] mt-[17px] flex justify-between gap-2.5 text-[9px] text-[#93a2bc] max-[700px]:mx-0 max-[700px]:flex-wrap max-[700px]:text-[8px]">GREENHILL SCHOOLS · AUTHENTICATION ADMINISTRATION <span>Preview · Sample data</span></footer>
        </main>
      </div>
      {dialog && <InfoDialog {...dialog} onClose={() => setDialog(null)} />}
    </div>
  )
}
