import { motion } from "framer-motion"

const insights = [
  {
    title: "Frontend Strength",
    description:
      "Your React and JavaScript skills are improving rapidly. Focus on advanced state management next.",
    
  },
  {
    title: "Internship Prediction",
    description:
      "Based on your current progress, you are highly suitable for frontend internship roles.",
  },
  {
    title: "AI Recommendation",
    description:
      "Build 2 real-world projects with APIs to increase your hiring score significantly.",

  },
  {
    title: "Learning Suggestion",
    description:
      "Learn backend fundamentals with Node.js and Express to become full-stack ready.",
    
  },
]

function AIInsights() {
  return (
    <div className="w-full">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {insights.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.3 }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-[var(--border-color)]
              bg-[var(--bg-surface)]
              backdrop-blur-xl
              p-8
              shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            "
          >

            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-lavender)]/15 blur-3xl" />

            <div className="relative z-10">

              <div className="text-5xl mb-6">{item.emoji}</div>

              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                {item.title}
              </h2>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  )
}

export default AIInsights