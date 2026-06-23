function ProgressCard() {
  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 w-full md:w-[350px] shadow-2xl hover:scale-105 transition-all duration-300">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[var(--text-primary)] text-2xl font-bold">
            Internship Readiness
          </h2>
          <div className="bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] px-4 py-1 rounded-full text-sm">
            +12%
          </div>
        </div>

        <div className="w-full bg-[var(--border-color)] h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] h-full rounded-full animate-pulse"
            style={{ width: "70%" }}
          />
        </div>

        <p className="text-[var(--text-secondary)] mt-5">
          You are 70% ready for frontend internships.
        </p>

      </div>
    </div>
  )
}

export default ProgressCard