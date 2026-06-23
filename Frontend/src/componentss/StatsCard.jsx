import { motion } from "framer-motion"

function StatsCard({ title, value, change, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >

      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-lavender)]/15 blur-3xl" />

      <div className="relative z-10">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[var(--text-secondary)] font-medium">{title}</h3>
          <div className="text-3xl">{icon}</div>
        </div>

        <h1 className="text-4xl font-bold text-[var(--text-primary)]">{value}</h1>

        <p className="mt-3 text-[var(--accent-gold)] font-medium">{change}</p>

      </div>
    </motion.div>
  )
}

export default StatsCard