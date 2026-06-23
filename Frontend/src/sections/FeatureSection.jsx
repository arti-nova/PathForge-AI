import { motion } from "framer-motion"
import TypewriterText from "../componentss/TypewriterText"

const features = [
  { title: "AI Resume Analyzer",   desc: "Analyze resumes using advanced AI models.",       icon: "📄" },
  { title: "AI Roadmap Generator", desc: "Generate personalized career roadmaps instantly.", icon: "🧠" },
  { title: "Interview Preparation",desc: "Practice real interview questions with AI.",       icon: "🎯" },
  { title: "AI Career Chatbot",    desc: "Get 24/7 AI career guidance and mentorship.",      icon: "🤖" },
  { title: "Analytics Dashboard",  desc: "Track your learning and growth visually.",         icon: "📊" },
  { title: "Smart Task Planner",   desc: "Generate productive daily learning plans.",        icon: "⚡" },
]

function FeaturesSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <TypewriterText
            text="Powerful AI Features"
            as="h1"
            speed={40}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
          />
          <p className="text-[var(--text-secondary)] text-xl">
            Everything you need to accelerate your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-2xl hover:border-[var(--accent-coral)]/30 transition-all duration-500"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                {feature.title}
              </h1>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturesSection