import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import { FaBars, FaSun, FaMoon } from "react-icons/fa"
import { useAuth } from "../sections/AuthContext"
import { useTheme } from "../sections/ThemeContext"

function Navbar({ onMenuOpen }) {
  const { isLoggedIn, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between rounded-3xl border border-[var(--border-color)] bg-[var(--bg-base)]/90 backdrop-blur-2xl px-8 py-4 shadow-md">

        <Link to="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-black bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
          >
            PathForge AI
          </motion.h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--accent-coral)] transition-all duration-300">
            About
          </a>

          <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--accent-coral)] transition-all duration-300">
            Features
          </a>

          <ScrollLink
            to="resume"
            smooth
            duration={800}
            offset={-80}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-coral)] transition-all duration-300 cursor-pointer"
          >
            Resume Analyzer
          </ScrollLink>

          <AnimatePresence>
            {isLoggedIn && (
              <motion.div
                key="dashboard-link"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-[var(--accent-coral)] font-semibold border border-[var(--accent-coral)]/30 bg-[var(--accent-coral)]/10 px-4 py-1.5 rounded-xl hover:bg-[var(--accent-coral)]/20 transition-all duration-300"
                >
                  <span className="text-xs">⊞</span>
                  Dashboard
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-12 h-7 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center px-1 transition-colors duration-300"
            title="Toggle theme"
          >
            <motion.div
              animate={{ x: theme === "light" ? 0 : 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--accent-coral)] to-[var(--accent-lavender)] flex items-center justify-center text-[10px] text-white"
            >
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </motion.div>
          </motion.button>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-coral)] to-[var(--accent-lavender)] flex items-center justify-center text-sm font-bold text-[var(--bg-base)] cursor-pointer"
                  title="Go to Dashboard"
                >
                  U
                </motion.div>
              </Link>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--accent-coral)]/10 hover:border-[var(--accent-coral)]/30 hover:text-[var(--accent-coral)] transition-all duration-300 text-sm"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="hidden md:block px-6 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-all duration-300">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] font-semibold text-[var(--bg-base)] shadow-lg shadow-[var(--accent-coral)]/20"
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          )}

          <motion.button
            onClick={onMenuOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-coral)] text-xl hover:bg-[var(--bg-surface-hover)] transition-colors duration-300"
          >
            <FaBars />
          </motion.button>

        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar