import { useState } from "react"
import Navbar from "../componentss/Navbar"
import Sidebar from "../sections/Sidebar"
import AnimatedBackground from "../componentss/AnimatedBackground"

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* Top Glow */}
      <div className="fixed top-[-250px] left-[-250px] w-[600px] h-[600px] bg-[var(--glow-1)] rounded-full blur-3xl animate-pulse z-0" />

      {/* Bottom Glow */}
      <div className="fixed bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-[var(--glow-2)] rounded-full blur-3xl animate-pulse z-0" />

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar onMenuOpen={() => setIsOpen(true)} />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-10">
        {children}
      </main>

    </div>
  )
}

export default DashboardLayout