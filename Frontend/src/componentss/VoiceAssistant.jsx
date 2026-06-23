import { useRef, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

function VoiceAssistant() {
  const [listening, setListening] = useState(false)
  const [text, setText] = useState("")
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState("Click microphone to speak")
  const recognitionRef = useRef(null)

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
    recognitionRef.current = recognition

    recognition.start()
    setListening(true)
    setStatus("Listening...")

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript
      setText(transcript)
      setStatus("Processing...")

      try {
        const res = await axios.post("https://pathforge-ai-backend-m8dw.onrender.com/api/ai/chat", {
          message: transcript,
        })
        const aiText = res.data.response
        setResponse(aiText)
        speakResponse(aiText)
        setStatus("AI Responded")
      } catch (error) {
        setResponse("Something went wrong.")
        setStatus("Error")
      }

      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
      setStatus("Voice recognition error")
    }

    recognition.onend = () => {
      setListening(false)
    }
  }

  const speakResponse = (message) => {
    const speech = new SpeechSynthesisUtterance(message)
    speech.rate = 1
    speech.pitch = 1
    speech.volume = 1
    speech.lang = "en-US"
    window.speechSynthesis.speak(speech)
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-[40px] bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-2xl p-10 relative overflow-hidden">

      <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-[var(--accent-coral)]/15 rounded-full blur-3xl" />

      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 text-[var(--text-primary)]">
          AI Voice Assistant
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Speak naturally with your AI assistant.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          animate={listening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
          onClick={startListening}
          className={`relative w-40 h-40 rounded-full flex items-center justify-center text-6xl shadow-2xl ${
            listening
              ? "bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)]"
              : "bg-[var(--bg-base)]"
          }`}
        >
          🎤

          {listening && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full border border-[var(--accent-coral)]"
            />
          )}
        </motion.button>
      </div>

      <div className="text-center mb-10">
        <p className="text-[var(--accent-coral)] text-xl font-semibold">
          {status}
        </p>
      </div>

      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-[var(--accent-coral)]/10 border border-[var(--accent-coral)]/20"
          >
            <h2 className="text-[var(--accent-coral)] mb-3 font-bold">
              You Said:
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-[var(--accent-lavender)]/10 border border-[var(--accent-lavender)]/20"
          >
            <h2 className="text-[var(--accent-lavender)] mb-3 font-bold">
              AI Response:
            </h2>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {response}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default VoiceAssistant