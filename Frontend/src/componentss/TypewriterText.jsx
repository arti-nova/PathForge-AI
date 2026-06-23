import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

function TypewriterText({
  text,
  as = "h1",
  className = "",
  speed = 40,
  startDelay = 0,
  once = true,
  showCursor = true,
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [isDone, setIsDone] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || (once && hasStarted.current)) return

    hasStarted.current = true
    let index = 0
    setDisplayedText("")
    setIsDone(false)

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        index++
        setDisplayedText(text.slice(0, index))

        if (index >= text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [isInView, text, speed, startDelay, once])

  const Tag = as

  return (
    <Tag ref={ref} className={className}>
      {displayedText}
      {showCursor && !isDone && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle animate-pulse" />
      )}
    </Tag>
  )
}

export default TypewriterText