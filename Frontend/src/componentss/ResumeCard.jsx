import { useState } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import ResumeScoreCard from "../componentss/ResumeScoreCard"
import { FaSpinner } from "react-icons/fa"

function ResumeCard() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  })

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume first")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("resume", file)

      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setAnalysis(response.data.analysis)
    } catch (error) {
      console.error(error)
      alert(error?.response?.data?.error || "Resume analysis failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden backdrop-blur-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[32px] p-8 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-coral)]/10 to-[var(--accent-lavender)]/10" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          AI Resume Analyzer
        </h2>

        <p className="text-[var(--text-secondary)] mb-8">
          Upload your resume and get AI-powered career insights.
        </p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-[var(--accent-coral)] bg-[var(--accent-coral)]/10"
              : "border-[var(--border-color)] bg-[var(--bg-base)] hover:border-[var(--accent-lavender)]/40"
          }`}
        >
          <input {...getInputProps()} />

          <div className="text-6xl mb-4">📄</div>

          {file ? (
            <div>
              <p className="text-[var(--text-primary)] text-lg font-semibold">
                {file.name}
              </p>
              <p className="text-[var(--text-secondary)] mt-2">
                Ready for AI analysis
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[var(--text-primary)] text-xl font-semibold">
                Drag & Drop Resume
              </p>
              <p className="text-[var(--text-secondary)] mt-3">
                PDF files only
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-8 w-full py-5 rounded-2xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] text-[var(--bg-base)] font-bold hover:scale-[1.02] transition-all duration-300 shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <FaSpinner className="animate-spin" />
              Analyzing Resume...
            </div>
          ) : (
            "Analyze Resume"
          )}
        </button>

        {analysis && (
          <div className="mt-10">
            <ResumeScoreCard
              score={analysis.score || 0}
              strengths={analysis.strengths || []}
              missingSkills={analysis.missingSkills || []}
              suggestions={analysis.careerSuggestions || []}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeCard