import { useEffect, useRef, useState } from 'react'
import {
  FiCheckCircle,
  FiChevronDown,
  FiExternalLink,
  FiHelpCircle,
  FiLogOut,
} from 'react-icons/fi'

import decorativeCrest from '../../assets/Cropped Blue Crest Emblem.png'
import { SchoolBrand } from '../../components/SchoolBrand'
import { InfoDialog } from '../../components/InfoDialog'
import { WorkspaceCard } from './WorkspaceCard'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { workspaces } from './workspaces'
import type { Workspace } from './workspaces'
import { ProfileView } from '../profile/ProfileView'
import { SettingsView } from '../settings/SettingsView'
import { HelpView } from '../help/HelpView'
import { apiUrl } from '../../services/api'

export type WorkspaceTab = 'workspaces' | 'profile' | 'settings' | 'help'

type WorkspacePageProps = {
  onSignOut: () => void
  loginSuccess: boolean
  initialTab?: WorkspaceTab
  onTabChange?: (tab: WorkspaceTab) => void
}

type DialogContent = {
  title: string
  message: string
}

type AuthenticatedUser = {
  email: string
  name: string
  role: string
  authorized_systems: string[]
  picture?: string
}

export function WorkspacePage({
  onSignOut,
  loginSuccess,
  initialTab = 'workspaces',
  onTabChange,
}: WorkspacePageProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(
    initialTab,
  )
  const [accountOpen, setAccountOpen] = useState(false)
  const [dialog, setDialog] = useState<DialogContent | null>(null)
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null)

  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  function switchTab(tab: WorkspaceTab) {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  useEffect(() => {
    // Retrieve the authenticated user from the Django session.
    async function loadAuthenticatedUser() {
      try {
        const response = await fetch(
          apiUrl('/auth/me/'),
          {
            credentials: 'include',
          },
        )

        if (!response.ok) {
          onSignOut()
          return
        }

        const data = await response.json()

        if (!data.authenticated || !data.user) {
          onSignOut()
          return
        }

        setAuthenticatedUser(data.user)
      } catch {
        onSignOut()
      }
    }

    loadAuthenticatedUser()
  }, [onSignOut])

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (
        !accountRef.current?.contains(
          event.target as Node,
        )
      ) {
        setAccountOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAccountOpen(false)
      }
    }

    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener(
        'pointerdown',
        dismiss,
      )
      document.removeEventListener(
        'keydown',
        handleEscape,
      )
    }
  }, [])

  


  function selectWorkspace(workspace: Workspace) {
    const workspaceUrls: Record<Workspace['id'], string> = {
      executive:
        import.meta.env.VITE_EID_URL ||
        'http://localhost:5174',
      procurement:
        import.meta.env.VITE_PROCUREMENT_URL ||
        'http://localhost:5175',
      service:
        import.meta.env.VITE_INCIDENT_URL ||
        workspace.url ||
        'https://ismp-frontend.onrender.com',
    }

    const targetUrl = workspace.url || workspaceUrls[workspace.id]

    if (targetUrl) {
      window.location.assign(targetUrl)
      return
    }

    setDialog({
      title: workspace.title,
      message:
        'This workspace will be available once its system is connected.',
    })
  }

  function handleUserUpdate(updated: {
    name: string
    email: string
    picture?: string
  }) {
    setAuthenticatedUser((prev) =>
      prev
        ? {
            ...prev,
            name: updated.name,
            email: updated.email,
            picture: updated.picture,
          }
        : prev,
    )
  }

  const accountName =
    authenticatedUser?.name ||
    authenticatedUser?.email ||
    'Greenhill User'


  const accountInitials = accountName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <main className="relative flex min-h-svh overflow-hidden bg-[#152d56] mobile:h-dvh mobile:min-h-0 mobile:flex-col mobile:bg-[#f8fbff]">
      <WorkspaceSidebar
        accountName={accountName}
        activeTab={activeTab}
        onWorkspaces={() => switchTab('workspaces')}
        onProfile={() => switchTab('profile')}
        onSettings={() => switchTab('settings')}
        onHelp={() => switchTab('help')}
        onSignOut={onSignOut}
      />

      <section
        className="relative isolate flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [border-bottom-left-radius:150px_360px] bg-white px-[6%] pb-12 mobile:min-h-0 mobile:rounded-none mobile:px-6 mobile:pt-[clamp(8px,2dvh,24px)] mobile:pb-5 max-sm:px-5 max-[360px]:pt-2"
        aria-labelledby={activeTab === 'workspaces' ? 'workspace-heading' : undefined}
      >
        <svg
          className="pointer-events-none absolute inset-0 -z-10 size-full mobile:hidden"
          viewBox="0 0 950 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0H205Q70 60 0 185Z"
            fill="#fff8df"
            opacity=".85"
          />
          <path
            d="M950 624Q720 680 575 760H950Z"
            fill="#eee5f7"
          />
          <path
            d="M950 716Q797 665 605 760H950Z"
            fill="#b69ace"
            opacity=".9"
          />
          <path
            d="M904 64C865 140 861 181 902 212L950 239M700 750Q817 664 950 711"
            fill="none"
            stroke="#f7ca54"
            strokeWidth=".8"
          />
          <circle
            cx="901"
            cy="198"
            r="7.5"
            fill="#f8c731"
          />
          <circle
            cx="28"
            cy="61"
            r="1.5"
            fill="#7b94b4"
          />
        </svg>

        <header className="flex h-[82px] shrink-0 items-center justify-end mobile:hidden">
          <div
            ref={accountRef}
            className="relative"
          >
            <button
              type="button"
              className="flex items-center gap-3 rounded-full p-1 text-xs font-bold text-navy hover:bg-slate-50 transition-colors"
              aria-expanded={accountOpen}
              aria-controls="account-actions"
              onClick={() =>
                setAccountOpen(!accountOpen)
              }
            >
              <span
                className="grid size-10 place-items-center rounded-full border-2 border-white bg-[#e9edf4] text-sm text-[#304b75] shadow-sm font-bold"
                aria-hidden="true"
              >
                {accountInitials}
              </span>

              <span>{accountName}</span>

              <FiChevronDown
                className="ml-1 size-4"
                aria-hidden="true"
              />
            </button>

            {accountOpen && (
              <div
                id="account-actions"
                className="absolute top-full right-0 z-20 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false)
                    switchTab('help')
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm ${
                    activeTab === 'help'
                      ? 'bg-slate-100 font-bold text-navy'
                      : 'text-navy hover:bg-slate-50'
                  } transition-colors`}
                >
                  <FiHelpCircle className="size-4 shrink-0" aria-hidden="true" />
                  Help
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false)
                    onSignOut()
                  }}
                  className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="size-4 shrink-0" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {activeTab === 'profile' ? (
          <div className="mx-auto flex w-full max-w-[980px] flex-1 flex-col items-stretch justify-start pt-2 pb-6">
            <ProfileView
              user={authenticatedUser}
              onUserUpdate={handleUserUpdate}
            />
          </div>
        ) : activeTab === 'settings' ? (
          <div className="mx-auto flex w-full max-w-[980px] flex-1 flex-col items-stretch justify-start pt-2 pb-6">
            <SettingsView />
          </div>
        ) : activeTab === 'help' ? (
          <div className="mx-auto flex w-full max-w-[980px] flex-1 flex-col items-stretch justify-start pt-2 pb-6">
            <HelpView />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-[930px] flex-1 flex-col items-center justify-center pb-4 mobile:items-stretch mobile:justify-start mobile:pb-0 mobile:sm:justify-center">
            <SchoolBrand className="justify-center gap-3 mobile:hidden [&_img]:h-[74px] [&_img]:w-[60px] [&_span]:text-[23px] max-sm:[&_img]:h-14 max-sm:[&_img]:w-11 max-sm:[&_span]:text-lg" />

            <div className="mt-12 text-center mobile:mt-0 mobile:text-left mobile:sm:text-center">
              {loginSuccess && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-5 flex w-full items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left text-sm text-green-700 shadow-sm"
                >
                  <FiCheckCircle
                    className="mt-0.5 size-5 shrink-0 text-green-600"
                    aria-hidden="true"
                  />

                  <p className="leading-5">
                    Welcome back! You’re successfully signed in to your
                    Greenhill workspace. Please choose a system to get started.
                  </p>
                </div>
              )}

              <h1
                id="workspace-heading"
                className="text-[32px] leading-tight font-bold tracking-[-.5px] text-navy mobile:text-[clamp(24px,4.8dvh,38px)] mobile:leading-[1.12] max-[360px]:text-[26px]"
              >
                Choose your
                <span className="max-sm:block">
                  {' '}workspace
                </span>
              </h1>

              <p className="mt-1 text-base tracking-[.2px] text-muted mobile:mt-2 mobile:max-w-none max-sm:text-sm">
                Select the system you want to access.
              </p>
            </div>

            <div className="mt-9 grid w-full grid-cols-3 gap-7 mobile:mt-[clamp(8px,2dvh,24px)] max-sm:grid-cols-1 mobile:gap-[clamp(8px,2dvh,16px)]">
              {workspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onSelect={selectWorkspace}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => switchTab('help')}
              className="mt-12 flex items-center gap-4 rounded-lg px-3 py-2 text-left hover:bg-white/70 mobile:mt-6 mobile:w-full mobile:rounded-[18px] mobile:bg-[#eff4fa] mobile:p-5"
            >
              <span className="grid shrink-0 place-items-center mobile:size-12 mobile:rounded-full mobile:bg-[#e0e9f4]">
                <FiHelpCircle
                  className="size-6 text-navy"
                  aria-hidden="true"
                />
              </span>

              <span className="border-l border-[#e8ecf3] pl-3">
                <span className="block text-xs font-bold text-navy mobile:text-base">
                  Need help?
                </span>

                <span className="mt-1 block text-xs text-muted mobile:text-sm max-sm:text-xs">
                  Contact the ICT Support Team
                </span>
              </span>

              <FiExternalLink
                className="ml-auto hidden size-5 shrink-0 text-[#2874ee] mobile:block"
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        <img
          src={decorativeCrest}
          alt=""
          className="pointer-events-none absolute left-[-28px] bottom-[-60px] -z-10 hidden h-[240px] w-auto max-w-none opacity-[.08] mobile:block mobile:sm:h-[320px]"
        />

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-[140px] w-full -scale-x-100 mobile:block"
          viewBox="0 0 400 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 15Q90 110 235 115L315 140H0Z"
            fill="#fff7de"
          />
          <path
            d="M0 70Q100 100 200 140H0Z"
            fill="#17385e"
          />
          <path
            d="M0 66Q110 92 200 140"
            fill="none"
            stroke="#f8c731"
          />
        </svg>
      </section>

      {dialog && (
        <InfoDialog
          {...dialog}
          onClose={() => setDialog(null)}
        />
      )}
    </main>
  )
}