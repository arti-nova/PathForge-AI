function TaskCard({ title, status, priority }) {
  return (
    <div className="relative overflow-hidden backdrop-blur-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 w-full md:w-[320px] shadow-2xl hover:scale-105 hover:border-[var(--accent-coral)]/40 transition-all duration-300">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10 opacity-50" />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)] text-xl font-bold">{title}</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-lavender)]/20 text-[var(--accent-lavender)]">
            {priority}
          </span>
        </div>

        <p className="text-[var(--text-secondary)] mb-6">
          Complete this task to improve your internship readiness.
        </p>

        <div className="flex items-center justify-between">
          <span className="px-4 py-2 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] text-sm">
            {status}
          </span>

          <button className="bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] hover:scale-105 px-4 py-2 rounded-xl text-[var(--bg-base)] font-semibold transition-all duration-300">
            View
          </button>
        </div>

      </div>
    </div>
  )
}

export default TaskCard