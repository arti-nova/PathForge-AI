import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Waveform from "../componentss/Waveform"

function AIChat() {
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey there 👋 How may I help you today?" },
  ])
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [thinkingText, setThinkingText] = useState("Thinking")

  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (!loading) return

    const texts = [
      "Thinking",
      "Analyzing",
      "Generating",
      "Processing",
      "Building Response",
    ]

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setThinkingText(texts[index])
    }, 1200)

    return () => clearInterval(interval)
  }, [loading])

  const handleVoiceCommand = (text) => {
    const command = text.toLowerCase()

    if (command.includes("dashboard")) {
      navigate("/dashboard")
      return true
    }

    if (command.includes("resume")) {
      document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
      return true
    }

    if (command.includes("roadmap")) {
      document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" })
      return true
    }

    if (command.includes("interview")) {
      document.getElementById("interview")?.scrollIntoView({ behavior: "smooth" })
      return true
    }

    if (command.includes("planner") || command.includes("insights")) {
      document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" })
      return true
    }

    if (command.includes("chat")) {
      document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" })
      return true
    }

    return false
  }

  const sendMessage = async (customMessage = null) => {
    const finalMessage = customMessage || message
    if (!finalMessage.trim()) return

    const userMessage = { role: "user", text: finalMessage }

    setMessages((prev) => [...prev, userMessage, { role: "ai", text: "" }])
    setMessage("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: finalMessage,
          userEmail: "demo@gmail.com",
        }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let fullResponse = ""

      while (!done) {
        const result = await reader.read()
        done = result.done

        const chunk = decoder.decode(result.value || new Uint8Array(), {
          stream: true,
        })

        if (chunk) {
          fullResponse += chunk
        }
      }

      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1].text = fullResponse
        return updated
      })
    } catch (error) {
      console.log(error)
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ])
    }

    setLoading(false)
  }

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.continuous = false
    recognition.interimResults = false
    recognition.start()

    setListening(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setMessage(transcript)
      setListening(false)

      const handled = handleVoiceCommand(transcript)
      if (!handled) {
        sendMessage(transcript)
      }
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full h-[850px] rounded-[35px] border border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-2xl overflow-hidden shadow-2xl relative">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/5 to-[var(--accent-lavender)]/5 pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 px-8 py-6 border-b border-[var(--border-color)] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            AI Career Assistant
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Powered by Gemini AI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-gold)] animate-pulse" />
          <span className="text-[var(--accent-gold)]">Online</span>
        </div>
      </div>

      {/* WAVEFORM */}
      <div className="relative z-10">
        <Waveform listening={listening} loading={loading} />
      </div>

      {/* CHAT AREA */}
      <div className="relative z-10 h-[420px] overflow-y-auto px-6 py-6 space-y-6">

        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-6 py-4 rounded-3xl whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] text-[var(--bg-base)]"
                    : "bg-[var(--bg-base)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--accent-coral)] px-4"
          >
            {thinkingText}...
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="relative z-10 p-6 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-4">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about coding, AI, roadmap, interviews..."
            className="flex-1 px-6 py-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-coral)] transition-all"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={startListening}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
              listening
                ? "bg-[var(--accent-coral)] animate-pulse"
                : "bg-[var(--bg-base)] border border-[var(--border-color)] hover:bg-[var(--bg-surface-hover)]"
            }`}
          >
            🎤
          </motion.button>

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] text-[var(--bg-base)] font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            Send
          </button>

        </div>
      </div>

    </div>
  )
}

export default AIChat