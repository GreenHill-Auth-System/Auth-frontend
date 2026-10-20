import { useState } from 'react'
import { FiUser, FiShield, FiGrid, FiCrosshair } from 'react-icons/fi'
import { InfoDialog } from '../../components/InfoDialog'
import { AccessActivityChart } from './AccessActivityChart'
import { AdminLayout } from './AdminLayout'

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

export function SuperAdminOverview({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [period, setPeriod] = useState('7')
  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(null)
  function openScreen(title: string) {
    if (title === 'User Management') return onNavigate('/super-admin/users')
    setDialog({ title, message: `${title} is planned for an upcoming screen.` })
  }
  return (
    <AdminLayout title="Super Admin Overview" subtitle="One identity. Three connected GreenHill systems." active="Overview" onNavigate={onNavigate}>

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

      {dialog && <InfoDialog {...dialog} onClose={() => setDialog(null)} />}
    </AdminLayout>
  )
}
