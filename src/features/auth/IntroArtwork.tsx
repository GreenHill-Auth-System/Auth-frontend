import schoolBuilding from '../../assets/school-building.jpg'

// Coordinates follow the reference panel, so every decorative layer scales together.
export function IntroArtwork() {
  return (
    <svg className="absolute inset-0 size-full mobile:hidden" viewBox="0 0 400 435" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id="intro-panel-clip">
          <path d="M0 0H356C377 61 399 147 400 246C402 326 389 389 370 435H0Z" />
        </clipPath>
        <linearGradient id="photo-shade" x2="1" y2=".4">
          <stop stopColor="#10284f" stopOpacity=".9" />
          <stop offset="1" stopColor="#18345d" stopOpacity=".72" />
        </linearGradient>
        <linearGradient id="edge-purple" x1="0" y1="0" x2=".25" y2="1">
          <stop stopColor="#294784" />
          <stop offset=".55" stopColor="#253a77" />
          <stop offset="1" stopColor="#7024a5" />
        </linearGradient>
        <linearGradient id="gold-line" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#d2b647" stopOpacity=".7" />
          <stop offset=".5" stopColor="#d2b647" stopOpacity=".12" />
          <stop offset="1" stopColor="#ddbe44" stopOpacity=".85" />
        </linearGradient>
        <linearGradient id="bottom-glow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6680af" stopOpacity=".4" />
          <stop offset=".55" stopColor="#8093b4" stopOpacity=".45" />
          <stop offset="1" stopColor="#ebc13c" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <g clipPath="url(#intro-panel-clip)">
        <image href={schoolBuilding} width="400" height="435" preserveAspectRatio="xMidYMid slice" />
        <path fill="url(#photo-shade)" d="M0 0H400V435H0Z" />
        <path fill="#283f78" opacity=".55" d="M310-10C318 64 349 103 376 158C411 250 388 362 326 435H400V0Z" />
        <path fill="#304985" opacity=".6" d="M320-10C339 75 374 115 389 197C406 291 378 384 339 435H400V0Z" />
        <path fill="url(#edge-purple)" d="M333-10C356 53 385 122 394 200C411 296 383 379 342 435H400V0Z" />
        <path fill="#355384" opacity=".15" d="M204 62C265 72 320 166 340 255C352 312 348 354 326 397L283 435C302 335 282 169 204 62Z" />
        <path fill="none" stroke="#90a4c0" strokeOpacity=".34" strokeWidth="1.2" d="M191 64C244 81 291 137 274 187C267 211 249 230 240 234C211 247 211 278 213 307C214 353 237 389 265 412" />
        <path fill="none" stroke="url(#gold-line)" strokeWidth="1" d="M290 67C351 82 386 111 394 169C409 264 381 361 342 435" />
        <path fill="none" stroke="#c4b451" strokeOpacity=".3" strokeWidth=".8" d="M289 0C275 23 251 60 289 67" />
        <path fill="none" stroke="url(#gold-line)" strokeWidth="1" d="M213 307C215 354 238 391 267 412L286 435" />
        <path fill="url(#bottom-glow)" d="M151 435C194 390 232 376 271 388C298 396 315 416 320 435Z" />
        <circle cx="289" cy="67" r="5" fill="#ffd43b" />
        <circle cx="240" cy="234" r="3.4" fill="#809bc8" />
        <circle cx="213" cy="307" r="3.5" fill="#809bc8" />
        <circle cx="267" cy="412" r="3" fill="#cbb76e" />
      </g>
    </svg>
  )
}
