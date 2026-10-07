import { useEffect, useState } from 'react'

import { LoginPage } from './features/auth/LoginPage'
import { WorkspacePage } from './features/workspaces/WorkspacePage'

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
  const [checkingAuthentication, setCheckingAuthentication] = useState(
    window.location.pathname === '/workspaces',
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
    // Read the success indicator returned by the Google authentication flow.
    const params = new URLSearchParams(window.location.search)

    if (
      window.location.pathname === '/workspaces' &&
      params.get('login') === 'success'
    ) {
      setLoginSuccess(true)

      // Remove the login indicator from the browser URL.
      window.history.replaceState(null, '', '/workspaces')
    }
  }, [])

  useEffect(() => {
    // Hide the workspace login success message after five seconds.
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
    // Hide the sign-out success message after five seconds.
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
    // Verify the Django session whenever the workspace page is opened.
    if (path !== '/workspaces') {
      setCheckingAuthentication(false)
      return
    }

    async function checkAuthentication() {
      try {
        const response = await fetch(
          'http://localhost:8000/auth/me/',
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
    // Clear previous messages when the user starts signing in again.
    setSignOutSuccess(false)
    setLoginError(null)

    try {
      const response = await fetch(
        'http://localhost:8000/auth/login/',
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

      // Mark the login as successful before opening the workspace page.
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
      // Destroy the authenticated Django session.
      await fetch(
        'http://localhost:8000/auth/logout/',
        {
          method: 'POST',
          credentials: 'include',
        },
      )
    } finally {
      // Clear the workspace login message.
      setLoginSuccess(false)

      // Clear any previous login error.
      setLoginError(null)

      // Show the sign-out success message on the login page.
      setSignOutSuccess(true)

      // Stop the workspace authentication check.
      setCheckingAuthentication(false)

      // Return to the login page.
      navigate('/')
    }
  }

  if (path === '/workspaces') {
    if (checkingAuthentication) {
      return (
        <main className="flex min-h-screen items-center justify-center">
          <p>Checking authentication...</p>
        </main>
      )
    }

    return (
      <WorkspacePage
        onSignOut={handleSignOut}
        loginSuccess={loginSuccess}
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