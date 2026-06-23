import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

function getInitialTheme() {
  if (typeof window === "undefined") return "dark"
  const saved = localStorage.getItem("pathforge-theme")
  return saved || "dark"
}

// Apply immediately, before React even renders the loader
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-theme", getInitialTheme())
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("pathforge-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}