import { Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./firebase/firebase"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import LoaderScreen from "./componentss/LoaderScreen"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import PageTransition from "./componentss/PageTransition"
import { ThemeProvider } from "./sections/ThemeContext"

function App() {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      {loading || appLoading ? (
        <LoaderScreen />
      ) : (
        <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative z-10">

          <div className="fixed top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[var(--glow-1)] rounded-full blur-3xl animate-pulse z-0" />
          <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-[var(--glow-2)] rounded-full blur-3xl animate-pulse z-0" />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>

                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <PageTransition>
                      <Signup />
                    </PageTransition>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <PageTransition>
                      <Login />
                    </PageTransition>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    user ? (
                      <PageTransition>
                        <Dashboard />
                      </PageTransition>
                    ) : (
                      <PageTransition>
                        <Login />
                      </PageTransition>
                    )
                  }
                />

              </Routes>
            </AnimatePresence>
          </div>

        </div>
      )}
    </ThemeProvider>
  )
}

export default App