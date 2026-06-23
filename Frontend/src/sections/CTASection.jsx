import { motion } from "framer-motion"
import TypewriterText from "../componentss/TypewriterText"

function CTASection() {
  return (
    <section className="py-32 px-6">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[var(--accent-coral)]/15 to-[var(--accent-lavender)]/15 border border-[var(--border-color)] backdrop-blur-2xl p-16 text-center"
      >
        <TypewriterText
          text="Start Building Your Future Today"
          as="h1"
          speed={30}
          className="text-5xl md:text-6xl font-black mb-8 text-[var(--text-primary)]"
        />

        <p className="text-[var(--text-secondary)] text-xl max-w-3xl mx-auto mb-10">
          Join thousands of students and developers
          using AI to accelerate their careers.
        </p>

        <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] text-[var(--bg-base)] text-xl font-bold hover:scale-105 transition-all duration-300">
          Get Started
        </button>
      </motion.div>
    </section>
  )
}

export default CTASection