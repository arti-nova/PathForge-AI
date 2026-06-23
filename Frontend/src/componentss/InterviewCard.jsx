import { useState } from "react"
import axios from "axios"

function InterviewCard() {
  const [role, setRole] = useState("")
  const [industry, setIndustry] = useState("")
  const [skillType, setSkillType] = useState("Technical")

  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)

  const generateQuestion = async () => {
    if (!role) {
      alert("Please enter a role")
      return
    }

    try {
      setLoading(true)
      setQuestion(null)
      setFeedback("")

      const response = await axios.post(
        "http://localhost:5000/api/ai/interview-question",
        { role, industry, skillType }
      )

      setQuestion(response.data.interview)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const evaluateAnswer = async () => {
    if (!answer.trim()) {
      alert("Please write an answer first")
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        "http://localhost:5000/api/ai/evaluate-answer",
        {
          question: question?.questions?.[0] || question?.question,
          answer: answer.trim(),
        }
      )

      setFeedback(response.data.response)
    } catch (error) {
      console.log(error)
      setFeedback("Failed to evaluate answer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[32px] p-8 shadow-2xl relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
          AI Interview Simulator
        </h2>

        <div className="space-y-6">

          <div>
            <label className="block text-[var(--accent-coral)] font-semibold mb-2">
              What job are you hiring for?
            </label>
            <input
              type="text"
              placeholder="Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-coral)] transition-all"
            />
          </div>

          <div>
            <label className="block text-[var(--accent-coral)] font-semibold mb-2">
              What field/industry is the job in?
            </label>
            <textarea
              placeholder="Software Development"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-32 p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none resize-none focus:border-[var(--accent-coral)] transition-all"
            />
          </div>

          <div>
            <label className="block text-[var(--accent-coral)] font-semibold mb-2">
              Skills or qualities that need to be assessed
            </label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-coral)] transition-all"
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="System Design">System Design</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>

        </div>

        <button
          onClick={generateQuestion}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] text-[var(--bg-base)] font-bold hover:scale-[1.02] transition-all"
        >
          {loading ? "Generating..." : "Generate Interview Questions"}
        </button>

        {question && (
          <div className="mt-8 p-6 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-color)]">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Generated Questions
            </h3>

            {question.questions?.map((q, index) => (
              <div
                key={index}
                className="mb-4 p-4 rounded-xl bg-[var(--bg-surface)]"
              >
                <p className="text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-coral)] font-semibold">
                    Question {index + 1}
                  </span>
                  <br />
                  {q}
                </p>
              </div>
            ))}
          </div>
        )}

        {question && (
          <div className="mt-8">
            <textarea
              placeholder="Write your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full h-44 p-5 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none resize-none focus:border-[var(--accent-coral)] transition-all"
            />

            <button
              onClick={evaluateAnswer}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-lavender)] text-[var(--bg-base)] font-bold hover:scale-[1.02] transition-all"
            >
              {loading ? "Evaluating..." : "Evaluate Answer"}
            </button>
          </div>
        )}

        {feedback && (
          <div className="mt-10 p-6 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-color)] whitespace-pre-wrap">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-5">
              AI Feedback
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {feedback}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default InterviewCard