import { useState } from "react"
import axios from "axios"
import { auth } from "../firebase/firebase"

function RoadmapCard() {
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)

  const generateRoadmap = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:5000/api/ai/generate-roadmap",
        { goal, userEmail: auth.currentUser.email }
      )
      setRoadmap(response.data.roadmap)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          AI Roadmap Generator
        </h2>

        <p className="text-[var(--text-secondary)] mb-6">
          Enter your dream career goal.
        </p>

        <input
          type="text"
          placeholder="Example: Full Stack Developer"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-coral)] transition-all"
        />

        <button
          onClick={generateRoadmap}
          className="mt-6 w-full py-4 rounded-2xl font-bold text-[var(--bg-base)] bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] hover:scale-105 transition-all duration-300"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        {roadmap && (
          <div className="mt-10">

            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-[var(--text-primary)]">
                {roadmap.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
                <h3 className="text-[var(--accent-coral)] text-xl font-bold mb-4">
                  Skills
                </h3>
                {roadmap.skills?.map((skill, index) => (
                  <p key={index} className="text-[var(--text-secondary)] mb-2">
                    {skill}
                  </p>
                ))}
              </div>

              <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
                <h3 className="text-[var(--accent-gold)] text-xl font-bold mb-4">
                  Projects
                </h3>
                {roadmap.projects?.map((project, index) => (
                  <div
                    key={index}
                    className="mb-4 p-3 rounded-xl bg-[var(--bg-surface)]"
                  >
                    <h4 className="text-[var(--text-primary)] font-semibold">
                      {project.name}
                    </h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      {project.description}
                    </p>
                    <p className="text-[var(--accent-coral)] text-sm">
                      Difficulty: {project.difficulty}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
                <h3 className="text-[var(--accent-lavender)] text-xl font-bold mb-4">
                  Timeline
                </h3>
                {roadmap.timeline?.map((item, index) => (
                  <p key={index} className="text-[var(--text-secondary)] mb-2">
                    📅 {item}
                  </p>
                ))}
              </div>

              <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
                <h3 className="text-[var(--accent-gold)] text-xl font-bold mb-4">
                  Resources
                </h3>
                {roadmap.resources?.map((resource, index) => (
                  <p key={index} className="text-[var(--text-secondary)] mb-2">
                    📚 {resource}
                  </p>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default RoadmapCard