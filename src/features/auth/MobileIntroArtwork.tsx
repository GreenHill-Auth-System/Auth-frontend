import schoolBuilding from '../../assets/school-building.jpg'

// A separate bottom curve keeps the photo upright on the wider mobile panel.
export function MobileIntroArtwork() {
  return (
    <div className="absolute inset-0 hidden overflow-hidden [clip-path:ellipse(85%_100%_at_50%_0%)] mobile:block" aria-hidden="true">
      <img src={schoolBuilding} alt="" className="size-full object-cover object-[center_45%]" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,#10264fe8,#19335cbf)]" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 280" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mobile-curve-color" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#294784" />
            <stop offset=".6" stopColor="#253a77" />
            <stop offset="1" stopColor="#7024a5" />
          </linearGradient>
          <radialGradient id="mobile-gold-glow">
            <stop stopColor="#ffd43b" stopOpacity=".4" />
            <stop offset="1" stopColor="#ffd43b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 200Q200 300 400 200V280H0Z" fill="#304985" opacity=".55" />
        <path d="M0 214Q200 320 400 214V280H0Z" fill="url(#mobile-curve-color)" />
        <ellipse cx="290" cy="255" rx="100" ry="50" fill="url(#mobile-gold-glow)" />
        <path d="M-10 193Q200 300 410 193" fill="none" stroke="#e2c34e" strokeWidth="1" />
        <path d="M-10 130C30 110 90 120 68 147S155 187 200 147S292 107 332 147S370 210 410 193" fill="none" stroke="#e2c34e" strokeOpacity=".75" strokeWidth=".9" />
        <circle cx="68" cy="147" r="3" fill="#ffd43b" />
        <circle cx="200" cy="147" r="3" fill="#ffd43b" />
        <circle cx="332" cy="147" r="3" fill="#ffd43b" />
      </svg>
    </div>
  )
}
