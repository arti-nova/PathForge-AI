import Tilt from "react-parallax-tilt"
import { motion } from "framer-motion"

function FeatureCard({ title, description, icon }) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="var(--accent-coral)"
      scale={1.03}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      transitionSpeed={2000}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-xl p-8 shadow-2xl hover:border-[var(--accent-coral)]/40 transition-all duration-500 min-h-[280px]"
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

        <div className="text-5xl mb-6">{icon}</div>

        <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          {title}
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </motion.div>
    </Tilt>
  )
}

export default FeatureCard