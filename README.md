# PathForge AI

PathForge AI is a full-stack, AI-powered career platform that helps students and developers analyze their resumes, generate personalized learning roadmaps, practice mock interviews, and track their growth — all in one place.

![PathForge AI](https://img.shields.io/badge/status-active-success)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **AI Resume Analyzer** — Upload a PDF resume and get an instant ATS score, strengths, missing skills, and improvement suggestions.
- **AI Roadmap Generator** — Enter a career goal and receive a personalized roadmap with skills, projects, timeline, and resources.
- **AI Career Chatbot** — A streaming AI assistant for career, coding, and interview guidance, with voice input support.
- **AI Interview Simulator** — Generate role-specific interview questions and get AI feedback on your answers.
- **Analytics Dashboard** — Visualize growth, skill levels, and weekly progress with interactive charts.
- **Smart Daily Planner** — Generate AI-driven daily task plans toward your career goal.
- **Light/Dark Theme Toggle** — Full theme system (coral, lavender, warm gold palette) that persists across sessions.
- **Voice Assistant** — Speak naturally to navigate the app or ask career questions.
- **Authentication** — Firebase-based signup/login with protected dashboard routes.

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion (animations & parallax)
- Recharts (analytics charts)
- React Router
- Firebase Authentication
- React Dropzone (resume upload)
- React Icons

**Backend**
- Node.js + Express
- AI integration (Gemini API)
- Resume parsing & analysis pipeline

---

## 📁 Project Structure

```
PathForge AI/
├── Frontend/
│   ├── src/
│   │   ├── componentss/      # Reusable UI components (cards, chat, charts, navbar)
│   │   ├── sections/          # Page sections (Hero, Features, Timeline, Theme/Auth context)
│   │   ├── pages/              # Route-level pages (Home, Login, Signup, Dashboard)
│   │   ├── layouts/            # Shared layouts (DashboardLayout)
│   │   ├── firebase/            # Firebase config
│   └── package.json
└── Backend/
    ├── config/
    ├── models/
    ├── routes/
    ├── services/
    ├── mcp/
    ├── server.js
    └── package.json
```

---

##  Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- A Firebase project (for authentication)
- A Gemini API key (for AI features)

### 1. Clone the repository
```bash
git clone https://github.com/arti-nova/PathForge-AI.git
cd pathforge-ai
```

### 2. Setup the Frontend
```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/` with your Firebase config:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

Run the frontend:
```bash
npm run dev
```

### 3. Setup the Backend
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_AICHAT_KEY=your_api_key
GEMINI_ROADMAP_KEY=your_api_key
GEMINI_RESUME_KEY=your_api_key
GEMINI_INTERVIEW_KEY=your_api_key
GITHUB_TOKEN=your_token
```

Run the backend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) with the API running on `http://localhost:5000`.

---

## 🎨 Theming

PathForge AI uses a CSS-variable-based theme system supporting light and dark modes, defined in `index.css`:

| Variable | Light Mode | Dark Mode |
|---|---|---|
| `--bg-base` | `#FFF8F0` | `#1A0F2E` |
| `--accent-coral` | `#FF7A5C` | `#FF8C69` |
| `--accent-lavender` | `#9B7FC7` | `#B388CC` |
| `--accent-gold` | `#D9A441` | `#C9A96E` |

Toggle the theme using the switch in the navbar — your preference is saved to `localStorage`.

---

## 📸 Core Pages

- `/` — Landing page with Hero, Features, Resume Analyzer, Roadmap Generator, AI Chat, Interview Prep, Timeline, Daily Planner, Insights, Testimonials
- `/login` — User login
- `/signup` — User registration
- `/dashboard` — Authenticated dashboard with profile, stats, analytics, and saved roadmaps

---

## 📸 Screenshots

## Home Page

<img width="1910" height="914" alt="image" src="https://github.com/user-attachments/assets/6c84228e-d0bd-4abc-8ff7-19df1e936b34" />

## Dashboard Page

<img width="1902" height="912" alt="image" src="https://github.com/user-attachments/assets/5ec86718-d4df-4bed-9cfe-9ed666fa56de" />

## Login Page

<img width="1909" height="906" alt="image" src="https://github.com/user-attachments/assets/acf10c88-c2fa-497a-b6b1-1f103b245ee4" />

## Signup Page

<img width="1914" height="913" alt="image" src="https://github.com/user-attachments/assets/a8888f0d-e102-40b4-b3d0-345667a38939" />

## Resume Analyzer

<img width="1908" height="908" alt="image" src="https://github.com/user-attachments/assets/6a3f12ec-a670-47af-a97a-1d1c5b6d1bc1" />

##  AI Roadmap Generator

<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/2f453cdd-d35f-482a-8d04-bcff1ec05a63" />

##  Interview Simulator

<img width="1897" height="908" alt="image" src="https://github.com/user-attachments/assets/83f87e53-0893-4114-bcec-bffaf36ac317" />

##  AI Chat Assistant

<img width="1897" height="901" alt="image" src="https://github.com/user-attachments/assets/7f9e34ad-cca1-4eb5-bda6-8f155f296b55" />


## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or issue.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built by **Arti Dwivedi** 
- GitHub: https://github.com/arti-nova
- LinkedIn: https://www.linkedin.com/in/arti-dwivedi-74897b327/
