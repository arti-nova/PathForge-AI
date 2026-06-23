import { motion } from "framer-motion"
import TypewriterText from "../componentss/TypewriterText"

const steps = [
  "Create Your Account",
  "Upload Resume",
  "Get AI Analysis",
  "Generate Career Roadmap",
  "Practice Interviews",
  "Track Growth",
]

function TimelineSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <TypewriterText
            text="Your AI Journey"
            as="h1"
            speed={40}
            className="text-5xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
          />
          <p className="text-[var(--text-secondary)] text-xl">
            Follow the complete AI-powered career path.
          </p>
        </motion.div>

        <div className="relative">

          <div className="absolute left-1/2 top-0 w-[3px] h-full bg-gradient-to-b from-[var(--accent-coral)] to-[var(--accent-lavender)] -translate-x-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`relative mb-20 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-[45%] p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-2xl">
                <div className="text-[var(--accent-coral)] text-lg font-bold mb-3">
                  Step {index + 1}
                </div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  {step}
                </h1>
              </div>

              <div className="absolute left-1/2 top-8 w-6 h-6 rounded-full bg-[var(--accent-coral)] -translate-x-1/2 shadow-2xl shadow-[var(--accent-coral)]/40" />
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default TimelineSection