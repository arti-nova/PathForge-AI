import { motion } from "framer-motion"
import TypewriterText from "../componentss/TypewriterText"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    review: "PathForge AI completely transformed my learning journey.",
  },
  {
    name: "Ananya Singh",
    role: "AI Engineer",
    review: "The roadmap generator is insanely helpful.",
  },
  {
    name: "Aman Verma",
    role: "Full Stack Developer",
    review: "Best AI career platform I have ever used.",
  },
]

function TestimonialSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <TypewriterText
            text="What Users Say"
            as="h1"
            speed={40}
            className="text-5xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
          />
          <p className="text-[var(--text-secondary)] text-xl">
            Loved by future developers and AI engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-2xl"
            >
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                "{item.review}"
              </p>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                {item.name}
              </h1>
              <p className="text-[var(--accent-coral)] mt-2">{item.role}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialSection