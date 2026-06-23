import { auth } from "../firebase/firebase"

function ProfileCard() {
  const user = auth.currentUser

  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">

        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] flex items-center justify-center text-4xl font-bold text-[var(--bg-base)] mb-6 shadow-lg">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Welcome Back 
        </h2>

        <p className="text-[var(--text-secondary)] mb-6">
          {user?.email}
        </p>

        <div className="space-y-4">

          <div>
            <p className="text-[var(--text-secondary)] mb-1">Career Goal</p>
            <h3 className="text-[var(--accent-gold)] font-semibold">Frontend Developer</h3>
          </div>

          <div>
            <p className="text-[var(--text-secondary)] mb-1">AI Readiness</p>
            <h3 className="text-[var(--accent-gold)] font-semibold">92%</h3>
          </div>

          <div>
            <p className="text-[var(--text-secondary)] mb-1">Weekly Progress</p>
            <h3 className="text-[var(--accent-gold)] font-semibold">Excellent Growth </h3>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProfileCard