import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      setLoading(true)
      setError("")
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] relative overflow-hidden px-6">

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-[var(--accent-gold)]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[var(--glow-2)] rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300">

        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          Create Account 
        </h1>

        <p className="text-[var(--text-secondary)] mb-8">
          Start your AI-powered career journey today.
        </p>

        {error && (
          <div className="mb-5 bg-[var(--accent-coral)]/10 border border-[var(--accent-coral)]/30 text-[var(--accent-coral)] p-4 rounded-2xl">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 outline-none focus:border-[var(--accent-gold)] transition-all mb-4"
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 outline-none focus:border-[var(--accent-lavender)] transition-all mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-coral)] to-[var(--accent-lavender)] hover:scale-[1.02] transition-all duration-300 text-[var(--bg-base)] font-bold shadow-lg"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-[var(--text-secondary)] text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--accent-gold)] hover:text-[var(--accent-lavender)] transition-all">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup