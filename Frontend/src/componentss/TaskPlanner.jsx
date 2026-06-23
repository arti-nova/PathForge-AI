import { useState } from "react"
import axios from "axios"

function TaskPlanner() {
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState("")

  const generateTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "https://pathforge-ai-backend-m8dw.onrender.com/api/ai/generate-tasks",
        { goal }
      )
      setTasks(response.data.response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-gold)]/10" />

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          AI Daily Planner
        </h2>

        <p className="text-[var(--text-secondary)] mb-6">
          Generate personalized daily tasks.
        </p>

        <input
          type="text"
          placeholder="Example: Become Full Stack Developer"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-coral)] transition-all"
        />

        <button
          onClick={generateTasks}
          className="mt-6 w-full py-4 rounded-2xl font-bold text-[var(--bg-base)] bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-gold)] hover:scale-105 transition-all duration-300"
        >
          {loading ? "Generating..." : "Generate Tasks"}
        </button>

        {tasks && (
          <div className="mt-6 p-5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-pre-wrap">
            <h2 className="text-[var(--text-primary)] text-xl font-bold mb-3">
              AI Generated Plan
            </h2>
            <p>{tasks}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default TaskPlanner