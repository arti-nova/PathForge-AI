function ResumeScoreCard({
  score = 0,
  skills = [],
  strengths = [],
  missingSkills = [],
  suggestions = [],
}) {
  return (
    <div className="mt-10 backdrop-blur-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[32px] p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-10">
        Resume Analytics
      </h2>

      <div className="flex flex-col items-center justify-center mb-12">
        <div className="relative w-44 h-44 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] shadow-2xl">
          <div className="absolute w-36 h-36 rounded-full bg-[var(--bg-base)] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-[var(--text-primary)]">
                {score}
              </h1>
              <p className="text-[var(--text-secondary)]">ATS Score</p>
            </div>
          </div>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Skills Found
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-[var(--accent-lavender)]/20 border border-[var(--accent-lavender)]/30 text-[var(--accent-lavender)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
          <h3 className="text-xl font-bold text-[var(--accent-gold)] mb-4">
            Strengths
          </h3>
          <div className="space-y-3">
            {strengths.length > 0 ? (
              strengths.map((item, index) => (
                <p key={index} className="text-[var(--text-secondary)]">
                  ✔ {item}
                </p>
              ))
            ) : (
              <p className="text-[var(--text-secondary)]/60">No strengths found</p>
            )}
          </div>
        </div>

        <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
          <h3 className="text-xl font-bold text-[var(--accent-coral)] mb-4">
            Missing Skills
          </h3>
          <div className="space-y-3">
            {missingSkills.length > 0 ? (
              missingSkills.map((item, index) => (
                <p key={index} className="text-[var(--text-secondary)]">
                  ✘ {item}
                </p>
              ))
            ) : (
              <p className="text-[var(--text-secondary)]/60">No missing skills</p>
            )}
          </div>
        </div>

        <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-3xl p-6">
          <h3 className="text-xl font-bold text-[var(--accent-lavender)] mb-4">
            Suggestions
          </h3>
          <div className="space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <p key={index} className="text-[var(--text-secondary)]">
                  • {item}
                </p>
              ))
            ) : (
              <p className="text-[var(--text-secondary)]/60">No suggestions available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResumeScoreCard