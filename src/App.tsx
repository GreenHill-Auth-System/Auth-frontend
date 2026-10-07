import { useEffect, useState } from 'react'
import { LoginPage } from './features/auth/LoginPage'
import { WorkspacePage } from './features/workspaces/WorkspacePage'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleBack = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleBack)
    return () => window.removeEventListener('popstate', handleBack)
  }, [])

  function navigate(nextPath: string) {
    window.history.pushState(null, '', nextPath)
    setPath(nextPath)
    window.scrollTo(0, 0)
  }

  // UI navigation only. Replace this continuation with verified authentication.
  return path === '/workspaces'
    ? <WorkspacePage onSignOut={() => navigate('/')} />
    : <LoginPage onContinue={() => navigate('/workspaces')} />
}

export default App
