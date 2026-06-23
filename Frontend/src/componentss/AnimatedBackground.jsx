import { useEffect, useRef } from "react"

function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    let particlesArray = []
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const getThemeColors = () => {
      const styles = getComputedStyle(document.documentElement)
      return {
        coral: styles.getPropertyValue("--accent-coral").trim() || "#FF7A5C",
        lavender: styles.getPropertyValue("--accent-lavender").trim() || "#9B7FC7",
        gold: styles.getPropertyValue("--accent-gold").trim() || "#D9A441",
        isDark: document.documentElement.getAttribute("data-theme") === "dark",
      }
    }

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 122, b: 92 }
    }

    class Particle {
      constructor(colors) {
        this.colors = colors
        this.reset()
      }

      reset() {
        const palette = [this.colors.coral, this.colors.lavender, this.colors.gold]
        const rgb = hexToRgb(palette[Math.floor(Math.random() * palette.length)])

        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.2 + 0.8
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.rgb = rgb
        this.opacity = Math.random() * 0.4 + 0.3
        this.opacitySpeed = Math.random() * 0.005 + 0.002
        this.opacityDir = Math.random() > 0.5 ? 1 : -1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        this.opacity += this.opacitySpeed * this.opacityDir
        if (this.opacity >= 0.7) this.opacityDir = -1
        if (this.opacity <= 0.15) this.opacityDir = 1

        if (this.x > canvas.width)  this.x = 0
        if (this.x < 0)             this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0)             this.y = canvas.height
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.opacity})`
        ctx.fill()
      }
    }

    let themeColors = getThemeColors()

    function init() {
      particlesArray = []
      for (let i = 0; i < 90; i++) {
        particlesArray.push(new Particle(themeColors))
      }
    }

    init()

    function connectParticles() {
      const coralRgb = hexToRgb(themeColors.coral)
      const lavenderRgb = hexToRgb(themeColors.lavender)
      const lineAlpha = themeColors.isDark ? 0.1 : 0.08

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = dx * dx + dy * dy

          if (distance < 11000) {
            const alpha = (1 - distance / 11000) * lineAlpha
            const rgb = a % 2 === 0 ? coralRgb : lavenderRgb

            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
            ctx.lineWidth = 0.7

            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    let frameCount = 0

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // re-check theme every 30 frames in case it was toggled
      frameCount++
      if (frameCount % 30 === 0) {
        themeColors = getThemeColors()
      }

      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
    />
  )
}

export default AnimatedBackground