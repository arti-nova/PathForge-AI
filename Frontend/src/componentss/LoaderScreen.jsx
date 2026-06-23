import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function LoaderScreen() {
  const loadingTexts = [
  
    "Launching PathForge AI...",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[999] bg-[var(--bg-base)] flex items-center justify-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[var(--glow-1)] blur-3xl animate-pulse" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[var(--glow-2)] blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="
            text-6xl md:text-7xl font-extrabold
            bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)]
            bg-clip-text text-transparent mb-10
          "
        >
          PathForge AI
        </motion.h1>

        {/* Spinner */}
        <div className="relative w-24 h-24 mb-10">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-coral)]/15" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent-coral)] animate-spin" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-b-[var(--accent-lavender)] animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.4s" }}
          />
        </div>

        {/* Loading Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-[var(--text-secondary)] font-medium"
          >
            {loadingTexts[index]}
          </motion.p>
        </AnimatePresence>

        {/* Progress dots */}


      </div>
    </div>
  )
}

export default LoaderScreen