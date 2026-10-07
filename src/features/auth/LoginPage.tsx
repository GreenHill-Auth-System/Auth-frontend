import { FiHelpCircle, FiShield } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import { LoginForm } from './LoginForm'
import { WorkspaceIntro } from './WorkspaceIntro'

export function LoginPage() {
  // Connect these callbacks to the authentication service when it is available.
  return (
    <main className="grid h-svh grid-cols-[60%_40%] overflow-hidden bg-white mobile:flex mobile:flex-col">
      <WorkspaceIntro />
      <section className="relative flex min-h-0 items-center py-[30px] pr-[11%] pl-[13%] short:pt-9 short:pb-[18px] narrow:pr-[9%] narrow:pl-[12%] mobile:flex-1 mobile:px-7 mobile:pt-8 mobile:pb-5 mobile-short:pt-[38px]" aria-labelledby="login-heading">
        <span className="absolute top-[30px] right-[30px] flex items-center gap-1.5 p-1 text-[11px] font-semibold text-navy short:top-4 short:right-[18px] short:text-[8px] mobile:top-2 mobile:right-5">
          <FiHelpCircle aria-hidden="true" />Need help?
        </span>
        <div className="mx-auto w-full max-w-[400px] mobile:max-w-[350px]">
          <SchoolBrand className="mb-8 compact:mb-5 short:mb-[18px] mobile:hidden mobile-short:mb-3.5 mobile-short:flex" />
          <header>
            <h2 id="login-heading" className="mb-2 text-[clamp(28px,3vw,38px)] leading-[1.15] font-bold tracking-[-.65px] text-navy compact:text-[28px] short:text-[23px] mobile:text-[28px]">Welcome back</h2>
            <p className="mb-[25px] text-base leading-[1.4] text-muted compact:mb-[17px] compact:text-[13px] short:mb-[13px] short:text-[11px]">Sign in to your Greenhill workspace.</p>
          </header>
          <LoginForm
            onEmailSignIn={() => { /* TODO: Connect email authentication. */ }}
            onGoogleSignIn={() => { /* TODO: Connect Google authentication. */ }}
            onForgotPassword={() => { /* TODO: Connect password recovery. */ }}
          />
          <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted compact:mt-4 short:mt-[13px] short:text-[8px]">
            <FiShield className="size-4" aria-hidden="true" />Secure access to Greenhill systems
          </p>
        </div>
      </section>
    </main>
  )
}