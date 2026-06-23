import DashboardLayout from "../layouts/DashboardLayout"
import ResumeCard from "../componentss/ResumeCard"
import ProgressCard from "../componentss/ProgressCard"
import SkillCard from "../componentss/SkillCard"
import StatsCard from "../componentss/StatsCard"
import AnalyticsChart from "../componentss/AnalyticsChart"
import AIInsights from "../componentss/AIInsights"
import RoadmapCard from "../componentss/RoadmapCard"
import TaskPlanner from "../componentss/TaskPlanner"
import ProfileCard from "../componentss/ProfileCard"
import SavedRoadmaps from "../componentss/SavedRoadmaps"
import AIChat from "../componentss/AIChat"
import ResumeScoreCard from "../componentss/ResumeScoreCard"
import InterviewCard from "../componentss/InterviewCard"

function Dashboard() {
  return (
    <DashboardLayout>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-gold)] to-[var(--accent-lavender)] bg-clip-text text-transparent">
          AI Career Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] text-xl">
          Track your growth with AI-powered insights.
        </p>
      </div>

      <div className="mb-14">
        <ProfileCard />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
        <StatsCard title="Tasks Completed" value="24" change="+12% this week" />
        <StatsCard title="Projects Built"  value="8"  change="+3 new projects" />
        <StatsCard title="Interview Score" value="87%" change="+9%" />
        <StatsCard title="AI Confidence"  value="92%" change="Excellent" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ResumeCard />
     
        <RoadmapCard />
        <InterviewCard />
      </div>

      <div className="mt-16">
        <ProgressCard />
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-lavender)] bg-clip-text text-transparent">
          Skill Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <SkillCard skill="React"        level={75} />
          <SkillCard skill="JavaScript"   level={85} />
          <SkillCard skill="Tailwind CSS" level={70} />
          <SkillCard skill="Node.js"      level={50} />
        </div>
      </div>

      <div className="mt-16">
        <TaskPlanner />
      </div>

      <div className="mt-16">
        <AnalyticsChart />
      </div>

      <div className="mt-16">
        <AIChat />
      </div>

    </DashboardLayout>
  )
}

export default Dashboard