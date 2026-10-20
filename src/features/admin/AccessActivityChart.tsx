import { useState } from 'react'

// Preview values until the backend provides sign-in history.
const weekly = [
  { label: 'Mon', day: 'Monday', count: 120 },
  { label: 'Tue', day: 'Tuesday', count: 240 },
  { label: 'Wed', day: 'Wednesday', count: 180 },
  { label: 'Thu', day: 'Thursday', count: 350 },
  { label: 'Fri', day: 'Friday', count: 270 },
  { label: 'Sat', day: 'Saturday', count: 445 },
  { label: 'Sun', day: 'Sunday', count: 380 },
]
const monthly = [
  { label: '1', day: 'Day 1', count: 165 },
  { label: '5', day: 'Day 5', count: 215 },
  { label: '10', day: 'Day 10', count: 325 },
  { label: '15', day: 'Day 15', count: 275 },
  { label: '20', day: 'Day 20', count: 410 },
  { label: '25', day: 'Day 25', count: 380 },
  { label: '30', day: 'Day 30', count: 535 },
]

export function AccessActivityChart({ period }: { period: string }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const points = (period === '7' ? weekly : monthly).map((point, index) => ({
    ...point, x: 28 + index * 96, y: 185 - point.count * 0.35,
  }))
  const activeIndex = hovered ?? focused
  const active = activeIndex === null ? null : points[activeIndex]

  return (
    <div className="relative mt-[25px] min-[1450px]:mt-[35px] max-[700px]:mt-[30px]" onPointerLeave={() => setHovered(null)}>
      <svg viewBox="0 0 640 215" className="block h-auto w-full overflow-visible" role="group" aria-label={`Successful sign-ins over ${period} days. Sample data. Focus a point to see its count.`}>
        {[25, 65, 105, 145, 185].map(y => <line key={y} x1="20" y1={y} x2="620" y2={y} className="stroke-[#e9edf6] stroke-1" />)}
        {points.map(point => <line key={point.x} x1={point.x} y1="0" x2={point.x} y2="190" className="stroke-[#e9edf6] stroke-1" />)}
        <polyline points={points.map(point => `${point.x},${point.y}`).join(' ')} fill="none" stroke="#7736bf" strokeWidth="4" strokeLinejoin="round" />
        {active && <line x1={active.x} y1="0" x2={active.x} y2="190" className="pointer-events-none stroke-[#7736bf]/40 stroke-1" strokeDasharray="4 4" />}
        {points.map((point, index) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r={activeIndex === index ? 8 : 6} fill="#7736bf" stroke="white" strokeWidth="2" className="pointer-events-none" />
            <text x={point.x} y="210" textAnchor="middle" className="fill-[#8595b5] text-xs">{point.label}</text>
            <rect x={point.x - 28} y="0" width="56" height="190" fill="transparent" tabIndex={0} role="button"
              aria-label={`${point.day}: ${point.count} successful sign-ins, sample data`}
              aria-describedby={activeIndex === index ? 'activity-tooltip' : undefined}
              className="cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-[#7736bf]"
              onPointerEnter={() => setHovered(index)} onPointerDown={() => setHovered(index)}
              onFocus={() => setFocused(index)} onBlur={() => setFocused(null)}
              onKeyDown={event => {
                if (event.key === 'Escape') { setHovered(null); setFocused(null) }
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFocused(index) }
              }} />
          </g>
        ))}
      </svg>
      {active && <div id="activity-tooltip" role="tooltip" className="pointer-events-none absolute z-10 w-[88px] rounded-md border border-[#7736bf]/15 bg-white px-2 py-1 text-[10px] leading-tight"
        style={{ left: `clamp(0px, calc(${active.x / 640 * 100}% - 44px), calc(100% - 88px))`, top: `${active.y / 215 * 100}%`, transform: 'translateY(calc(-100% - 10px))' }}>
        <div className="font-medium text-[#152e5e]">{active.label} <strong className="float-right text-[#7736bf]">{active.count.toLocaleString()}</strong></div>
        <div className="mt-0.5 text-[9px] text-[#7e90b1]">Sign-ins · sample</div>
      </div>}
    </div>
  )
}
