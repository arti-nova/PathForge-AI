import "dotenv/config"
import { fileURLToPath } from 'url'
import path from 'path'
import connectDB from "./config/db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import express from "express"
import cors from "cors"
import aiRoutes from "./routes/aiRoutes.js"


const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/ai", aiRoutes)

app.get("/", (req, res) => {
  res.send("PathForge AI Backend Running")
})

const PORT = process.env.PORT || 5000


connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})