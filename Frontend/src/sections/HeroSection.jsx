import { motion } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import TypewriterText from "../componentss/TypewriterText"

function AnimatedOrb() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const getColors = () => {
      const styles = getComputedStyle(document.documentElement)
      return {
        coral: styles.getPropertyValue("--accent-coral").trim() || "#FF7A5C",
        lavender: styles.getPropertyValue("--accent-lavender").trim() || "#9B7FC7",
        gold: styles.getPropertyValue("--accent-gold").trim() || "#D9A441",
        text: styles.getPropertyValue("--text-primary").trim() || "#3D2C1F",
      }
    }

    let colors = getColors()

    const particles = Array.from({ length: 120 }, (_, i) => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
      radius: 140 + Math.random() * 20,
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.004 + 0.001,
      offset: Math.random() * Math.PI * 2,
      colorKey: i % 3 === 0 ? "coral" : i % 3 === 1 ? "lavender" : "gold",
    }))

    const rings = Array.from({ length: 3 }, (_, i) => ({
      radiusX: 150 + i * 30,
      radiusY: 40 + i * 10,
      tilt: (i * Math.PI) / 5,
      speed: 0.003 + i * 0.001,
      colorKey: ["coral", "lavender", "gold"][i],
    }))

    let frameCount = 0

    const draw = () => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      frameCount++
      if (frameCount % 30 === 0) colors = getColors()

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110)
      grad.addColorStop(0, colors.coral + "29")
      grad.addColorStop(0.5, colors.lavender + "1a")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.beginPath()
      ctx.arc(cx, cy, 110, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      const sphereGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, 100)
      sphereGrad.addColorStop(0, colors.text + "10")
      sphereGrad.addColorStop(1, colors.text + "02")
      ctx.beginPath()
      ctx.arc(cx, cy, 100, 0, Math.PI * 2)
      ctx.fillStyle = sphereGrad
      ctx.fill()
      ctx.strokeStyle = colors.text + "14"
      ctx.lineWidth = 1
      ctx.stroke()

      rings.forEach((ring) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(ring.tilt + t * ring.speed * 30)
        ctx.beginPath()
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2)
        ctx.strokeStyle = colors[ring.colorKey] + "55"
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      })

      particles.forEach((p) => {
        p.theta += p.speed
        const x = cx + Math.sin(p.phi) * Math.cos(p.theta + p.offset) * p.radius
        const y = cy + Math.sin(p.phi) * Math.sin(p.theta + p.offset) * p.radius * 0.4
        const z = Math.cos(p.phi) * p.radius
        const scale = (z + p.radius) / (2 * p.radius)
        const alpha = 0.3 + scale * 0.7

        ctx.beginPath()
        ctx.arc(x, y, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle =
          colors[p.colorKey] +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      const labels = [
        { text: "Resume AI", angle: t * 0.4, r: 190 },
        { text: "Roadmap",   angle: t * 0.4 + (Math.PI * 2) / 3, r: 190 },
        { text: "Interview", angle: t * 0.4 + (Math.PI * 4) / 3, r: 190 },
      ]
      labels.forEach((l) => {
        const lx = cx + Math.cos(l.angle) * l.r
        const ly = cy + Math.sin(l.angle) * (l.r * 0.38)
        ctx.font = "bold 11px monospace"
        ctx.fillStyle = colors.text + "80"
        ctx.textAlign = "center"
        ctx.fillText(l.text, lx, ly)
      })

      t += 0.012
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}

function LogoMark() {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 88 88"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="lmTg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-coral)" />
          <stop offset="100%" stopColor="var(--accent-lavender)" />
        </linearGradient>
        <linearGradient id="lmCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-coral)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent-lavender)" stopOpacity="0.2" />
        </linearGradient>
        <style>{`
          .lm-ring1 { animation: lmSpin1 6s linear infinite; transform-origin: 44px 44px; }
          .lm-ring2 { animation: lmSpin2 9s linear infinite; transform-origin: 44px 44px; }
          .lm-ring3 { animation: lmSpin3 12s linear infinite; transform-origin: 44px 44px; }
          @keyframes lmSpin1 { to { transform: rotate(360deg); } }
          @keyframes lmSpin2 { to { transform: rotate(-360deg); } }
          @keyframes lmSpin3 { to { transform: rotate(360deg); } }
          .lm-spark1 { animation: lmOrb1 4s linear infinite; transform-origin: 44px 44px; }
          .lm-spark2 { animation: lmOrb2 4s linear infinite; transform-origin: 44px 44px; }
          .lm-spark3 { animation: lmOrb3 4s linear infinite; transform-origin: 44px 44px; }
          @keyframes lmOrb1 { to { transform: rotate(360deg); } }
          @keyframes lmOrb2 { from { transform: rotate(120deg); } to { transform: rotate(480deg); } }
          @keyframes lmOrb3 { from { transform: rotate(240deg); } to { transform: rotate(600deg); } }
          .lm-core { animation: lmBreathe 3s ease-in-out infinite; }
          @keyframes lmBreathe { 0%,100%{ opacity:0.5; } 50%{ opacity:0.9; } }
          .lm-pf { animation: lmShimmer 4s ease-in-out infinite; }
          @keyframes lmShimmer {
            0%,100% { fill: url(#lmTg); }
            50% { fill: var(--accent-lavender); }
          }
        `}</style>
      </defs>

      <circle cx="44" cy="44" r="42" fill="var(--accent-coral)" fillOpacity="0.06" />
      <circle cx="44" cy="44" r="34" fill="var(--accent-lavender)" fillOpacity="0.07" />

      <g className="lm-ring1">
        <ellipse cx="44" cy="44" rx="38" ry="13" fill="none" stroke="var(--accent-coral)" strokeWidth="1.1" strokeOpacity="0.55" strokeDasharray="5 3" />
      </g>

      <g className="lm-ring2">
        <ellipse cx="44" cy="44" rx="13" ry="38" fill="none" stroke="var(--accent-lavender)" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="4 4" />
      </g>

      <g className="lm-ring3" style={{ transform: "rotate(45deg)", transformOrigin: "44px 44px" }}>
        <ellipse cx="44" cy="44" rx="34" ry="11" fill="none" stroke="var(--accent-gold)" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3 5" />
      </g>

      <g className="lm-spark1">
        <circle cx="82" cy="44" r="2.4" fill="var(--accent-coral)" />
      </g>
      <g className="lm-spark2">
        <circle cx="82" cy="44" r="2" fill="var(--accent-lavender)" />
      </g>
      <g className="lm-spark3">
        <circle cx="82" cy="44" r="2.2" fill="var(--accent-gold)" />
      </g>

      <circle className="lm-core" cx="44" cy="44" r="22" fill="url(#lmCoreGrad)" />

      <circle cx="44" cy="44" r="20" fill="none" stroke="var(--accent-coral)" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="44" cy="44" r="20" fill="none" stroke="var(--accent-lavender)" strokeWidth="0.9" strokeOpacity="0.3" strokeDasharray="7 4" />

      <circle cx="44" cy="44" r="17" fill="var(--bg-base)" stroke="var(--accent-gold)" strokeWidth="1.2" />

      <text
        className="lm-pf"
        x="44" y="49"
        textAnchor="middle"
        fontFamily="'Orbitron', monospace"
        fontWeight="900"
        fontSize="13"
        fill="url(#lmTg)"
      >
        PF
      </text>

      <line x1="44" y1="4" x2="44" y2="9" stroke="var(--accent-coral)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="44" y1="79" x2="44" y2="84" stroke="var(--accent-coral)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="4" y1="44" x2="9" y2="44" stroke="var(--accent-lavender)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="79" y1="44" x2="84" y2="44" stroke="var(--accent-lavender)" strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32"
    >

      <Parallax speed={-20}>
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[var(--glow-1)] rounded-full blur-3xl" />
      </Parallax>
      <Parallax speed={20}>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[var(--glow-2)] rounded-full blur-3xl" />
      </Parallax>
      <Parallax speed={15}>
        <div className="absolute top-[20%] right-[10%] w-40 h-40 rounded-full bg-[var(--accent-gold)]/10 blur-2xl" />
      </Parallax>
      <Parallax speed={-15}>
        <div className="absolute bottom-[10%] left-[10%] w-32 h-32 rounded-full bg-[var(--accent-coral)]/10 blur-2xl" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        <div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-xl text-[var(--accent-coral)] mb-8"
          >
            AI Powered Career Platform
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <TypewriterText
              text="Build Your "
              as="h1"
              speed={50}
              className="text-5xl md:text-7xl font-extrabold leading-tight text-[var(--text-primary)]"
            />
            <TypewriterText
              text="AI Career"
              as="div"
              speed={50}
              startDelay={700}
              className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
            />
            <TypewriterText
              text="Journey"
              as="h1"
              speed={50}
              startDelay={1400}
              className="text-5xl md:text-7xl font-extrabold leading-tight text-[var(--text-primary)]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            PathForge AI is your personal AI career co-pilot. Whether you're a
            fresher stepping into tech or a professional aiming for your next
            big role, we analyze your resume in seconds, generate a personalized
            learning roadmap, simulate real interview sessions, and track your
            progress — so you always know exactly what to do next.
            No guesswork. Just a clear, AI-driven path to your dream career.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {[].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-sm bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start gap-5"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] text-[var(--bg-base)] font-bold text-lg shadow-2xl shadow-[var(--accent-coral)]/20"
              >
                Get Started Free
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-8 py-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-xl text-[var(--text-primary)] font-bold text-lg hover:bg-[var(--bg-surface-hover)] transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div>
              <h2 className="text-4xl font-black text-[var(--accent-coral)]">10K+</h2>
              <p className="text-[var(--text-secondary)] mt-2">Users</p>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[var(--accent-lavender)]">500+</h2>
              <p className="text-[var(--text-secondary)] mt-2">Roadmaps</p>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[var(--accent-gold)]">AI</h2>
              <p className="text-[var(--text-secondary)] mt-2">Powered</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="absolute w-[420px] h-[420px] rounded-full border border-[var(--accent-coral)]/20"
          />
          <motion.div
            animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}
            className="absolute w-[480px] h-[480px] rounded-full border border-[var(--accent-lavender)]/15"
          />

          <div className="relative w-[420px] h-[420px]">
            <AnimatedOrb />

            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <LogoMark />
            </motion.div>
          </div>

          {[
            { label: "Resume Score", value: "92%", color: "coral", top: "8%", left: "-8%" },
            { label: "Interview", value: "87%", color: "lavender", top: "8%", right: "-8%" },
            { label: "Roadmap", value: "85%", color: "gold", bottom: "8%", left: "-5%" },
          ].map((chip) => (
            <motion.div
              key={chip.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 + Math.random(), delay: Math.random() }}
              style={{ position: "absolute", top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right }}
              className="px-4 py-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-xl text-center shadow-sm"
            >
              <p className="text-xs text-[var(--text-secondary)]">{chip.label}</p>
              <p
                className={`text-lg font-black ${
                  chip.color === "coral"
                    ? "text-[var(--accent-coral)]"
                    : chip.color === "lavender"
                    ? "text-[var(--accent-lavender)]"
                    : "text-[var(--accent-gold)]"
                }`}
              >
                {chip.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection