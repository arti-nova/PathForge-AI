import { Link } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaFileAlt, FaRoad, FaComments,
  FaChartLine, FaUserTie, FaTimes
} from "react-icons/fa"

function LandingSidebar({ isOpen, setIsOpen }) {

  const navItems = [
    { title: "Resume",    to: "resume",    icon: <FaFileAlt />,   colorVar: "var(--accent-coral)" },
    { title: "Roadmap",   to: "roadmap",   icon: <FaRoad />,      colorVar: "var(--accent-gold)" },
    { title: "AI Chat",   to: "chat",      icon: <FaComments />,  colorVar: "var(--accent-lavender)" },
    { title: "Interview", to: "interview", icon: <FaUserTie />,   colorVar: "var(--accent-coral)" },
    { title: "Planner",   to: "planner",   icon: <FaChartLine />, colorVar: "var(--accent-gold)" },
    { title: "Insights",  to: "insights",  icon: <FaChartLine />, colorVar: "var(--accent-lavender)" },
  ]

  const drawerVariants = {
    hidden:  { x: "100%", opacity: 0 },
    visible: {
      x: 0, opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 },
    },
    exit: {
      x: "110%", opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
  }

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  }

  const itemVariants = {
    hidden:  { x: 60, opacity: 0 },
    visible: {
      x: 0, opacity: 1,
      transition: { type: "spring", stiffness: 280, damping: 24 },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm md:hidden"
          />

          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed top-0 right-0 h-full w-72 z-[999]
              md:hidden flex flex-col
              bg-[var(--bg-base)]/95 backdrop-blur-3xl
              border-l border-[var(--border-color)] shadow-2xl shadow-black/30
              overflow-hidden
            "
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-coral)]/60 to-transparent" />

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--accent-coral)]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[var(--accent-lavender)]/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between px-7 pt-8 pb-6">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className="text-2xl font-black bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
              >
                PathForge AI
              </motion.h1>

              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors duration-200"
              >
                <FaTimes />
              </motion.button>
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.4 }}
              className="mx-7 mb-6 h-px bg-[var(--border-color)]"
            />

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 px-5 flex-1"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Link
                    to={item.to}
                    smooth duration={800}
                    spy activeClass="active-sidebar"
                    offset={-60}
                    onClick={() => setIsOpen(false)}
                    className="group cursor-pointer block"
                  >
                    <div
                      className="
                        flex items-center gap-4 px-5 py-4 rounded-2xl
                        bg-[var(--bg-surface)] border border-[var(--border-color)]
                        hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-coral)]/30
                        group-[.active-sidebar]:border-[var(--accent-coral)]/40
                        group-[.active-sidebar]:bg-[var(--accent-coral)]/10
                        transition-all duration-300 relative overflow-hidden
                      "
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shadow-lg flex-shrink-0"
                        style={{ background: item.colorVar }}
                      >
                        {item.icon}
                      </div>
                      <span className="text-[var(--text-secondary)] font-semibold text-sm group-hover:text-[var(--text-primary)] group-[.active-sidebar]:text-[var(--accent-coral)] transition-colors duration-200">
                        {item.title}
                      </span>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)] opacity-0 group-[.active-sidebar]:opacity-100" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-7 py-6 mt-auto"
            >
              <div className="h-px bg-[var(--border-color)] mb-5" />
              <p className="text-xs text-[var(--text-secondary)] text-center">
                Build your AI-powered future.
              </p>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-lavender)]/60 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LandingSidebar