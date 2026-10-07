import { FiHelpCircle, FiShield } from 'react-icons/fi'
import { SchoolBrand } from '../../components/SchoolBrand'
import { LoginForm } from './LoginForm'
import { WorkspaceIntro } from './WorkspaceIntro'

type LoginPageProps = { onContinue: () => void }

export function LoginPage({ onContinue }: LoginPageProps) {
  // The parent owns navigation; authentication can be connected independently.
  return (
    <main className="grid h-svh grid-cols-[60%_40%] overflow-hidden bg-white mobile:flex mobile:flex-col">
      <WorkspaceIntro />
      <section className="relative flex min-h-0 items-center py-[30px] pr-[11%] pl-[13%] short:pt-9 short:pb-[18px] narrow:pr-[9%] narrow:pl-[12%] mobile:flex-1 mobile:px-7 mobile:pt-6 mobile:pb-4 mobile-tight:py-2" aria-labelledby="login-heading">
        <span className="absolute top-[30px] right-[30px] flex items-center gap-1.5 p-1 text-[11px] font-semibold text-navy short:top-4 short:right-[18px] short:text-[8px] mobile:top-2 mobile:right-5 mobile-tight:top-1">
          <FiHelpCircle aria-hidden="true" />Need help?
        </span>
        <div className="mx-auto w-full max-w-[400px] mobile:max-w-[350px]">
          <SchoolBrand className="mb-8 compact:mb-5 short:mb-[18px] mobile:hidden" />
          <header>
            <h2 id="login-heading" className="mb-2 text-[clamp(28px,3vw,38px)] leading-[1.15] font-bold tracking-[-.65px] text-navy compact:text-[28px] short:text-[23px] mobile:text-[28px] mobile-tight:mb-1 mobile-tight:text-[24px]">Welcome back</h2>
            <p className="mb-[25px] text-base leading-[1.4] text-muted compact:mb-[17px] compact:text-[13px] short:mb-[13px] short:text-[11px] mobile-tight:mb-2 mobile-tight:text-xs">Sign in to your Greenhill workspace.</p>
          </header>
          <LoginForm
            onEmailSignIn={onContinue}
            onGoogleSignIn={onContinue}
            onForgotPassword={() => { /* TODO: Connect password recovery. */ }}
          />
          <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted compact:mt-4 short:mt-[13px] short:text-[8px] mobile-tight:mt-2 mobile-tight:text-[10px]">
            <FiShield className="size-4" aria-hidden="true" />Secure access to Greenhill systems
          </p>
        </div>
      </section>
    </main>
  )
}
