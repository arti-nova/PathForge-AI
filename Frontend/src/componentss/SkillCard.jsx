function SkillCard({ skill, level }) {
  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 w-full sm:w-[250px] shadow-2xl hover:scale-105 hover:border-[var(--accent-coral)]/30 transition-all duration-300">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[var(--text-primary)] text-2xl font-bold">{skill}</h2>
          <span className="bg-[var(--accent-coral)]/20 text-[var(--accent-coral)] px-3 py-1 rounded-full text-sm">
            {level}%
          </span>
        </div>

        <div className="w-full bg-[var(--border-color)] h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] h-full rounded-full transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>

        <p className="text-[var(--text-secondary)] mt-4">
          Strong progress detected in this skill.
        </p>

      </div>
    </div>
  )
}

export default SkillCard