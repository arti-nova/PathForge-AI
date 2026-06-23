import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", score: 20 },
  { day: "Tue", score: 35 },
  { day: "Wed", score: 45 },
  { day: "Thu", score: 60 },
  { day: "Fri", score: 75 },
  { day: "Sat", score: 85 },
  { day: "Sun", score: 95 },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-xl px-4 py-3 shadow-lg">
        <p className="text-[var(--text-secondary)] text-xs mb-1">{label}</p>
        <p className="text-[var(--text-primary)] font-bold text-lg">
          {payload[0].value}
          <span className="text-[var(--text-secondary)] text-xs font-normal ml-1">
            score
          </span>
        </p>
      </div>
    )
  }
  return null
}

function AnalyticsChart() {
  const current = data[data.length - 1].score
  const previous = data[data.length - 2].score
  const change = current - previous
  const weekStart = data[0].score
  const weekChangePct = Math.round(((current - weekStart) / weekStart) * 100)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">

      <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-lavender)]/15 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              AI Growth Analytics
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Your internship readiness is improving daily.
            </p>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wide mb-1">
                Current
              </p>
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">
                {current}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wide mb-1">
                This Week
              </p>
              <p
                className={`text-3xl font-extrabold ${
                  weekChangePct >= 0
                    ? "text-[var(--accent-gold)]"
                    : "text-[var(--accent-coral)]"
                }`}
              >
                {weekChangePct >= 0 ? "+" : ""}
                {weekChangePct}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>

              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-coral)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--accent-coral)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border-color)"
              />

              <XAxis
                dataKey="day"
                stroke="var(--text-secondary)"
                tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="var(--text-secondary)"
                tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="score"
                stroke="var(--accent-coral)"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ r: 4, strokeWidth: 2, stroke: "var(--accent-coral)", fill: "var(--bg-surface)" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "var(--accent-lavender)" }}
              />

            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer summary */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex items-center justify-between text-sm">
          <p className="text-[var(--text-secondary)]">
            Last updated: today
          </p>
          <p className="text-[var(--text-secondary)]">
            Day-over-day:{" "}
            <span
              className={
                change >= 0
                  ? "text-[var(--accent-gold)] font-semibold"
                  : "text-[var(--accent-coral)] font-semibold"
              }
            >
              {change >= 0 ? "+" : ""}
              {change}
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default AnalyticsChart