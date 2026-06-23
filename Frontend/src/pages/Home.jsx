import { useState, useEffect } from "react"
import { Parallax } from "react-scroll-parallax"
import Navbar from "../componentss/Navbar"
import Sidebar from "../sections/Sidebar"
import HeroSection from "../sections/HeroSection"
import FeaturesSection from "../sections/FeatureSection"
import TimelineSection from "../sections/TimelineSection"
import TestimonialSection from "../sections/Testimonial"
import CTASection from "../sections/CTASection"
import FooterSection from "../sections/Footer"
import ResumeCard from "../componentss/ResumeCard"
import RoadmapCard from "../componentss/RoadmapCard"
import AIChat from "../componentss/AIChat"
import InterviewCard from "../componentss/InterviewCard"
import TaskPlanner from "../componentss/TaskPlanner"
import AIInsights from "../componentss/AIInsights"
import AnimatedBackground from "../componentss/AnimatedBackground"
import TypewriterText from "../componentss/TypewriterText"
import { motion } from "framer-motion"

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <div className="fixed top-[-250px] left-[-250px] w-[600px] h-[600px] bg-[var(--glow-1)] rounded-full blur-3xl animate-pulse z-0" />
      <div className="fixed bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-[var(--glow-2)] rounded-full blur-3xl animate-pulse z-0" />

      <div className="relative z-50">
        <Navbar onMenuOpen={() => setSidebarOpen(true)} />
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="relative z-10">

        <HeroSection />

        <FeaturesSection />

        <section
          id="resume"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-coral)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-lavender)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="AI Resume Analyzer"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Analyze your resume with powerful AI insights.
              </p>
            </div>
            <ResumeCard />
          </motion.div>
        </section>

        <section
          id="roadmap"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-lavender)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-gold)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="AI Career Roadmaps"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-lavender)] via-[var(--accent-gold)] to-[var(--accent-coral)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Personalized career paths generated instantly.
              </p>
            </div>
            <RoadmapCard />
          </motion.div>
        </section>

        <section
          id="chat"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-gold)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-coral)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="AI Career Assistant"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-coral)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Ask anything about coding, careers, interviews, and AI.
              </p>
            </div>
            <AIChat />
          </motion.div>
        </section>

        <section
          id="interview"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-coral)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-lavender)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="Interview Preparation"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-lavender)] to-[var(--accent-gold)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Practice real interview questions with AI feedback.
              </p>
            </div>
            <InterviewCard />
          </motion.div>
        </section>

        <TimelineSection />

        <section
          id="planner"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-coral)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-gold)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="AI Daily Planner"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Generate personalized daily tasks.
              </p>
            </div>
            <TaskPlanner />
          </motion.div>
        </section>

        <section
          id="insights"
          className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        >
          <Parallax speed={-12}>
            <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[var(--accent-lavender)]/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={12}>
            <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-[var(--accent-coral)]/10 rounded-full blur-3xl" />
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl relative z-10"
          >
            <div className="text-center mb-14">
              <TypewriterText
                text="AI Career Insights"
                as="h1"
                speed={35}
                className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--accent-lavender)] via-[var(--accent-coral)] to-[var(--accent-gold)] bg-clip-text text-transparent"
              />
              <p className="text-[var(--text-secondary)] text-xl">
                Personalized recommendations generated by AI.
              </p>
            </div>
            <AIInsights />
          </motion.div>
        </section>

        <TestimonialSection />

        <CTASection />

        <FooterSection />

      </main>
    </div>
  )
}

export default Home