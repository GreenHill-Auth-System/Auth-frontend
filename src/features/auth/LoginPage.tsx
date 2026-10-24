import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiHelpCircle,
  FiShield,
} from 'react-icons/fi'

import { SchoolBrand } from '../../components/SchoolBrand'
import { LoginForm } from './LoginForm'
import { WorkspaceIntro } from './WorkspaceIntro'
import { apiUrl } from '../../services/api'


type LoginError = {
  error: string
  message: string
  fields?: {
    email: boolean
    password: boolean
  }
}

type LoginPageProps = {
  onContinue: (
    email: string,
    password: string,
    remember: boolean,
  ) => void
  loginError: LoginError | null
  signOutSuccess: boolean
}

const ERROR_DISPLAY_TIME = 5000

export function LoginPage({
  onContinue,
  loginError,
  signOutSuccess,
}: LoginPageProps) {
  const [googleLoginError, setGoogleLoginError] = useState(false)
  //state declaration for the admin modal
  const [showAdminModal, setShowAdminModal] = useState(false)

  useEffect(() => {
    // Read the error returned by the Django Google authentication flow.
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error === 'greenhill_account_required') {
      setGoogleLoginError(true)

      // Remove the error parameter from the browser URL after
      // reading it so that the message does not remain in the URL.
      window.history.replaceState(null, '', '/')
    }
  }, [])

  useEffect(() => {
    if (!googleLoginError) {
      return
    }

    // Keep the Google authentication error visible for five seconds.
    const timeout = window.setTimeout(() => {
      setGoogleLoginError(false)
    }, ERROR_DISPLAY_TIME)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [googleLoginError])


  return (
    <main className="grid h-svh grid-cols-[60%_40%] overflow-hidden bg-white mobile:flex mobile:flex-col">
      <WorkspaceIntro />

      <section
        className="relative flex min-h-0 items-center py-[30px] pr-[11%] pl-[13%] short:pt-9 short:pb-[18px] narrow:pr-[9%] narrow:pl-[12%] mobile:flex-1 mobile:px-7 mobile:pt-6 mobile:pb-4 mobile-tight:py-2"
        aria-labelledby="login-heading"
      >
        <span className="absolute top-[30px] right-[30px] flex items-center gap-1.5 p-1 text-[11px] font-semibold text-navy short:top-4 short:right-[18px] short:text-[8px] mobile:top-2 mobile:right-5 mobile-tight:top-1">
          <FiHelpCircle aria-hidden="true" />
          Need help?
        </span>

        <div className="mx-auto w-full max-w-[400px] mobile:max-w-[350px]">
          <SchoolBrand className="mb-8 compact:mb-5 short:mb-[18px] mobile:hidden" />

          <header>
            <h2
              id="login-heading"
              className="mb-2 text-[clamp(28px,3vw,38px)] leading-[1.15] font-bold tracking-[-.65px] text-navy compact:text-[28px] short:text-[23px] mobile:text-[28px] mobile-tight:mb-1 mobile-tight:text-[24px]"
            >
              Welcome back
            </h2>

            <p className="mb-[25px] text-base leading-[1.4] text-muted compact:mb-[17px] compact:text-[13px] short:mb-[13px] short:text-[11px] mobile-tight:mb-2 mobile-tight:text-xs">
              Sign in to your Greenhill workspace.
            </p>
          </header>

          {signOutSuccess && (
            <div
              role="status"
              aria-live="polite"
              className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <FiCheckCircle
                className="mt-0.5 size-4 shrink-0 text-green-600"
                aria-hidden="true"
              />

              <p>
                You have been signed out successfully.
              </p>
            </div>
          )}

          {googleLoginError && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <FiAlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />

              <p>
                Please sign in using your Greenhill Academy Google
                Workspace account.
              </p>
            </div>
          )}

          <LoginForm
            onEmailSignIn={onContinue}
            onGoogleSignIn={() => {
              // Start Google Workspace authentication through the Django backend.
              window.location.href = apiUrl('/auth/google/login/')

            }}
            onForgotPassword={() => {
              setShowAdminModal(true)
            }}
            loginError={loginError}
          />

          <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted compact:mt-4 short:mt-[13px] short:text-[8px] mobile-tight:mt-2 mobile-tight:text-[10px]">
            <FiShield className="size-4" aria-hidden="true" />
            Secure access to Greenhill systems
          </p>
        </div>
      </section>

      {/* Smaller & Shorter Pop-up Contact Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-sm p-5 bg-white rounded-xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Icon (X Symbol) */}
            <button
              type="button"
              onClick={() => setShowAdminModal(false)}
              className="absolute top-3.5 right-3.5 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Shorter Text Content Layout */}
            <div className="text-center mt-1">
              <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.666a2 2 0 012.22 0l8 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                </svg>
              </div>
              
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Contact Admin
              </h3>
              
              <p className="mt-1.5 text-xs text-gray-500 leading-normal px-2">
                Please contact the Greenhill Academy system administrator to reset your workspace password.
              </p>
            </div>
                 {/* Action Control Button */}
<div className="mt-4">
  <button
    type="button"
    onClick={() => {
      const email = "rinnetkeilah@gmail.com";
      const subject = encodeURIComponent("Greenhill Workspace - Password Reset Request");
      const body = encodeURIComponent("Hello Admin,\n\nI have forgotten my login password for the Greenhill Schools workspace. Kindly assist me in initiating a secure credentials reset.\n\nBest regards,");
      
      // 1. Automatically copy the email as a quiet background backup
      navigator.clipboard.writeText(email);

      // 2. Open the user's native email client setup
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      // 3. Briefly notify them so they know it's ready either way
      alert("Launching your email app! If your device doesn't open a mail window, the admin email (rinnetkeilah@gmail.com) has also been copied to your clipboard so you can easily paste it.");
      
      // 4. Safely close the pop-up window
      setShowAdminModal(false);
    }}
    className="w-full inline-flex justify-center items-center px-4 py-2.5 text-xs font-semibold rounded-lg text-white shadow-sm transition-all text-center filter hover:brightness-110 cursor-pointer"
    style={{ backgroundColor: '#203468' }}
  >
    Send Email to Admin
  </button>
</div>
       

          </div>
        </div>
      )}
    </main>
  )
}