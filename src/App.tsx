import { useEffect, useState } from 'react'

import { LoginPage } from './features/auth/LoginPage'
import { WorkspacePage } from './features/workspaces/WorkspacePage'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000'

type LoginError = {
  error: string
  message: string
  fields?: {
    email: boolean
    password: boolean
  }
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const isWorkspaceRoute =
    window.location.pathname === '/workspaces' ||
    window.location.pathname === '/profile' ||
    window.location.pathname === '/settings'
  const [checkingAuthentication, setCheckingAuthentication] = useState(
    isWorkspaceRoute,
  )
  const [loginError, setLoginError] = useState<LoginError | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [signOutSuccess, setSignOutSuccess] = useState(false)

  useEffect(() => {
    const handleBack = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleBack)

    return () => window.removeEventListener('popstate', handleBack)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (
      (window.location.pathname === '/workspaces' ||
        window.location.pathname === '/profile' ||
        window.location.pathname === '/settings') &&
      params.get('login') === 'success'
    ) {
      setLoginSuccess(true)

      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  useEffect(() => {
    if (!loginSuccess) {
      return
    }

    const timeout = window.setTimeout(() => {
      setLoginSuccess(false)
    }, 5000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [loginSuccess])

  useEffect(() => {
    if (!signOutSuccess) {
      return
    }

    const timeout = window.setTimeout(() => {
      setSignOutSuccess(false)
    }, 5000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [signOutSuccess])

  useEffect(() => {
    if (
      path !== '/workspaces' &&
      path !== '/profile' &&
      path !== '/settings'
    ) {
      setCheckingAuthentication(false)
      return
    }

    async function checkAuthentication() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/me/`,
          {
            credentials: 'include',
          },
        )

        if (!response.ok) {
          navigate('/')
          return
        }

        const data = await response.json()

        if (!data.authenticated) {
          navigate('/')
          return
        }

        setCheckingAuthentication(false)
      } catch {
        navigate('/')
      }
    }

    checkAuthentication()
  }, [path])

  function navigate(nextPath: string) {
    window.history.pushState(null, '', nextPath)
    setPath(nextPath)
    window.scrollTo(0, 0)
  }

  async function handleEmailSignIn(
    email: string,
    password: string,
    remember: boolean,
  ) {
    setSignOutSuccess(false)
    setLoginError(null)

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
            remember,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setLoginError({
          error: data.error || 'login_failed',
          message:
            data.message ||
            'Unable to sign in. Please check your credentials and try again.',
          fields: data.fields,
        })

        return
      }

      if (!data.authenticated) {
        setLoginError({
          error: 'login_failed',
          message:
            'Unable to sign in. Please check your credentials and try again.',
          fields: {
            email: true,
            password: true,
          },
        })

        return
      }

      setLoginSuccess(true)
      navigate('/workspaces')
    } catch {
      setLoginError({
        error: 'connection_error',
        message:
          'Unable to connect to the authentication server. Please try again.',
        fields: {
          email: false,
          password: false,
        },
      })
    }
  }

  async function handleSignOut() {
    try {
      await fetch(
        `${API_BASE_URL}/auth/logout/`,
        {
          method: 'POST',
          credentials: 'include',
        },
      )
    } finally {
      setLoginSuccess(false)
      setLoginError(null)
      setSignOutSuccess(true)
      setCheckingAuthentication(false)

      navigate('/')
    }
  }

  if (
    path === '/workspaces' ||
    path === '/profile' ||
    path === '/settings'
  ) {
    if (checkingAuthentication) {
      return (
        <main className="flex min-h-screen items-center justify-center">
          <p>Checking authentication...</p>
        </main>
      )
    }

    const initialTab =
      path === '/profile'
        ? 'profile'
        : path === '/settings'
          ? 'settings'
          : 'workspaces'

    return (
      <WorkspacePage
        onSignOut={handleSignOut}
        loginSuccess={loginSuccess}
        initialTab={initialTab}
        onTabChange={(tab) => {
          const next =
            tab === 'profile'
              ? '/profile'
              : tab === 'settings'
                ? '/settings'
                : '/workspaces'
          window.history.pushState(null, '', next)
          setPath(next)
        }}
      />
    )
  }

  return (
    <LoginPage
      onContinue={handleEmailSignIn}
      loginError={loginError}
      signOutSuccess={signOutSuccess}
    />
  )
}

export default App