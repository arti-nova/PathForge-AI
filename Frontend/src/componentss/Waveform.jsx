import { motion } from "framer-motion"

function Waveform({ listening, loading }) {
  const bars = Array.from({ length: 30 })

  return (
    <div className="flex items-center justify-center gap-1 h-24 py-4">
      {bars.map((_, index) => (
        <motion.div
          key={index}
          animate={{
            height:
              listening || loading
                ? [20, Math.random() * 80, 20]
                : 20,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.05,
          }}
          className="w-2 rounded-full bg-gradient-to-t from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] shadow-[0_0_15px_rgba(255,122,92,0.4)]"
        />
      ))}
    </div>
  )
}

export default Waveform