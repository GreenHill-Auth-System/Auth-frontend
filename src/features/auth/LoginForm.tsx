import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  FiAlertCircle,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

type LoginError = {
  error: string
  message: string
  fields?: {
    email: boolean
    password: boolean
  }
}

type LoginFormProps = {
  onEmailSignIn: (
    email: string,
    password: string,
    remember: boolean,
  ) => void
  onGoogleSignIn: () => void
  onForgotPassword: () => void
  loginError: LoginError | null
}

// Shared utility groups keep the email and password fields visually consistent.
const labelClass =
  'mb-1.5 block text-xs font-bold short:mb-[3px] short:text-[9px] mobile-tight:mb-0.5 mobile-tight:text-[11px]'

const fieldClass =
  'mb-[18px] flex min-h-[42px] items-center gap-[9px] rounded-[5px] border border-[#cbd1df] px-3 focus-within:border-[#263c7b] focus-within:shadow-[0_0_0_2px_#263c7b15] compact:mb-3 compact:min-h-[34px] short:mb-2.5 short:min-h-6 short:px-2 mobile-tight:mb-1.5 mobile-tight:min-h-[30px]'

const inputClass =
  'min-w-0 w-full border-0 bg-transparent py-[11px] text-xs text-navy outline-none placeholder:text-[#8c96ad] compact:py-2 short:py-1 short:text-[9px] mobile-tight:py-[5px]'

const fieldIconClass =
  'w-[17px] shrink-0 text-[#54698d] short:w-3'

// Five seconds gives the user enough time to read a short
// validation message without making the interface feel slow.
const ERROR_DISPLAY_TIME = 5000

// Input state stays here; the parent supplies authentication behavior.
export function LoginForm({
  onEmailSignIn,
  onGoogleSignIn,
  onForgotPassword,
  loginError,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showBackendError, setShowBackendError] = useState(false)

  useEffect(() => {
    if (!loginError) {
      setShowBackendError(false)
      return
    }

    // Keep backend validation feedback visible for five seconds.
    setShowBackendError(true)

    const timeout = window.setTimeout(() => {
      setShowBackendError(false)
    }, ERROR_DISPLAY_TIME)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [loginError])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = String(data.get('email') || '').trim()
    const password = String(data.get('password') || '')
    const remember = data.get('remember') === 'on'

    // Send the credentials to the Django backend.
    // The backend is responsible for validating the credentials
    // and returning the appropriate field-level errors.
    onEmailSignIn(
      email,
      password,
      remember,
    )
  }

  const emailFieldError =
    showBackendError && loginError?.fields?.email === true

  const passwordFieldError =
    showBackendError && loginError?.fields?.password === true

  const displayError =
    showBackendError && loginError?.message

  return (
    <form onSubmit={handleSubmit}>
      <label
        className={labelClass}
        htmlFor="email"
      >
        Work email
      </label>

      <div
        className={`${fieldClass} ${
          emailFieldError
            ? 'border-red-300 focus-within:border-red-500 focus-within:shadow-[0_0_0_2px_#ef444415]'
            : ''
        }`}
      >
        <FiMail
          className={fieldIconClass}
          aria-hidden="true"
        />

        <input
          className={inputClass}
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@greenhillacademy.ac.ug"
        />
      </div>

      <label
        className={labelClass}
        htmlFor="password"
      >
        Password
      </label>

      <div
        className={`${fieldClass} ${
          passwordFieldError
            ? 'border-red-300 focus-within:border-red-500 focus-within:shadow-[0_0_0_2px_#ef444415]'
            : ''
        }`}
      >
        <FiLock
          className={fieldIconClass}
          aria-hidden="true"
        />

        <input
          className={inputClass}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
        />

        <button
          className="flex border-0 bg-transparent p-1 text-[#52678c] short:p-0.5"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={
            showPassword
              ? 'Hide password'
              : 'Show password'
          }
          aria-pressed={showPassword}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {displayError && (
        <div
          role="alert"
          aria-live="polite"
          className="-mt-3 mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-[1.4] text-red-700"
        >
          <FiAlertCircle
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />

          <p>{loginError.message}</p>
        </div>
      )}

      <div className="-mt-[3px] mb-[17px] flex items-center justify-between gap-2 compact:mb-2.5 short:mb-[7px] narrow:gap-1 mobile:flex-wrap mobile-tight:mb-1.5">
        <label className="flex items-center gap-1.5 text-xs whitespace-nowrap short:text-[9px]">
          <input
            className="m-0 size-[15px] accent-[#243e72] short:size-[11px]"
            name="remember"
            type="checkbox"
            defaultChecked
          />
          Remember me
        </label>

        <button
          className="border-0 bg-transparent py-1 text-xs text-[#8e2cc3] short:text-[9px]"
          type="button"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
      </div>

      <button
        className="relative min-h-11 w-full rounded-[30px] border-0 bg-[linear-gradient(100deg,#2e347e,#203675)] text-sm font-bold text-white hover:brightness-110 motion-safe:transition-[filter] compact:min-h-9 short:min-h-[26px] mobile-tight:min-h-8 short:text-[10px]"
        type="submit"
      >
        Sign in

        <span className="absolute top-1/2 right-3 grid size-[31px] -translate-y-1/2 place-items-center rounded-full bg-school-yellow text-[22px] text-[#244076] compact:size-[27px] short:right-2 short:size-5 short:text-[15px]">
          <FiArrowRight aria-hidden="true" />
        </span>
      </button>

      <div className="my-[17px] flex items-center gap-3 text-xs text-muted before:h-px before:flex-1 before:bg-[#e4e7ee] before:content-[''] after:h-px after:flex-1 after:bg-[#e4e7ee] after:content-[''] compact:my-3 mobile-tight:my-1.5 short:my-2 short:text-[9px]">
        <span>or</span>
      </div>

      <button
        className="relative flex min-h-11 w-full items-center justify-center gap-5 rounded-[30px] border border-[#aab6cf] bg-white text-[13px] font-bold text-navy hover:bg-[#f5f7fc] motion-safe:transition-colors compact:min-h-9 short:min-h-[26px] mobile-tight:min-h-8 short:text-[10px]"
        type="button"
        onClick={onGoogleSignIn}
      >
        <FcGoogle
          className="size-[27px] short:size-[21px]"
          aria-hidden="true"
        />
        Login with Google
      </button>
    </form>
  )
}